import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 420, damping: 35, mass: 0.2 });
  const ringY = useSpring(dotY, { stiffness: 420, damping: 35, mass: 0.2 });
  const labelRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (event: MouseEvent) => {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
    };

    const handleHoverState = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [data-cursor]');
      if (!ringRef.current || !labelRef.current) return;

      if (interactive) {
        ringRef.current.dataset.state = 'active';
        const label = interactive.getAttribute('data-cursor') || interactive.getAttribute('aria-label') || 'Open';
        labelRef.current.textContent = label;
      } else {
        ringRef.current.dataset.state = 'idle';
        labelRef.current.textContent = '';
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHoverState);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHoverState);
    };
  }, [dotX, dotY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] hidden lg:block">
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
