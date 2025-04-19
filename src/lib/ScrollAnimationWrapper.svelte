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

    let observer;
    let element;
    let isInView = false;
    let actualDelay = delay === "random" ? getRandomDelay() : delay;

    $: animationStyle =
        animationVariants[animation] || animationVariants["fade-up"];
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

    /* Animation states are controlled by the animation variable */
    .scroll-animation.in-view {
        opacity: 1;
    }

    /* Add keyframe animations */
    .bounce-in.in-view {
        animation: bounce-up var(--animation-duration)
            cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
        animation-delay: var(--animation-delay, 0ms);
    }

    .bounce-in:not(.in-view) {
        animation: none;
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

    /* Dynamic styles are applied via svelte's reactive style binding */
</style>
