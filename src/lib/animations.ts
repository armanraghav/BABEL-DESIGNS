import { Variants, Easing } from 'framer-motion';

// Standard easing curves for consistent animations
export const easing: Record<string, Easing> = {
  // Slow, editorial easing for heavy, intentional motion
  smooth: 'cubic-bezier(0.22, 0.12, 0.2, 1)' as Easing,
};

// Fade animations
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: easing.smooth,
    },
  },
};

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easing.smooth,
    },
  },
};

export const fadeInDownVariants: Variants = {
  hidden: { opacity: 0, y: -28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easing.smooth,
    },
  },
};

export const fadeInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: easing.smooth,
    },
  },
};

export const fadeInRightVariants: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      ease: easing.smooth,
    },
  },
};

// Scale animations
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: easing.smooth,
    },
  },
};

// Stagger animations for lists
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easing.smooth,
    },
  },
};

// Hover animations
export const hoverScaleVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.4,
      ease: easing.smooth,
    },
  },
};

export const hoverLiftVariants: Variants = {
  rest: { y: 0 },
  hover: {
    y: -6,
    transition: {
      duration: 0.35,
      ease: easing.smooth,
    },
  },
};

// Image animations
export const imageZoomInVariants: Variants = {
  hidden: { scale: 1.03, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: easing.smooth,
    },
  },
};

export const parallaxImageVariants = (offset = 28): Variants => ({
  hidden: { y: offset },
  visible: {
    y: 0,
    transition: {
      duration: 1.0,
      ease: easing.smooth,
    },
  },
});

// Button animations
export const buttonHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.015,
    transition: {
      duration: 0.25,
      ease: easing.smooth,
    },
  },
  tap: { scale: 0.985 },
};

// Text animations
export const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.7,
      ease: easing.smooth,
    },
  }),
};

// Slide animations
export const slideInLeftVariants: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: easing.smooth,
    },
  },
};

export const slideInRightVariants: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: easing.smooth,
    },
  },
};

export const slideInUpVariants: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.85,
      ease: easing.smooth,
    },
  },
};

// Rotation animations
export const rotateInVariants: Variants = {
  hidden: { opacity: 0, rotate: -6 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.7,
      ease: easing.smooth,
    },
  },
};

// Blur animations
export const blurVariants: Variants = {
  hidden: { filter: 'blur(4px)', opacity: 0 },
  visible: {
    filter: 'blur(0px)',
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: easing.smooth,
    },
  },
};

// Custom combined animations
export const heroHeadingVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: easing.smooth,
    },
  },
};

export const heroSubheadingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.2,
      ease: easing.smooth,
    },
  },
};

export const heroCTAVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.35,
      ease: easing.smooth,
    },
  },
};

// Page transition animations
export const pageEnterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: easing.smooth,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.45,
      ease: easing.smooth,
    },
  },
};

// Cards and containers
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easing.smooth,
    },
  },
  hover: {
    y: -4,
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    transition: {
      duration: 0.3,
    },
  },
};
