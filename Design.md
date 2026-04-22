# Design System: The Ethereal Grove
 
## 1. Overview & Creative North Star
 
The transition from a high-contrast, dark-mode environment to a pastel ecosystem requires more than just a color swap; it demands a shift in philosophy. The Creative North Star for this design system is **"The Ethereal Grove."** 
 
This vision reimagines trivia not as a high-stakes competition, but as a serene journey of growth. We move away from the rigid, boxed-in layouts of the past toward an editorial experience characterized by "Floating Organicism." By utilizing intentional asymmetry, generous whitespace, and soft, overlapping layers, we create a UI that feels as light as a breeze through leaves. The platform should feel curated and premium, replacing heavy borders with tonal shifts and using high-contrast typography scales to guide the eye through the "canopy" of information.
 
---
 
## 2. Colors
 
The color strategy moves away from the #16251E dark background to a light, airy `surface` (#F4F6FF). This palette uses sophisticated pastel tones to categorize content and define hierarchy without visual noise.
 
*   **Primary (Mint/Teal):** `primary` (#266654) and `primary_container` (#A9EAD3) act as the anchor, representing the "trunk" of the brand.
*   **Secondary (Lavender/Periwinkle):** `secondary` (#4F578F) provides a scholarly, calm contrast for secondary actions.
*   **Tertiary (Pale Yellow):** `tertiary` (#665B30) is used for celebratory moments, achievements, and "sunlight" highlights.
 
### The "No-Line" Rule
To maintain the "Ethereal" quality, **1px solid borders are strictly prohibited** for sectioning. Boundaries must be defined solely through:
1.  **Background Color Shifts:** Use `surface_container_low` against a `surface` background.
2.  **Tonal Transitions:** Defining an area by its distinct pastel container rather than a stroke.
 
### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, semi-opaque sheets. 
*   **Level 0:** `background` (#F4F6FF) – The canvas.
*   **Level 1:** `surface_container` (#E0E8FC) – Main content blocks.
*   **Level 2:** `surface_container_highest` (#D3DDF3) – Interactive elements or highlighted cards.
 
### The "Glass & Gradient" Rule
Floating elements (modals, navigation bars) must utilize **Glassmorphism**. Use semi-transparent variants of `surface_container_lowest` with a `backdrop-filter: blur(20px)`. 
 
### Signature Textures
Main CTAs and Hero sections should use a **Subtle Radial Gradient** transitioning from `primary` (#266654) to `primary_dim` (#175A48). This adds "soul" and depth that prevents the pastels from looking washed out or "flat."
 
---
 
## 3. Typography
 
The typography system pairs **Plus Jakarta Sans** (Display/Headline) with **Be Vietnam Pro** (Title/Body). This combination bridges the gap between modern geometric clarity and friendly, approachable warmth.
 
*   **Display (L/M/S):** Large, bold, and expressive. Use `display-lg` (3.5rem) for high-impact hero statements. These should feel editorial and carry the brand's voice.
*   **Headlines:** These use `plusJakartaSans` to maintain a "rounded" yet professional personality.
*   **Body (L/M/S):** Utilizing `beVietnamPro`, the body text is optimized for long-form reading during trivia sessions. The generous x-height ensures legibility against pastel backgrounds.
*   **Hierarchy:** We use scale to dictate importance. A `display-md` headline paired with a `body-lg` creates an authoritative, magazine-style layout that breaks the "app" feel.
 
---
 
## 4. Elevation & Depth
 
We eschew traditional material shadows in favor of **Tonal Layering**.
 
*   **The Layering Principle:** Depth is achieved by "stacking." A `surface_container_lowest` (#FFFFFF) card placed on top of a `surface_container_low` (#EBF1FF) section provides a natural, soft lift.
*   **Ambient Shadows:** For elements that must truly float (like a "Start Quiz" FAB), use a shadow with a blur radius of 40px-60px and an opacity of 6%. The shadow color must be a tinted version of `on_surface` (a deep slate-blue) rather than pure black.
*   **The "Ghost Border" Fallback:** If a divider is essential for accessibility, use the `outline_variant` token at **15% opacity**.
*   **Glassmorphism:** Use `surface_container_lowest` at 80% opacity with a blur to create "frosted leaf" overlays, allowing the background colors to bleed through and soften the overall aesthetic.
 
---
 
## 5. Components
 
### Buttons
*   **Primary:** A soft gradient from `primary` to `primary_dim`. Shape: `xl` (3rem) roundedness.
*   **Secondary:** `secondary_container` background with `on_secondary_container` text. No border.
*   **Tertiary:** Text-only using `primary` color, with a `surface_container_highest` hover state.
 
### Cards & Lists
*   **Forbid Divider Lines:** Separate list items with `0.5rem` of vertical whitespace and a subtle background shift (alternating `surface` and `surface_container_low`).
*   **Stylized Leaves:** Use the `lg` (2rem) or `xl` (3rem) corner radius to mimic organic, leaf-like shapes.
 
### Input Fields
*   **Surface:** `surface_container_lowest`.
*   **State:** On focus, the field should not gain a heavy border, but instead a `primary_container` soft outer glow (12px blur).
 
### Specialized Trivia Components
*   **Progress "Sapling":** A progress bar that uses a gradient of `primary` to `tertiary`, appearing to "grow" as the user answers questions.
*   **Option Chips:** Large, `md` (1.5rem) rounded containers. When selected, they transition to `primary_fixed` with a subtle `primary` ghost border.
 
---
 
## 6. Do's and Don'ts
 
### Do
*   **DO** use asymmetric layouts. Place a large "tree" illustration (stylized pastel leaves) slightly off-canvas to create movement.
*   **DO** use "Generous Whitespace." If you think there is enough space, add 16px more.
*   **DO** use `secondary` and `tertiary` pastel containers to categorize trivia genres (e.g., Lavender for History, Mint for Science).
 
### Don't
*   **DON'T** use #000000 for text. Always use `on_surface` (#282F3B) for a softer, premium look.
*   **DON'T** use sharp corners. The minimum corner radius for any container should be `sm` (0.5rem), with a preference for `DEFAULT` (1rem).
*   **DON'T** use high-contrast dark backgrounds. Even in "focused" moments, maintain the light, airy atmosphere of the Grove.
*   **DON'T** use 100% opaque borders. They break the "Ethereal" illusion and make the UI feel "templated."