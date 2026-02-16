import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUpVariants, fadeInDownVariants, fadeInLeftVariants, fadeInRightVariants, scaleInVariants, blurVariants, easing } from '@/lib/animations';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  variant?: 'default' | 'fade' | 'scale' | 'blur';
}

const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up',
  variant = 'default'
}: AnimatedSectionProps) => {
  // Select the appropriate variants based on direction and variant
  const selectVariants = () => {
    if (variant === 'fade') return fadeInUpVariants;
    if (variant === 'scale') return scaleInVariants;
    if (variant === 'blur') return blurVariants;

    // default: choose based on direction
    switch (direction) {
      case 'down':
        return fadeInDownVariants;
      case 'left':
        return fadeInLeftVariants;
      case 'right':
        return fadeInRightVariants;
      default:
        return fadeInUpVariants;
    }
  };

  const variants = selectVariants();

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-150px' }}
      transition={{ delay, ease: easing.smooth }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
