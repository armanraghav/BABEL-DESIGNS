import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PageTransitionProps {
  pathname: string;
  children: ReactNode;
}

const transitionByRoute = (pathname: string) => {
  if (pathname === '/') {
    return {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
    };
  }

  if (pathname.includes('collections')) {
    return {
      initial: { opacity: 0, x: 16 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -12 },
    };
  }

  if (pathname.includes('philosophy')) {
    return {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -12 },
    };
  }

  return {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };
};

const PageTransition = ({ pathname, children }: PageTransitionProps) => {
  const prefersReducedMotion = useReducedMotion();
  const routeMotion = transitionByRoute(pathname);

  return (
    <motion.div
      key={pathname}
      initial={prefersReducedMotion ? false : routeMotion.initial}
      animate={prefersReducedMotion ? { opacity: 1 } : routeMotion.animate}
      exit={prefersReducedMotion ? { opacity: 1 } : routeMotion.exit}
      style={prefersReducedMotion ? undefined : { willChange: 'transform, opacity' }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
