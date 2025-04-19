<script>
    import { onMount, onDestroy } from "svelte";
    import { animationVariants, getRandomDelay } from "./animations.js";

    export let animation = "fade-up";
    export let delay = 0;
    export let duration = 800;
    export let threshold = 0.2;
    export let rootMargin = "0px";
    export let once = false;
    export let customClass = "";
    export let customStyles = {};

    /**
     * @type {IntersectionObserver}
     */
    let observer;
    /**
     * @type {Element}
     */
    let element;
    let isInView = false;
    let actualDelay = typeof delay === "string" && delay === "random" ? getRandomDelay() : delay;

    $: animationStyle =
        (animation in animationVariants
            // @ts-ignore
            ? animationVariants[animation]
            : animationVariants["fade-up"]);
    $: transitionDuration = `${duration}ms`;

    function getTransformStyle() {
        return animationStyle.initial || "";
    }

    onMount(() => {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        isInView = true;
                        if (once) observer.disconnect();
                    } else {
                        if (!once) isInView = false;
                    }
                });
            },
            {
                threshold,
                rootMargin,
            },
        );

        if (element) {
            observer.observe(element);
        }
    });

    onDestroy(() => {
        if (observer) {
            observer.disconnect();
        }
    });
</script>

<div
    bind:this={element}
    class="scroll-animation {animation} {customClass} {isInView
        ? 'in-view'
        : ''}"
    style="
        --animation-delay: {actualDelay}ms;
        --animation-duration: {transitionDuration};
        transform: {isInView ? animationStyle.animate : getTransformStyle()};
        opacity: {isInView ? 1 : 0};
        {Object.entries(customStyles)
            .map(([key, value]) => `${key}: ${value};`)
            .join(' ')}
    "
>
    <slot />
</div>

<style>
    .scroll-animation {
        opacity: 0;
        transition:
            opacity var(--animation-duration) cubic-bezier(0.5, 0, 0.15, 1),
            transform var(--animation-duration) cubic-bezier(0.5, 0, 0.15, 1);
        transition-delay: var(--animation-delay, 0ms);
        will-change: opacity, transform;
    }

    /* Animations with keyframes */
    .fade-up.in-view {
        animation: fade-up var(--animation-duration) ease-out forwards;
        animation-delay: var(--animation-delay, 0ms);
    }

    @keyframes fade-up {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .fade-down.in-view {
        animation: fade-down var(--animation-duration) ease-out forwards;
        animation-delay: var(--animation-delay, 0ms);
    }

    @keyframes fade-down {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .fade-left.in-view {
        animation: fade-left var(--animation-duration) ease-out forwards;
        animation-delay: var(--animation-delay, 0ms);
    }

    @keyframes fade-left {
        from {
            transform: translateX(-20px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .fade-right.in-view {
        animation: fade-right var(--animation-duration) ease-out forwards;
        animation-delay: var(--animation-delay, 0ms);
    }

    @keyframes fade-right {
        from {
            transform: translateX(20px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .zoom-in.in-view {
        animation: zoom-in var(--animation-duration) ease-out forwards;
        animation-delay: var(--animation-delay, 0ms);
    }

    @keyframes zoom-in {
        from {
            transform: scale(0.9);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    .zoom-out.in-view {
        animation: zoom-out var(--animation-duration) ease-out forwards;
        animation-delay: var(--animation-delay, 0ms);
    }

    @keyframes zoom-out {
        from {
            transform: scale(1.1);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    .flip-in.in-view {
        animation: flip-in var(--animation-duration) ease-out forwards;
        animation-delay: var(--animation-delay, 0ms);
    }

    @keyframes flip-in {
        from {
            transform: rotateY(-180deg);
            opacity: 0;
        }
        to {
            transform: rotateY(0);
            opacity: 1;
        }
    }

    .rotate-in.in-view {
        animation: rotate-in var(--animation-duration) ease-out forwards;
        animation-delay: var(--animation-delay, 0ms);
    }

    @keyframes rotate-in {
        from {
            transform: rotate(90deg);
            opacity: 0;
        }
        to {
            transform: rotate(0);
            opacity: 1;
        }
    }

    .bounce-in.in-view {
        animation: bounce-up var(--animation-duration) cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
        animation-delay: var(--animation-delay, 0ms);
    }

    @keyframes bounce-up {
        0% {
            transform: translateY(50px);
            opacity: 0;
        }
        70% {
            transform: translateY(-15px);
            opacity: 1;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .slide-up.in-view {
        animation: slide-up var(--animation-duration) ease-out forwards;
        animation-delay: var(--animation-delay, 0ms);
    }

    @keyframes slide-up {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    /* Dynamic styles are applied via svelte's reactive style binding */
</style>
