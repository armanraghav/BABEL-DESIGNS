import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 420, damping: 35, mass: 0.2 });
  const ringY = useSpring(dotY, { stiffness: 420, damping: 35, mass: 0.2 });
  const labelRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQueries = [
      '(min-width: 1024px)',
      '(hover: hover)',
      '(pointer: fine)',
      '(prefers-reduced-motion: no-preference)',
    ].map((query) => window.matchMedia(query));

    const syncEnabled = () => {
      setIsEnabled(mediaQueries.every((query) => query.matches));
    };

    syncEnabled();
    mediaQueries.forEach((query) => query.addEventListener('change', syncEnabled));

    return () => {
      mediaQueries.forEach((query) => query.removeEventListener('change', syncEnabled));
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    let hoverFrame = 0;
    let pendingTarget: EventTarget | null = null;
    let lastInteractive: HTMLElement | null = null;

    const applyHoverState = (target: EventTarget | null) => {
      const element = target as HTMLElement | null;
      const interactive = element?.closest('a, button, [data-cursor]') ?? null;

      if (!ringRef.current || !labelRef.current) return;
      if (interactive === lastInteractive) return;

      if (interactive) {
        ringRef.current.dataset.state = 'active';
        const label =
          interactive.getAttribute('data-cursor') ||
          interactive.getAttribute('aria-label') ||
          'Open';
        labelRef.current.textContent = label;
      } else {
        ringRef.current.dataset.state = 'idle';
        labelRef.current.textContent = '';
      }

      lastInteractive = interactive;
    };

    const queueHoverState = (target: EventTarget | null) => {
      pendingTarget = target;
      if (hoverFrame) return;
      hoverFrame = window.requestAnimationFrame(() => {
        hoverFrame = 0;
        applyHoverState(pendingTarget);
      });
    };

    const moveCursor = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      dotX.set(event.clientX);
      dotY.set(event.clientY);
      queueHoverState(event.target);
    };

    const clearHoverState = () => {
      queueHoverState(null);
    };

    window.addEventListener('pointermove', moveCursor, { passive: true });
    window.addEventListener('pointerleave', clearHoverState);
    window.addEventListener('blur', clearHoverState);

    return () => {
      window.removeEventListener('pointermove', moveCursor);
      window.removeEventListener('pointerleave', clearHoverState);
      window.removeEventListener('blur', clearHoverState);
      if (hoverFrame) window.cancelAnimationFrame(hoverFrame);
    };
  }, [dotX, dotY, isEnabled]);

  if (!isEnabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[120]">
      <motion.div
        className="custom-cursor-dot"
        style={{ x: dotX, y: dotY }}
      />
      <motion.div
        ref={ringRef}
        className="custom-cursor-ring"
        data-state="idle"
        style={{ x: ringX, y: ringY }}
      >
        <span ref={labelRef} className="custom-cursor-label" />
      </motion.div>
    </div>
  );
};

export default CustomCursor;
