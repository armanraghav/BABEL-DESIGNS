import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PageTransitionProps {
  pathname: string;
  children: ReactNode;
}

const transitionByRoute = (pathname: string) => {
  if (pathname === '/') {
    return {
      initial: { opacity: 0, y: 20, scale: 0.995 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -8, scale: 0.995 },
    };
  }

  if (pathname.includes('collections')) {
    return {
      initial: { opacity: 0, x: 24 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -16 },
    };
  }

  if (pathname.includes('philosophy')) {
    return {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    };
  }

  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
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
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
