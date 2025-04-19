export const animationVariants = {
    'fade-up': {
      initial: 'translateY(50px)',
      final: 'translateY(0)'
    },
    'fade-down': {
      initial: 'translateY(-50px)',
      final: 'translateY(0)'
    },
    'fade-left': {
      initial: 'translateX(50px)',
      final: 'translateX(0)'
    },
    'fade-right': {
      initial: 'translateX(-50px)',
      final: 'translateX(0)'
    },
    'zoom-in': {
      initial: 'scale(0.8)',
      final: 'scale(1)'
    },
    'zoom-out': {
      initial: 'scale(1.2)',
      final: 'scale(1)'
    },
    'flip-in': {
      initial: 'perspective(800px) rotateX(30deg)',
      final: 'perspective(800px) rotateX(0)'
    },
    'rotate-in': {
      initial: 'rotate(-10deg) scale(0.9)',
      final: 'rotate(0) scale(1)'
    },
    'bounce-in': {
      hasKeyframes: true,
      keyframeName: 'bounce-up',
      initial: 'translateY(50px)',
    },
    'slide-up': {
      initial: 'translateY(100px)',
      final: 'translateY(0)'
    }
  };
  
  // Utility function to generate random delay
  export function getRandomDelay(min = 100, max = 400) {
    return Math.floor(Math.random() * (max - min)) + min;
  }