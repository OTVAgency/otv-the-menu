/* Image decoding works on iPhone even when Safari refuses video preloading.
 * Cache only nearby HD frames; never hold the whole sequence decoded in memory.
 */
function createWallSequence(canvas, onFrameReady) {
  const context = canvas.getContext('2d', { alpha: false });
  const frames = new Map();
  const lastIndex = 59;
  const maxCachedFrames = 10;
  let activeLoads = 0;
  let progress = 0;
  let active = false;
  let displayedFrame = -1;

  function frameIndices() {
    const position = progress * lastIndex;
    const lower = Math.floor(position);
    const upper = Math.min(lastIndex, lower + 1);
    return [lower, upper, upper + 1, lower - 1, upper + 2, lower - 2]
      .filter((index, offset, all) => index >= 0 && index <= lastIndex && all.indexOf(index) === offset);
  }

  function trimCache() {
    if (frames.size <= maxCachedFrames) return;
    const protectedFrames = new Set(frameIndices());
    const removable = [...frames.entries()]
      .filter(([index, frame]) => frame.ready && !protectedFrames.has(index))
      .sort((a, b) => Math.abs(b[0] - progress * lastIndex) - Math.abs(a[0] - progress * lastIndex));
    while (frames.size > maxCachedFrames && removable.length) {
      frames.delete(removable.shift()[0]);
    }
  }

  function loadFrame(index) {
    const image = new Image();
    const frame = { image, ready: false, failed: false };
    frames.set(index, frame);
    activeLoads += 1;
    image.decoding = 'async';
    image.onload = () => {
      activeLoads -= 1;
      frame.ready = true;
      trimCache();
      if (active) onFrameReady();
      pump();
    };
    image.onerror = () => {
      // JPEG also supports older iPhones without WebP decoding.
      if (!frame.jpegAttempt) {
        frame.jpegAttempt = true;
        image.src = `media/wall-frames/frame-${String(index).padStart(3, '0')}.jpg`;
        return;
      }
      activeLoads -= 1;
      frame.failed = true;
      if (active) onFrameReady();
      pump();
    };
    image.src = `media/wall-frames/frame-${String(index).padStart(3, '0')}.webp`;
  }

  function pump() {
    if (!active || !context) return;
    // Always prioritize the latest scroll location, not a stale download queue.
    for (const index of frameIndices()) {
      if (activeLoads >= 3) break;
      if (!frames.has(index)) loadFrame(index);
    }
    trimCache();
  }

  function drawCover(image, alpha = 1) {
    const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    context.globalAlpha = alpha;
    context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
  }

  function render(nextProgress) {
    if (!active || !context) return;
    progress = nextProgress;
    const bounds = canvas.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(bounds.width * ratio));
    const height = Math.max(1, Math.round(bounds.height * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    pump();
    const position = progress * lastIndex;
    const lower = Math.floor(position);
    const upper = Math.min(lastIndex, lower + 1);
    const first = frames.get(lower);
    const second = frames.get(upper);
    if (first?.ready) {
      drawCover(first.image);
      if (second?.ready) drawCover(second.image, position - lower);
      displayedFrame = lower;
    } else if (second?.ready) {
      drawCover(second.image);
      displayedFrame = upper;
    } else {
      const nearest = [...frames.entries()].filter(([, frame]) => frame.ready)
        .sort((a, b) => Math.abs(a[0] - position) - Math.abs(b[0] - position))[0];
      if (nearest) {
        drawCover(nearest[1].image);
        displayedFrame = nearest[0];
      }
    }
    context.globalAlpha = 1;
    // Expose only rendered progress for QA; no personal data or persistence.
    canvas.dataset.frame = String(displayedFrame);
    canvas.dataset.progress = progress.toFixed(4);
  }

  return {
    setActive(value) { active = value; if (active) pump(); },
    render,
    supported: Boolean(context),
  };
}
