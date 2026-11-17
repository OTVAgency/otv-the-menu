'use strict';

// The same product data drives the shelf, labels, outlines and open-pack contents.
const products = JSON.parse(document.getElementById('product-data').textContent);
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const body = document.body;
const hero = document.getElementById('wall-reveal');
const wallVideo = document.getElementById('wall-video');
const heroCopy = document.getElementById('hero-copy');
let wallTarget = 0;
let scrollFrame = 0;
let wallReady = false;

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function setNavigationHeight() {
  const navigation = document.querySelector('.bar').getBoundingClientRect();
  const height = navigation.height;
  document.documentElement.style.setProperty('--nav-height', `${Math.ceil(height)}px`);
  document.documentElement.style.setProperty('--nav-bottom', `${Math.ceil(navigation.bottom)}px`);
}

function seekWallToLatestScroll() {
  // Queue the latest desired position instead of issuing overlapping video seeks.
  if (!wallReady || wallVideo.seeking || motionPreference.matches) return;
  if (Math.abs(wallVideo.currentTime - wallTarget) > 0.025) {
    wallVideo.currentTime = wallTarget;
  }
}

function updateWall() {
  scrollFrame = 0;
  if (motionPreference.matches || body.classList.contains('media-failed')) return;
  const scene = hero.querySelector('.hero-scene');
  const navigation = document.querySelector('.bar').getBoundingClientRect();
  const navigationHeight = navigation.height;
  document.documentElement.style.setProperty('--nav-bottom', `${Math.ceil(navigation.bottom)}px`);
  const range = Math.max(1, hero.offsetHeight - scene.offsetHeight);
  const progress = clamp((navigationHeight - hero.getBoundingClientRect().top) / range, 0, 1);
  const copyOpacity = clamp((0.88 - progress) / 0.28, 0, 1);
  hero.style.setProperty('--copy-opacity', copyOpacity.toFixed(3));
  hero.style.setProperty('--copy-offset', `${-32 * progress}px`);
  hero.style.setProperty('--shade-opacity', (0.22 + 0.78 * copyOpacity).toFixed(3));
  heroCopy.inert = copyOpacity < 0.08;
  document.getElementById('wall-progress').style.width = `${progress * 100}%`;
  if (Number.isFinite(wallVideo.duration)) {
    wallTarget = progress * Math.max(0, wallVideo.duration - 0.07);
    seekWallToLatestScroll();
  }
}

function scheduleWall() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateWall);
}

wallVideo.addEventListener('loadeddata', () => {
  wallReady = true;
  scheduleWall();
});
wallVideo.addEventListener('seeked', seekWallToLatestScroll);
wallVideo.addEventListener('error', () => {
  // A still mural keeps the hero useful if media cannot be loaded or decoded.
  body.classList.add('media-failed');
  heroCopy.inert = false;
});
window.addEventListener('scroll', scheduleWall, { passive: true });
window.addEventListener('resize', () => { setNavigationHeight(); scheduleWall(); });
if ('ResizeObserver' in window) {
  new ResizeObserver(() => { setNavigationHeight(); scheduleWall(); }).observe(document.querySelector('.bar'));
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
  facts.hidden = !labelOnly;
  list.hidden = labelOnly;
  document.getElementById('dialog-tag').textContent = key === 'zip' ? '4 packs · 28 guided prompts' : '7g · 7 guided prompts';
  document.getElementById('dialog-title').textContent = key === 'zip' ? 'The Whole Zip' : product.name;
  document.getElementById('dialog-summary').textContent = labelOnly ? 'Read the Product Facts on the back of your pack.' : key === 'zip' ? 'All four focused packs, including their templates and examples, in one digital bundle.' : product.result;
  if (labelOnly) {
    const label = document.getElementById(`${key}-facts`).querySelector('.facts').cloneNode(true);
    facts.appendChild(label);
  } else {
    appendList(list, key === 'zip' ? products.map((item) => `${item.name} — ${item.subtitle} · 7 guided prompts`) : product.steps);
  }
  detailsDialog.showModal();
  detailsDialog.scrollTop = 0;
  syncDialogScrollLock();
}

function revealPackContents(message = 'Your pack is open. Here’s what’s inside.') {
  packContents.hidden = false;
  openingStatus.textContent = message;
  skipButton.hidden = true;
}

function showOpenedStill() {
  if (!currentPack) return;
  packVideo.pause();
  packVideo.hidden = true;
  packStill.src = `media/pack-${currentPack.id}-opened.jpg`;
  packStill.alt = `${currentPack.name} 7g pouch opened to show the resource cards inside`;
  packStill.hidden = false;
  pauseButton.hidden = true;
  revealPackContents();
}

function playPack() {
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
  lastPackTrigger = trigger;
  document.getElementById('pack-title').textContent = product.name;
  document.getElementById('pack-category').textContent = product.category;
  document.getElementById('pack-result').textContent = product.result;
  document.getElementById('pack-template').textContent = product.template;
  appendList(document.getElementById('pack-outline'), product.steps);
  packVideo.poster = `media/pack-${key}-sealed.jpg`;
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
  const source = `media/pack-${key}-open.mp4`;
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
  } else {
    if (!wallVideo.getAttribute('src')) wallVideo.src = wallVideo.dataset.src;
    scheduleWall();
  }
}
motionPreference.addEventListener('change', applyMotionPreference);
setNavigationHeight();
applyMotionPreference();

// Layout preview only: no email endpoint, persistence, sending or subscription.
document.getElementById('f').addEventListener('submit', (event) => {
  event.preventDefault();
  document.getElementById('form-status').textContent = 'Thanks for previewing the signup. No email was saved or submitted, and no subscription was created.';
});
