# Claude Code Prompts for rabih.app Portfolio Build

Use these prompts in order. Each prompt corresponds to a phase from the project plan. Feed the `CLAUDE-CODE-PROJECT-PLAN.md`, `data.ts`, and the `rabih-portfolio-v3.jsx` prototype file into the project context before starting.

---

## Prompt 1: Project Setup & Foundation

```
Initialize a new Next.js 14+ project with App Router, TypeScript, and Tailwind CSS v4. 

Set up:
- Custom fonts via next/font/google: Rajdhani (weights 400, 500, 600, 700) and DM Sans (weights 300, 400, 500, 600, 700)
- CSS custom properties for all design tokens defined in the project plan under "Design Tokens (Reference)" -- colors, spacing, motion values
- A root layout (app/layout.tsx) that wraps all pages with the persistent Header and StatusBar components
- Framer Motion installed and configured

Copy the data.ts file into lib/data.ts. This is the single source of truth for all portfolio content.

Follow the file structure defined in the project plan exactly. Do not add extra directories or deviate from the component organization.

Do not build any page content yet -- just the shell, tokens, and layout wrapper.
```

---

## Prompt 2: Animated Background

```
Build the AnimatedBackground component (components/background/AnimatedBackground.tsx).

Reference the prototype JSX file for exact behavior. The background renders a full-viewport canvas with:
- A slowly drifting radial gradient (shifts position over time using sin/cos)
- Subtle grid lines (rgba cyan at ~2% opacity, moving slowly)
- 50 floating particles with proximity-based connection lines (draw lines between particles within 140px of each other)
- A horizontal scan line that sweeps down the screen
- Vignette overlay (radial gradient, transparent center to dark edges)
- Bottom fade gradient (25vh, dark at bottom)
- Left-side fade gradient (35vw, for text readability on main menu)

The component accepts a `blurred` prop (boolean). When true:
- Apply filter: blur(8px) to the canvas
- Overlay a backdrop-filter: blur(12px) layer with rgba(6,8,13,0.35) background
- Transition both smoothly over 600ms ease

Use requestAnimationFrame with proper cleanup on unmount. Respect prefers-reduced-motion: when reduced motion is preferred, skip the canvas entirely and render a static dark gradient background instead.
```

---

## Prompt 3: Header, Status Bar, and Contact Button

```
Build three components:

1. Header (components/layout/Header.tsx):
   - Fixed top bar, 72px height, z-50
   - Left side: Brand mark
     - On the main route (/): display "RABIH.APP" in Rajdhani 700, 28px, light text with subtle cyan text-shadow
     - On sub-routes (/projects, /about, /projects/[slug]): display a 28x28 cyan gradient monogram "R" badge + "RABIH.APP" in smaller muted text
     - Clicking the brand navigates to /
   - Right side: ContactButton + ProfileCorner (name, domain, monogram, expandable dropdown)
   - Use the identity data from lib/data.ts for name, domain, email, and social links

2. ContactButton (components/contact/ContactButton.tsx):
   - Icon-only button (38x38, rounded 8px, subtle border)
   - Envelope SVG icon in cyan
   - Click toggles a dropdown with:
     - "GET IN TOUCH" label
     - Email address display in a dark input-like container
     - Two action buttons side by side: "COPY" (copies email to clipboard, shows green checkmark + "COPIED" for 2s) and "EMAIL" (mailto link, cyan accent)
   - Click outside closes the dropdown
   - Pull the email from identity data

3. StatusBar (components/layout/StatusBar.tsx):
   - Fixed bottom, 36px height
   - Left: "PORTFOLIO v4.0" | "DESIGN + DEVELOPMENT" (use very muted text, 10px)
   - Right: live clock in HH:MM 24hr format, updating every second
   - Translucent background with backdrop-blur

Match all colors, spacing, typography, and behavior from the prototype file exactly.
```

---

## Prompt 4: Main Menu (Landing Page)

```
Build the main menu page (app/page.tsx) with the MainNav and SecondaryNav components.

Layout: full viewport, no scroll, content vertically centered, left-aligned with 64px padding.

Primary navigation (stacked vertically):
- "PROJECTS" -- Rajdhani 700 italic, 68px, links to /projects
- "ABOUT" -- Rajdhani 700 italic, 52px, links to /about
- PROJECTS should be visually larger and brighter than ABOUT (different default colors: PROJECTS is #c8cad0, ABOUT is #8a8e98)

Hover behavior for both primary items:
- Text color transitions to white
- Text shifts right by 8-10px (translateX) 
- A 4px-wide cyan accent bar slides in vertically from the left edge (-24px offset)
- Subtle text-shadow glow appears
- All transitions: 250ms ease

Below the primary items (32px gap), render secondary links:
- GITHUB, LINKEDIN, RESUME
- Rajdhani 600, 16px, very muted, brighten on hover
- Pull URLs from identity data in lib/data.ts
- Open in new tabs

Entrance animation: stagger all items sliding in from the left (slideRight) with 50-70ms delay between each. Use Framer Motion.

Use Next.js Link for internal navigation (PROJECTS, ABOUT). Use standard <a> tags for external links.
```

---

## Prompt 5: Projects Page (Mode Selection Cards)

```
Build the projects page (app/projects/page.tsx) with ProjectCard and ProjectGrid components.

Layout:
- Full viewport, no scroll
- Top-left: "PROJECTS" page title (Rajdhani 700 italic, 56px) with a project count beside it
- Center: horizontal row of project cards
- Bottom-right: BackButton component that navigates to /
- Background should be in blurred state (pass blurred=true to AnimatedBackground)

Pull all project data from lib/data.ts. There are 9 projects. Render all 9 as cards in a horizontal row. If they don't all fit at the default card width, allow horizontal scrolling or reduce card width slightly to fit.

ProjectCard behavior (reference prototype closely):
- Default state: 160-180px wide, 360px tall. Dark translucent background with backdrop-blur. Subtle border. Centered icon (generate the SVG icons based on the iconDescription field in each project's data). Project name below in small muted text. Category label below that.
- Hover state: width expands to 260-280px. Background shifts to the project's accent color gradient (very subtle). Border color shifts to project accent. Icon scales up and gains color + glow. Description text fades in. Tags appear at bottom. "VIEW >" label appears. Accent glow bar at bottom edge.
- Transition: 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)

Clicking a card navigates to /projects/[slug].

Create the BackButton as a reusable component (components/layout/BackButton.tsx): "ESC BACK" text, subtle border, muted color, brightens on hover.

Stagger card entrance animations with 60ms delay between each.
```

---

## Prompt 6: About Page (Career Profile)

```
Build the about page (app/about/page.tsx) with profile header, tab bar, and three tab content panels.

Layout:
- Top-left: "ABOUT" page title
- Content: centered, max-width 860px, scrollable if needed
- Bottom-right: BackButton navigating to /
- Normal background (not blurred)

Profile Header:
- 68x68 monogram badge (cyan gradient border, rounded 10px)
- Name: "RABIH SIDDIQUI" (Rajdhani 700, 26px)
- Title from identity data
- Stat row: display education year ("UCSD '24"), project count from the projects array length, and timezone from identity data

Tab bar: OVERVIEW | EXPERIENCE | TOOLKIT
- Use URL search params (?tab=overview) so tabs are linkable and back-button works
- Active tab: white text + cyan underline with glow
- Tab content animates with fade-up on switch

Tab: OVERVIEW
- Bio panel: render the about.background paragraphs in a dark translucent card
- Currently panel: cyan dot + "CURRENTLY" label + about.currently text
- Certificates panel: list the in-progress certificates from data.ts with status indicators

Tab: EXPERIENCE
- Render each entry from the experiences array
- Each row: period on the left (110px min-width), role + company (cyan) + description on the right
- Include the experience type badge (Voluntary, Freelance)
- Also add the Education entry at the bottom, styled distinctly (school, degree, year, description)

Tab: TOOLKIT
- 3-column grid of toolkit categories from data.ts
- Each category: dark panel with category name label + list of tools with proficiency labels
- No skill bars, no progress indicators, no pill badges -- just text pairs

Pull ALL data from lib/data.ts. Do not hardcode any content in the components.
```

---

## Prompt 7: Project Detail Pages

```
Build the project detail page (app/projects/[slug]/page.tsx).

Use generateStaticParams to pre-generate pages for all project slugs from lib/data.ts.

Layout:
- Top-left: project name as page title (Rajdhani 700 italic, 48px)
- Below title: metadata bar showing year, category, and tags in a horizontal row
- Action links: render "LIVE" and "SOURCE" buttons if liveUrl/sourceUrl exist in the project data. For V.I.S.A, render a "SLIDES" button using slidesUrl. These should open in new tabs. Style them as subtle bordered buttons with arrow icons, using the project's accent color on hover.
- Content area: centered, max-width 900px, scrollable
- Main content: the project description rendered in a dark translucent panel
- Tech stack: the tags rendered as a horizontal list below the description
- Bottom-right: BackButton navigating to /projects
- Background in blurred state

For now, the detail pages will be simple (metadata + description + links). The content can be expanded later with case study sections, screenshots, and MDX when Rabih has that content ready. Structure the page so adding more sections later is straightforward.

Generate og:image metadata and page titles dynamically from the project data.
```

---

## Prompt 8: Page Transitions & Animation Polish

```
Add page transitions using Framer Motion AnimatePresence.

- Wrap the page content in each route with motion.div
- Exit animation: fade out + slight shift (left for main menu exit, down for sub-page exit)
- Enter animation: fade in + slight upward slide
- Duration: 300ms ease
- Use mode="wait" on AnimatePresence

Also add:
- Stagger entrance animations for all list-based content (experience entries, toolkit panels, project cards)
- Hover micro-interactions on all interactive elements (buttons, links, cards) with consistent 250ms timing
- Smooth tab content switching on the about page (crossfade with fade-up)

Verify that all animations respect prefers-reduced-motion. When reduced motion is active:
- Disable all entrance/stagger animations
- Disable the canvas background (show static gradient)
- Keep essential state transitions (active tab indicator, hover color changes) but remove transform-based motion
```

---

## Prompt 9: Responsive Design

```
Make the site responsive across three breakpoints:

Desktop (1024px+): full experience as built.

Tablet (768-1023px):
- Main menu: PROJECTS ~52px, ABOUT ~38px
- Project cards: allow horizontal scroll if cards overflow, or reduce to 4 visible with scroll for the rest
- About toolkit: 2-column grid
- Header: keep full layout but tighten spacing

Mobile (< 768px):
- Main menu: PROJECTS ~42px, ABOUT ~30px, secondary nav items smaller
- Project cards: single card width with horizontal swipe/scroll, show card name below each
- About toolkit: single column
- About experience: stack period above role instead of side-by-side
- Header: collapse profile text to just the monogram, keep contact icon
- Status bar: hide the left-side labels, keep clock only, or hide entirely
- Page titles: reduce to ~36px
- All dropdowns: full-width on mobile

Convert all hover interactions to tap equivalents on touch devices:
- Profile dropdown: tap to toggle instead of hover
- Project cards: tap to expand, tap another to switch
- Contact: already click-based, works as-is

Test touch scrolling on the projects page specifically -- horizontal card scroll must feel smooth with momentum scrolling (-webkit-overflow-scrolling: touch or scroll-snap).
```

---

## Prompt 10: SEO, Accessibility, and Final Polish

```
Final pass for production readiness:

SEO:
- Add metadata to each route (title, description, og:image)
  - /: "Rabih Siddiqui - Portfolio" 
  - /projects: "Projects - Rabih Siddiqui"
  - /projects/[slug]: "[Project Name] - Rabih Siddiqui"
  - /about: "About - Rabih Siddiqui"
- Generate a sitemap.xml
- Add robots.txt
- Add JSON-LD structured data for Person schema on the about page
- Add canonical URLs

Accessibility:
- All icon-only buttons need aria-labels (contact button: "Contact", monogram: "Home", back button: "Go back")
- Tab navigation must work across all interactive elements
- Focus indicators visible on all focusable elements (use a cyan outline ring on :focus-visible)
- Skip-to-content link at the top of the page
- Proper heading hierarchy (h1 for page titles, h2 for sections, h3 for items)
- Alt text on any images (profile photo when added, project screenshots when added)
- Verify all text meets WCAG AA contrast against dark backgrounds

Performance:
- Preload fonts
- Ensure canvas animation runs at 60fps and cleans up properly
- Lazy load any images on project detail pages
- Check bundle size -- keep it lean, no unnecessary dependencies

Add a simple 404 page that matches the site's design (dark background, "PAGE NOT FOUND" in Rajdhani, back-to-home button).

Deploy to Vercel and configure the rabih.app domain.
```

---

## Notes

- Always reference `lib/data.ts` for content. Never hardcode text, URLs, or project details in components.
- Reference the prototype JSX file for visual behavior when the project plan description is ambiguous.
- The project has 9 projects, not 5. The card layout needs to accommodate all 9 (the prototype showed 5 as a placeholder).
- Rabih's email is rabihzsiddiqui@gmail.com, not hello@rabih.app.
- The about page profile header should reflect his actual background: UCSD Cognitive Science graduate, not a senior designer. Use the identity and about data from data.ts.
- The naming convention for projects embeds a capital R (audoRa, compResso, etc.). The cards display the nameUpper field (all caps), but project detail pages and any inline references should preserve the original mixed-case name field.
