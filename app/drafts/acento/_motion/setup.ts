// Global motion for the "acento" design. Runs once on the client, before the first page.
// Motion verb: fall and land. Things arrive from above and settle; the page changes when a
// red stroke, drawn at the angle of the accent, crosses it.
import { gsap } from 'gsap';
import { ease, onPage, onScroll, setLoaderExit, setLoaderFormat, setTransition } from '../_engine';
import { startStress } from './stress';

const panelOf = (curtain: HTMLElement) => curtain.querySelector('.curtain__panel');

export function setupMotion() {
  setLoaderFormat((p) => String(Math.round(p)).padStart(3, '0'));

  // Loader → page. The loader shows the name without its accents. They land, and the page
  // is already there underneath: on the home page the hero name sits in the same place.
  setLoaderExit((root) => {
    const name = root.querySelector('.name');
    const matched = !!document.querySelector('[data-name-intro]');
    const tl = gsap.timeline();
    tl.to(root.querySelector('[data-loader-count]'), { yPercent: -110, duration: 0.45, ease: ease.inOut }, 0)
      .to(root.querySelector('.loader__foot'), { autoAlpha: 0, duration: 0.3 }, 0.2)
      .add(() => name?.classList.remove('name--bare'), 0.1)
      .to({}, { duration: 0.55 }); // the accents land (CSS, --d-stress)
    if (!matched) tl.to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.6, ease: ease.inOut }, 0.4);
    return tl;
  });

  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(panelOf(c), { xPercent: -125, skewX: -16 }, { xPercent: 0, skewX: -16, duration: 0.75, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(panelOf(c), { xPercent: 125, duration: 0.8, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
  });

  // The header steps aside on the way down and comes back on the way up.
  let last = 0;
  onScroll(({ y }) => {
    const h = document.documentElement.classList;
    h.toggle('is-scrolled', y > 8);
    if (Math.abs(y - last) < 4) return;
    h.toggle('frame-away', y > 160 && y > last);
    last = y;
  });
  onPage(() => {
    last = 0;
    document.documentElement.classList.remove('frame-away', 'is-scrolled');
  });

  startStress();
}
