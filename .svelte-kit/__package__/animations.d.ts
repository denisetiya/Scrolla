export declare const animationVariants: {
    'fade-up': {
        initial: string;
        final: string;
    };
    'fade-down': {
        initial: string;
        final: string;
    };
    'fade-left': {
        initial: string;
        final: string;
    };
    'fade-right': {
        initial: string;
        final: string;
    };
    'zoom-in': {
        initial: string;
        final: string;
    };
    'zoom-out': {
        initial: string;
        final: string;
    };
    'flip-in': {
        initial: string;
        final: string;
    };
    'rotate-in': {
        initial: string;
        final: string;
    };
    'bounce-in': {
        hasKeyframes: boolean;
        keyframeName: string;
        initial: string;
    };
    'slide-up': {
        initial: string;
        final: string;
    };
};
export declare function getRandomDelay(min?: number, max?: number): number;
