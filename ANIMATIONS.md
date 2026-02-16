# Framer Motion Animations Implementation Guide

## Overview
This document details all Framer Motion animations integrated throughout the Babel Essence Design website. The animations are designed to create smooth, elegant transitions that enhance the user experience while maintaining the minimalist aesthetic.

## Animation Architecture

### Core Animation Utilities
**File:** `src/lib/animations.ts`

This centralized file contains all reusable animation variants and easing configurations:

#### Easing Curves
- **smooth**: `[0.25, 0.1, 0.25, 1]` - Professional, elegant easing
- **spring**: Spring physics for natural motion
- **bounce**: Playful bounce effect

#### Animation Variants

##### Fade Animations
- `fadeInVariants` - Simple opacity fade
- `fadeInUpVariants` - Fade in with upward movement
- `fadeInDownVariants` - Fade in with downward movement
- `fadeInLeftVariants` - Fade in from left
- `fadeInRightVariants` - Fade in from right

##### Scale Animations
- `scaleInVariants` - Scale up with fade

##### Stagger Animations
- `staggerContainerVariants` - Container for staggered children
- `staggerItemVariants` - Individual item animations in stagger groups

##### Hover Animations
- `hoverScaleVariants` - Scale on hover
- `hoverLiftVariants` - Lift effect on hover

##### Image Animations
- `imageZoomInVariants` - Zoom in image transition
- `parallaxImageVariants()` - Parallax effect (offset configurable)

##### Text Animations
- `textRevealVariants` - Character-by-character reveal
- `heroHeadingVariants` - Large heading entrance
- `heroSubheadingVariants` - Subheading with delay
- `heroCTAVariants` - Call-to-action button animation

##### Slide Animations
- `slideInLeftVariants` - Slide from left
- `slideInRightVariants` - Slide from right
- `slideInUpVariants` - Slide from bottom
- `slideInDownVariants` - Slide from top

##### Utility Animations
- `pageEnterVariants` - Full page entrance/exit
- `cardVariants` - Card hover and entrance
- `buttonHoverVariants` - Button interaction states
- `blurVariants` - Blur to focus effect
- `rotateInVariants` - Rotation entrance

## Component Implementations

### Enhanced AnimatedSection Component
**File:** `src/components/AnimatedSection.tsx`

Improved with multiple animation options:

```tsx
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  variant?: 'default' | 'fade' | 'scale' | 'blur';
}
```

**Usage:**
```tsx
<AnimatedSection direction="up" variant="scale" delay={0.2}>
  {content}
</AnimatedSection>
```

---

## Page-Specific Animations

### 1. **Index.tsx (Home Page)**
- **Hero Background**: Zoom in and fade (1.5s)
- **Hero Content**: Staggered entrance with delays
  - Label: 0.3s
  - Heading: 0.5s
  - Subheading: 0.8s
  - CTA Buttons: 1.1s
- **Arrow Icons**: Slide right on hover
- **Scroll Indicator**: Continuous up/down animation
- **Collections Grid**: Staggered items with scale on hover
- **Section Cards**: Hover scale effect (1.02x)

**Key Features:**
- Smooth stagger timing for hero content
- Parallax-style background zoom
- Interactive hover states on collection cards

### 2. **Collections.tsx**
- **Page Header**: Fade in and slide up
- **Collection Items**: 
  - Staggered entrance with alternating directions
  - Left items slide from left, right items slide from right
  - Image hover: Scale 1.03x
  - Title hover: Color transition with scale
  - Explore link: Slide right on hover

**Key Features:**
- Dynamic alternating animations based on item index
- Smooth image zoom on hover
- Text spacing animation on category labels

### 3. **ProductDetail.tsx**
- **Back Button**: Fade in and slide in
- **Product Images**: 
  - Main image: Zoom on hover
  - Thumbnail grid: Staggered entrance with individual hover scale
- **Product Info**: Fade in from right with 0.2s delay
- **Add to Cart Button**: Scale and tap animations

### 4. **Cart.tsx**
- **Header**: Fade in and slide up
- **Cart Items**: 
  - Staggered entrance with layout animations
  - Image hover: Scale 1.05x
  - Remove button: Rotate 90° on hover + scale
  - Quantity buttons: Scale and tap effects
- **Order Summary**: Slide in from right
- **Checkout Button**: Scale and tap animations

**Key Features:**
- Layout animations for smooth item removal
- Rotating delete icon for visual feedback
- Sticky summary box with entrance animation

### 5. **Philosophy.tsx**
- **Hero Image**: Zoom in and fade (1.2s)
- **Hero Text**: Staggered entrance
  - Heading: 0.5s
  - Subheading: 1s
- **Content Sections**: Scroll-triggered animations
- **Quote Block**: Side-staggered entrance

**Key Features:**
- Hero image zoom-in effect
- Scroll-triggered animations for page sections
- Elegant text reveals

### 6. **Consultancy.tsx**
- **Header**: Fade in and slide up
- **Includes/Ideal For Lists**: 
  - Staggered list items with check icon rotate on hover
  - Text has slide-right hover effect
- **Process Steps**: 
  - Staggered 3-column grid
  - Hover lift effect (y: -8)
- **Form Fields**: 
  - Staggered entrance
  - Focus state with box shadow
  - Submit button: Scale and tap

**Key Features:**
- Check icon rotation animation on hover
- Form field focus animations
- Progressive field reveal based on scroll
- Cool process step hover lift effects

### 7. **Footer.tsx**
- **Grid Content**: Staggered entrance
- **Links**: 
  - Slide right on hover
  - Letter spacing increase on brand name hover
- **Bottom Text**: Fade in with delay

**Key Features:**
- Staggered link animations
- Brand name letter-spacing animation
- Overall footer entrance with stagger

### 8. **Navbar.tsx** (Already Enhanced with GSAP)
- Smooth transitions complement Framer Motion animations throughout

---

## Animation Patterns Used

### 1. **Stagger Pattern**
Multiple items enter sequentially:
```tsx
<motion.div variants={staggerContainerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item} variants={staggerItemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

### 2. **Scroll Trigger Pattern**
Animations triggered on scroll into view:
```tsx
<motion.div
  whileInView="visible"
  initial="hidden"
  viewport={{ once: true, margin: '-100px' }}
>
  {content}
</motion.div>
```

### 3. **Hover State Pattern**
Interactive hover animations:
```tsx
<motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
  {content}
</motion.div>
```

### 4. **Tap Animation Pattern**
Button press feedback:
```tsx
<motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
  Click Me
</motion.button>
```

---

## Animation Timing Strategy

| Element | Duration | Easing | Purpose |
|---------|----------|--------|---------|
| Hero Background | 1.5s | smooth | Establishes presence |
| Hero Text | 0.8-1.0s | smooth | Content reveal |
| Page Sections | 0.8s | smooth | Consistent rhythm |
| Card Hover | 0.3s | smooth | Quick feedback |
| List Stagger | 0.1s intervals | smooth | Sequential flow |
| Images | 0.5-1.0s | smooth | Smooth transitions |
| Forms | 0.6-0.8s | smooth | User guidance |

---

## Performance Considerations

1. **Use viewport detection** - Animations only trigger when elements enter viewport
2. **GPU acceleration** - Transform and opacity animations use hardware acceleration
3. **Stagger delays** - Limited to prevent excessive animations
4. **Once trigger** - `viewport={{ once: true }}` prevents animation re-triggering

---

## Browser Compatibility

Framer Motion animations work in:
- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

---

## Customization Guide

### To Add New Animation Variant:
1. Add variant to `src/lib/animations.ts`
2. Export the variant
3. Use in component with `variants={newVariant}`

### To Adjust Animation Timing:
Edit the `transition` property in animation definitions:
```tsx
transition={{
  duration: 0.6,  // Adjust here
  delay: 0.2,     // Adjust stagger
  ease: easing.smooth  // Choose easing
}}
```

### To Change Hover Behavior:
Modify `whileHover` values:
```tsx
whileHover={{ scale: 1.10 }}  // Increase from 1.05
```

---

## Typography-Specific Animations

With our Crimson Text + Inter font upgrade:
- **Crimson Text (Headlines)** - Smooth scale/fade animations for elegance
- **Inter (Body)** - Quick, crisp animations for readability

Letter-spacing and text animations respect font choice.

---

## Testing Animations

To verify animations work correctly:
1. Open DevTools (F12)
2. Go to Performance tab
3. Record page interactions
4. Check for smooth 60fps motion
5. Verify no layout shifts (CLS = 0)

---

## Future Enhancement Ideas

1. Add gesture-based animations for mobile
2. Implement parallax scroll on hero sections
3. Add page transition animations
4. Create animated loading states
5. Add micro-interactions to form validation

---

## References

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Animation Timing Guide](https://www.framer.com/motion/animation/)
- [Gesture Support](https://www.framer.com/motion/gestures/)
