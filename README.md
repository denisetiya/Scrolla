# Svelte Smooth Scroll Animations

A lightweight and customizable library for creating smooth scroll animations in Svelte applications.

## Demo
[Svelte InScroll](https://svelte-inscroll.vercel.app/)

## Installation

```bash
npm install svelte-inscroll
```

## Usage

```svelte
<script>
  import { ScrollAnimation } from 'svelte-inscroll';
</script>

<ScrollAnimation animation="fade-up" delay={200} duration={800}>
  <div class="your-content">
    This content will animate when scrolled into view
  </div>
</ScrollAnimation>
```

## Available Animation Types

- `fade-up` - Fades in while moving up
- `fade-down` - Fades in while moving down
- `fade-left` - Fades in while moving from left
- `fade-right` - Fades in while moving from right
- `zoom-in` - Scales up from smaller size
- `zoom-out` - Scales down from larger size
- `flip-in` - Flips in from a rotation
- `rotate-in` - Rotates in from a tilted position
- `bounce-in` - Bounces in with a spring effect
- `slide-up` - Slides up from below

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| animation | string | 'fade-up' | Animation type from the available list |
| delay | number \| 'random' | 0 | Delay in ms before the animation starts. Use 'random' for random delay between 100-400ms |
| duration | number | 800 | Duration of the animation in ms |
| threshold | number | 0.2 | Intersection threshold (0-1) that determines when the animation triggers |
| rootMargin | string | '0px' | Root margin for Intersection Observer |
| once | boolean | false | Whether the animation should only play once |
| customClass | string | '' | Additional classes to add to the wrapper |
| customStyles | object | {} | Custom inline styles to apply to the wrapper |

## Example with Random Delays

```svelte
<script>
  import { ScrollAnimation } from 'svelte-smooth-scroll-animations';
  
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
</script>

{#each items as item, i}
  <ScrollAnimation 
    animation="fade-up" 
    delay="random"
    duration={800}
  >
    <div class="card">
      {item}
    </div>
  </ScrollAnimation>
{/each}
```

## License

MIT
