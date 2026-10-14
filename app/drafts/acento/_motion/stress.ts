// The driver of the concept: where the stress falls.
// One rule for the whole site: inside a group, exactly one item is stressed (.is-stressed).
// CSS turns that class into weight, width, the landed accent and the still in colour, so
// every visual agrees. This module only decides WHICH item, from three inputs: scroll
// (the pillars stage), the pointer or keyboard focus, and, on touch, the row at mid-screen.
// At rest the landed accents keep a small sway: the idle state of the concept.
//
//   data-stress="name"     the name: hover a syllable to move the stress, it goes back by itself
//   data-stress="pillars"  sticky stage: scroll chooses the pillar, hover or focus overrides
//   data-stress="list"     lists: the hovered or focused row; the row at mid-screen on touch
//   data-stress-item       an item of a group
//   data-sway              the accents inside this element sway at rest
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isTouch, onPage, prefersReducedMotion } from '../_engine';

const ON = 'is-stressed';

function setActive(items: HTMLElement[], active: HTMLElement | null) {
  for (const el of items) el.classList.toggle(ON, el === active);
  refreshSway();
}

// ---- idle: the landed accents lean toward the pointer and breathe ---------------------------
let sway: HTMLElement[] = [];
const pointer = { aim: 0, x: 0 };

function refreshSway() {
  if (prefersReducedMotion()) return;
  for (const el of sway) el.style.rotate = '';
  sway = [
    ...[...document.querySelectorAll<HTMLElement>(`[data-sway] .${ON} .mark > i`)].filter((el) => !el.closest('.go')),
    ...document.querySelectorAll<HTMLElement>('[data-sway-always] > i'),
  ];
}

function tick(time: number) {
  if (!sway.length) return;
  pointer.x += (pointer.aim - pointer.x) * (1 - Math.pow(0.94, gsap.ticker.deltaRatio()));
  const angle = Math.sin(time * 1.5) * 5 + pointer.x * 14;
  for (let i = 0; i < sway.length; i++) {
    sway[i].style.rotate = `${(angle + Math.sin(time * 1.1 + i * 1.7) * 2).toFixed(2)}deg`;
  }
}

// ---- groups ----------------------------------------------------------------------------------
function nameGroup(root: HTMLElement, off: (() => void)[]) {
  root.querySelectorAll<HTMLElement>('[data-word]').forEach((word) => {
    const syllables = [...word.querySelectorAll<HTMLElement>('[data-syl]')];
    const tonic = word.querySelector<HTMLElement>('[data-tonic]');
    let back: gsap.core.Tween | null = null;
    const rest = () => setActive(syllables, tonic);
    const move = (target: HTMLElement) => {
      back?.kill();
      setActive(syllables, target);
    };
    const enter = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      move(e.currentTarget as HTMLElement);
    };
    const tap = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return;
      move(e.currentTarget as HTMLElement);
      back = gsap.delayedCall(1.4, rest);
    };
    syllables.forEach((s) => { s.addEventListener('pointerenter', enter); s.addEventListener('pointerdown', tap); });
    word.addEventListener('pointerleave', rest);
    off.push(() => {
      back?.kill();
      syllables.forEach((s) => { s.removeEventListener('pointerenter', enter); s.removeEventListener('pointerdown', tap); });
      word.removeEventListener('pointerleave', rest);
    });
  });
}

function pillarsGroup(root: HTMLElement, off: (() => void)[]) {
  const items = [...root.querySelectorAll<HTMLElement>('[data-stress-item]')];
  if (!items.length) return;
  const sticky = getComputedStyle(root.querySelector('.pillars__stage') || root).position === 'sticky';
  if (!sticky) {
    // Stacked layout (phones, short windows). With motion, the pillar at mid-screen takes the
    // stress; without it, the three stay as they are in the markup: all stressed.
    if (prefersReducedMotion()) return;
    setActive(items, items[0]);
    items.forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 62%',
        end: 'bottom 62%',
        onToggle: (self) => { if (self.isActive) setActive(items, item); },
      });
    });
    return;
  }

  let fromScroll = 0;
  setActive(items, items[0]);
  ScrollTrigger.create({
    trigger: root,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const index = Math.min(items.length - 1, Math.floor(self.progress * items.length));
      if (index === fromScroll) return;
      fromScroll = index;
      setActive(items, items[index]);
    },
  });
  // Hover and keyboard focus move the stress too; the next scroll step takes it back.
  items.forEach((item) => {
    const line = item.querySelector<HTMLElement>('.pillar__label');
    const choose = () => setActive(items, item);
    const hover = (e: PointerEvent) => { if (e.pointerType !== 'touch') choose(); };
    line?.addEventListener('pointerenter', hover);
    line?.addEventListener('click', choose);
    item.addEventListener('focusin', choose);
    off.push(() => {
      line?.removeEventListener('pointerenter', hover);
      line?.removeEventListener('click', choose);
      item.removeEventListener('focusin', choose);
    });
  });
}

function listGroup(root: HTMLElement, off: (() => void)[]) {
  const items = [...root.querySelectorAll<HTMLElement>('[data-stress-item]')];
  if (!items.length) return;
  setActive(items, items[0]);
  if (isTouch()) {
    // No hover on touch: the row that crosses the middle of the screen takes the stress.
    items.forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 58%',
        end: 'bottom 58%',
        onToggle: (self) => { if (self.isActive) setActive(items, item); },
      });
    });
    return;
  }
  items.forEach((item) => {
    const choose = () => setActive(items, item);
    item.addEventListener('pointerenter', choose);
    item.addEventListener('focusin', choose);
    off.push(() => {
      item.removeEventListener('pointerenter', choose);
      item.removeEventListener('focusin', choose);
    });
  });
}

export function startStress() {
  if (!prefersReducedMotion()) {
    if (!isTouch()) {
      addEventListener('pointermove', (e) => { pointer.aim = e.clientX / innerWidth - 0.5; }, { passive: true });
    }
    gsap.ticker.add(tick);
  }

  onPage(() => {
    const off: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>('[data-stress]').forEach((root) => {
      const kind = root.dataset.stress;
      if (kind === 'name') nameGroup(root, off);
      else if (kind === 'pillars') pillarsGroup(root, off);
      else listGroup(root, off);
    });
    refreshSway();
    return () => {
      off.forEach((fn) => fn());
      sway = [];
    };
  });
}
