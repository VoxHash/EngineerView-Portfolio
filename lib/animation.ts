import { Variants, Transition } from "framer-motion";

/**
 * Advanced animation system for consistent animations across the application
 */

// Common transitions
export const transitions = {
  smooth: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } as Transition,
  spring: { type: "spring", stiffness: 300, damping: 30 } as Transition,
  bounce: { type: "spring", stiffness: 400, damping: 10 } as Transition,
  gentle: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } as Transition,
  fast: { duration: 0.15, ease: [0.4, 0, 1, 1] } as Transition,
};

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.smooth },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: transitions.smooth },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: transitions.smooth },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: transitions.smooth },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: transitions.smooth },
};

// Scale animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: transitions.spring },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: transitions.bounce },
};

// Slide animations
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: transitions.spring },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: transitions.spring },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: transitions.spring },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: transitions.spring },
};

// Stagger container for lists
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Stagger item for list items
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: transitions.fast,
};

export const hoverLift = {
  y: -5,
  transition: transitions.fast,
};

export const hoverGlow = {
  boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
  transition: transitions.fast,
};

// Viewport-based animations
export const viewportOptions = {
  once: true,
  margin: "-100px",
  amount: 0.3,
} as const;

// Common animation presets
export const animationPresets = {
  card: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewportOptions,
    transition: transitions.smooth,
  },
  cardStagger: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewportOptions,
    transition: { ...transitions.smooth, delay: 0.1 },
  },
  hero: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: transitions.gentle,
  },
  modal: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: transitions.spring,
  },
  tooltip: {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 5 },
    transition: transitions.fast,
  },
} as const;

// Reduced motion support
export const prefersReducedMotion = (variants: Variants): Variants => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  }
  return variants;
};

