export interface ScrollAnimationOptions {
    animation?: string;
    delay?: number | 'random';
    duration?: number;
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
    customClass?: string;
    customStyles?: Record<string, string>;
}
export type AnimationVariant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out' | 'flip-in' | 'rotate-in' | 'bounce-in' | 'slide-up';
