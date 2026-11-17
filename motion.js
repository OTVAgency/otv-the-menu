'use strict';

const products = JSON.parse(document.getElementById('product-data').textContent);
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const body = document.body;
const heroCopy = document.getElementById('hero-copy');
const wallVideo = document.getElementById('wall-video');
let scrollFrame = 0;
let wallReady = false;
let displayedProgress = 0;
let lastFrameTime = 0;
const mobileWallQuery = window.matchMedia('(max-width: 760px), (pointer: coarse)');
const wallSequence = createWallSequence(document.getElementById('wall-sequence'), scheduleWall);
let sequenceActive = false;

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function setNavigationHeight() {
  const nav = document.querySelector('.bar').getBoundingClientRect();
  document.documentElement.style.setProperty('--nav-height', `${Math.ceil(nav.height)}px`);
  document.documentElement.style.setProperty('--nav-bottom', `${Math.ceil(nav.bottom)}px`);
}

function configureWallRenderer() {
  // iPhone scrolling uses images, so no video-start gesture or preload is needed.
  sequenceActive = mobileWallQuery.matches && wallSequence.supported && !motionPreference.matches;
  body.classList.toggle('image-wall', sequenceActive);
  wallSequence.setActive(sequenceActive);
  if (sequenceActive || motionPreference.matches) {
    wallVideo.pause();
    if (wallVideo.getAttribute('src')) {
      wallVideo.removeAttribute('src');
      wallVideo.load();
      wallReady = false;
    }
    if (sequenceActive) body.classList.remove('media-failed');
  } else if (!wallVideo.getAttribute('src')) {
    wallVideo.src = wallVideo.dataset.src;
  }
  scheduleWall();
}

function updateWall(timestamp) {
  scrollFrame = 0;
  if (motionPreference.matches || body.classList.contains('media-failed')) return;
  // The phone's portrait crop hides the earliest edge spray passes. Complete its
  // painting over the first short scroll section, then keep the full mural fixed.
  const pageRange = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  const range = sequenceActive ? Math.min(pageRange, Math.max(900, innerHeight * 1.25)) : pageRange;
  const target = clamp(scrollY / range, 0, 1);
  const elapsed = lastFrameTime ? Math.min(50, timestamp - lastFrameTime) : 16.7;
  lastFrameTime = timestamp;
  // Time-based easing stays consistent on different refresh-rate displays.
  const difference = target - displayedProgress;
  displayedProgress = Math.abs(difference) < 0.00015 ? target : displayedProgress + difference * (1 - Math.exp(-elapsed / 100));
  if (Math.abs(target - displayedProgress) < 0.00015) displayedProgress = target;
  document.getElementById('wall-progress').style.width = `${displayedProgress * 100}%`;
  if (sequenceActive) {
    wallSequence.render(displayedProgress);
  } else if (wallReady && Number.isFinite(wallVideo.duration) && !wallVideo.seeking) {
    const time = displayedProgress * Math.max(0, wallVideo.duration - 0.045);
    if (Math.abs(wallVideo.currentTime - time) > 0.008) wallVideo.currentTime = time;
  }
  // The completed background uses the detailed 4K still, avoiding idle decoder work.
  body.classList.toggle('wall-complete', target === 1 && displayedProgress > 0.9998 && (sequenceActive || wallVideo.currentTime > wallVideo.duration - 0.12));
  if (Math.abs(target - displayedProgress) > 0.00015 || (!sequenceActive && wallVideo.seeking)) {
    scheduleWall();
  } else {
    lastFrameTime = 0;
  }
}

function scheduleWall() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateWall);
}

wallVideo.addEventListener('loadeddata', () => { wallReady = true; scheduleWall(); });
wallVideo.addEventListener('seeked', scheduleWall);
wallVideo.addEventListener('error', () => {
  if (!sequenceActive) body.classList.add('media-failed');
  heroCopy.inert = false;
});
window.addEventListener('scroll', scheduleWall, { passive: true });
mobileWallQuery.addEventListener('change', configureWallRenderer);
window.addEventListener('resize', () => { setNavigationHeight(); scheduleWall(); });
if ('ResizeObserver' in window) {
  const resize = new ResizeObserver(() => { setNavigationHeight(); scheduleWall(); });
  resize.observe(document.querySelector('.bar'));
  resize.observe(document.getElementById('top'));
}

// Both dialogs use native focus trapping, Escape handling and backdrop behavior.
const detailsDialog = document.getElementById('details-dialog');
const packDialog = document.getElementById('pack-dialog');
const packVideo = document.getElementById('pack-video');
const packStill = document.getElementById('pack-still');
const packContents = document.getElementById('pack-contents');
const openingStatus = document.getElementById('opening-status');
const pauseButton = document.getElementById('pack-pause');
const replayButton = document.getElementById('pack-replay');
const skipButton = document.getElementById('pack-skip');
const flipButton = document.getElementById('pack-flip');
const packTurn = document.getElementById('pack-turn');
const backPhoto = document.getElementById('pack-back-photo');
let lastDetailsTrigger = null;
let lastPackTrigger = null;
let currentPack = null;

function syncDialogScrollLock() {
  body.classList.toggle('dialog-open', detailsDialog.open || packDialog.open);
}

function appendList(list, items) {
  list.replaceChildren();
  items.forEach((text) => {
    const item = document.createElement('li');
    item.textContent = text;
    list.appendChild(item);
  });
}

function closeOnBackdrop(dialog, event) {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
    dialog.close();
  }
}

function showDetails(key, trigger, labelOnly = false) {
  const product = products.find((item) => item.id === key);
  if (key !== 'zip' && !product) return;
  lastDetailsTrigger = trigger;
  const facts = document.getElementById('dialog-facts');
  const list = document.getElementById('dialog-list');
  facts.replaceChildren();
  detailsDialog.classList.toggle('showing-label', labelOnly);
  facts.hidden = !labelOnly;
  list.hidden = labelOnly;
  document.getElementById('dialog-tag').textContent = key === 'zip' ? '4 packs · 28 guided prompts' : '7g · 7 guided prompts';
  document.getElementById('dialog-title').textContent = key === 'zip' ? 'The Whole Zip' : product.name;
  document.getElementById('dialog-summary').textContent = labelOnly ? 'Read the Product Facts on the back of your pack.' : key === 'zip' ? 'All four focused packs, including their templates and examples, in one digital bundle.' : product.result;
  if (labelOnly) {
    const label = document.getElementById(`${key}-facts`).querySelector('.facts').cloneNode(true);
    const photo = document.createElement('img');
    photo.className = 'label-art';
    photo.src = `media/pack-${key}-back-v3.jpg`;
    photo.alt = `${product.name} 7g pouch back with Product Facts`;
    photo.width = 1024;
    photo.height = 1536;
    facts.append(photo, label);
  } else {
    appendList(list, key === 'zip' ? products.map((item) => `${item.name} — ${item.subtitle} · 7 guided prompts`) : product.steps);
  }
  detailsDialog.showModal();
  detailsDialog.scrollTop = 0;
  syncDialogScrollLock();
}

function resetPackFace() {
  packTurn.classList.remove('is-back');
  packTurn.querySelector('.pack-front-face').setAttribute('aria-hidden', 'false');
  packTurn.querySelector('.pack-back-face').setAttribute('aria-hidden', 'true');
  flipButton.setAttribute('aria-pressed', 'false');
  flipButton.textContent = 'Flip to back ↻';
}

function revealPackContents(message = 'Your pack is open. Here’s what’s inside.') {
  packContents.hidden = false;
  flipButton.hidden = false;
  openingStatus.textContent = message;
  skipButton.hidden = true;
}

function showOpenedStill() {
  if (!currentPack) return;
  packVideo.pause();
  packVideo.hidden = true;
  packStill.src = `media/pack-${currentPack.id}-opened-v3.jpg`;
  packStill.alt = `${currentPack.name} 7g pouch opened to show the resource cards inside`;
  packStill.hidden = false;
  pauseButton.hidden = true;
  revealPackContents();
}

function playPack() {
  resetPackFace();
  flipButton.hidden = true;
  packStill.hidden = true;
  packVideo.hidden = false;
  pauseButton.hidden = false;
  pauseButton.textContent = 'Pause';
  packContents.hidden = true;
  skipButton.hidden = false;
  openingStatus.textContent = 'Ripping the seal and opening your pack…';
  const request = packVideo.play();
  if (request) {
    request.catch(() => {
      // Some mobile browsers require a second explicit play gesture.
      if (!packDialog.open) return;
      pauseButton.textContent = 'Play';
      openingStatus.textContent = 'Tap Play to open your pack, or see what’s inside now.';
    });
  }
}

function openPack(key, trigger) {
  const product = products.find((item) => item.id === key);
  if (!product) return;
  currentPack = product;
  resetPackFace();
  flipButton.hidden = true;
  backPhoto.src = `media/pack-${key}-back-v3.jpg`;
  backPhoto.alt = `${product.name} 7g Product Facts back`;
  lastPackTrigger = trigger;
  document.getElementById('pack-title').textContent = product.name;
  document.getElementById('pack-category').textContent = product.category;
  document.getElementById('pack-result').textContent = product.result;
  document.getElementById('pack-template').textContent = product.template;
  appendList(document.getElementById('pack-outline'), product.steps);
  packVideo.poster = `media/pack-${key}-front-v3.jpg`;
  packStill.hidden = true;
  packVideo.hidden = false;
  replayButton.hidden = motionPreference.matches;
  packDialog.showModal();
  packDialog.scrollTop = 0;
  syncDialogScrollLock();
  if (motionPreference.matches) {
    showOpenedStill();
    return;
  }
  const source = `media/pack-${key}-open-v3.mp4`;
  if (packVideo.getAttribute('src') !== source) {
    packVideo.src = source;
  } else {
    packVideo.currentTime = 0;
  }
  playPack();
}

document.querySelectorAll('[data-open]').forEach((button) => {
  button.addEventListener('click', () => openPack(button.dataset.open, button));
});
document.querySelectorAll('[data-label]').forEach((button) => {
  button.addEventListener('click', () => showDetails(button.dataset.label, button, true));
});
document.querySelectorAll('[data-details]').forEach((button) => {
  button.addEventListener('click', () => showDetails(button.dataset.details, button));
});

document.getElementById('dialog-close').addEventListener('click', () => detailsDialog.close());
detailsDialog.addEventListener('click', (event) => closeOnBackdrop(detailsDialog, event));
detailsDialog.addEventListener('close', () => {
  syncDialogScrollLock();
  if (lastDetailsTrigger) lastDetailsTrigger.focus({ preventScroll: true });
});
document.getElementById('pack-close').addEventListener('click', () => packDialog.close());
packDialog.addEventListener('click', (event) => closeOnBackdrop(packDialog, event));
packDialog.addEventListener('close', () => {
  packVideo.pause();
  syncDialogScrollLock();
  if (lastPackTrigger) lastPackTrigger.focus({ preventScroll: true });
});
packVideo.addEventListener('ended', () => { pauseButton.hidden = true; revealPackContents(); });
packVideo.addEventListener('error', () => { if (packDialog.open) showOpenedStill(); });
pauseButton.addEventListener('click', () => {
  if (packVideo.paused) {
    const request = packVideo.play();
    if (request) request.then(() => { pauseButton.textContent = 'Pause'; }).catch(() => showOpenedStill());
  } else {
    packVideo.pause();
    pauseButton.textContent = 'Play';
  }
});
replayButton.addEventListener('click', () => {
  packVideo.currentTime = 0;
  playPack();
});
skipButton.addEventListener('click', () => showOpenedStill());
flipButton.addEventListener('click', () => {
  const back = packTurn.classList.toggle('is-back');
  packTurn.querySelector('.pack-front-face').setAttribute('aria-hidden', String(back));
  packTurn.querySelector('.pack-back-face').setAttribute('aria-hidden', String(!back));
  flipButton.setAttribute('aria-pressed', String(back));
  flipButton.textContent = back ? 'Back to front ↻' : 'Flip to back ↻';
});

function applyMotionPreference() {
  body.classList.toggle('reduced-motion', motionPreference.matches);
  body.classList.toggle('motion-enabled', !motionPreference.matches);
  heroCopy.inert = false;
  if (motionPreference.matches) {
    wallVideo.pause();
    if (packDialog.open) {
      replayButton.hidden = true;
      showOpenedStill();
    }
  }
  configureWallRenderer();
}
motionPreference.addEventListener('change', applyMotionPreference);
setNavigationHeight();
applyMotionPreference();

// Layout preview only: no email endpoint, persistence, sending or subscription.
document.getElementById('f').addEventListener('submit', (event) => {
  event.preventDefault();
  document.getElementById('form-status').textContent = 'Thanks for previewing the signup. No email was saved or submitted, and no subscription was created.';
});
