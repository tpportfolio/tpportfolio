'use client';
// Next.js App Router adapter. <Engine setup={…} /> is rendered once, as the LAST child of the
// section layout (React runs child effects first, so page components register before the boot).
// Links that stay inside this section get the leave → push → enter transition. Links to the
// rest of the portfolio are left alone. Back/forward re-inits the page without the curtain.
import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { boot, cleanup, enter, leave, onPage, shutdown, type PageFn } from './index';

export function Engine({ setup, scope }: { setup?: () => void; scope: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const mode = useRef<'idle' | 'push' | 'pop'>('idle');
  const first = useRef(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { boot(setup); return () => shutdown(); }, []);

  useEffect(() => {
    const onClick = async (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest('a');
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download') || a.hasAttribute('data-no-transition')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return; // external, hash or same page
      if (!url.pathname.startsWith(scope)) return; // the rest of the site loads as a full page
      e.preventDefault(); // next/link sees defaultPrevented and stands down
      if (mode.current !== 'idle') return;
      mode.current = 'push';
      const href = url.pathname + url.search + url.hash;
      router.prefetch(href);
      await leave();
      cleanup();
      router.push(href, { scroll: false });
    };
    const onPop = () => { mode.current = 'pop'; cleanup(); };
    document.addEventListener('click', onClick, true);
    addEventListener('popstate', onPop);
    return () => {
      document.removeEventListener('click', onClick, true);
      removeEventListener('popstate', onPop);
    };
  }, [router, scope]);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const pop = mode.current === 'pop';
    mode.current = 'idle';
    enter({ transition: !pop, scrollTop: !pop });
  }, [pathname]);

  return null;
}

/** Component-level page code: runs when the page is ready (after the loader), reverted on leave. */
export function usePage(fn: PageFn) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onPage(fn), []);
}
