# rabih.app Portfolio - Claude Code Project Plan

## Overview

Build a production portfolio site for Rabih Siddiqui at **rabih.app**, inspired by Overwatch 2's UI language (hub navigation, mode-selection cards, career-profile layout) but adapted for a professional portfolio context. The site should feel cinematic, premium, and interactive without looking like a game clone.

**Reference prototype:** The React artifact built during design planning is the source of truth for layout, interaction patterns, colors, typography, and component behavior. Treat it as a working spec. The prototype file is included alongside this plan.

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + CSS custom properties for theme tokens
- **Animation:** Framer Motion
- **Deployment:** Vercel
- **Domain:** rabih.app (already owned)
- **Fonts:** Rajdhani (display, Google Fonts), DM Sans (body, Google Fonts)

---

## Site Structure

```
/                   -> Main menu (hub screen)
/projects           -> Project selection (mode cards)
/projects/[slug]    -> Individual project case study
/about              -> Career profile (tabbed layout)
```

---

## Phase 1: Foundation

### 1.1 Project Setup
- Initialize Next.js with App Router, TypeScript, Tailwind CSS v4
- Configure custom fonts (Rajdhani + DM Sans) via `next/font/google`
- Set up CSS custom properties for the color system:
  - `--bg-base: #060810`
  - `--bg-panel: rgba(12, 16, 28, 0.7)`
  - `--border-subtle: rgba(255, 255, 255, 0.06)`
  - `--text-primary: #e8eaed`
  - `--text-secondary: #7a7f8a`
  - `--text-muted: #4a4f5a`
  - `--accent: #00d4ff`
  - `--accent-glow: rgba(0, 212, 255, 0.2)`
- Set up Framer Motion and configure shared transition presets
- Set up basic layout component with persistent header and status bar

### 1.2 Layout Shell
- **Header (persistent across all routes):**
  - Top-left: "RABIH.APP" in large Rajdhani 700 on the main route; collapses to monogram "R" badge + smaller "RABIH.APP" on sub-routes
  - Top-right: Contact icon button (email icon, 38x38, opens dropdown with copy-to-clipboard + mailto), profile block (name, domain, monogram, expandable dropdown with GitHub/LinkedIn/Resume links + "Available for projects" status)
  - Clicking the brand mark navigates to `/` (main menu)
- **Status bar (fixed bottom):**
  - Left: "PORTFOLIO v4.0" separator "DESIGN + DEVELOPMENT"
  - Right: Live clock (HH:MM, 24hr format)
  - Subtle top border, translucent background with backdrop-blur
- Use `<AnimatePresence>` with shared layout animations for route transitions

### 1.3 Animated Background
- Full-viewport canvas element rendering:
  - Slow-drifting grid lines (rgba cyan, very low opacity)
  - 50 floating particles with connection lines when within proximity
  - Slow horizontal scan line
  - Radial gradient that shifts position over time
- Vignette overlay (radial gradient, transparent center to dark edges)
- Bottom fade gradient for grounding
- Left-side fade gradient (darker left for text readability on main menu)
- **Blur state:** When on `/projects`, apply `filter: blur(8px)` to the canvas and overlay a `backdrop-filter: blur(12px)` layer with slight darkening. Transition smoothly (600ms ease).
- **Future-proofing:** Build the background as a swappable component. The canvas will eventually be replaced with a `<video>` element (looping, muted, autoplaying a cinematic clip of Rabih working). The video should be darkened, blurred when on project selection, and respect the same layering as the canvas.

---

## Phase 2: Main Menu (Landing Page)

### 2.1 Route: `/`
- Full-viewport, no scroll
- Left-aligned stacked navigation, vertically centered:
  - **PROJECTS** - Rajdhani 700 italic, ~68px, light gray default, white on hover
  - **ABOUT** - Rajdhani 700 italic, ~52px, medium gray default, white on hover
  - Vertical gap between primary items: minimal (line-height handles spacing)
  - Below primary items (32px gap): secondary links in smaller text (16px Rajdhani 600)
    - GITHUB
    - LINKEDIN
    - RESUME
- **Hover behavior for primary items:**
  - Text color transitions to white
  - Text shifts right by 8-10px (`translateX`)
  - Cyan accent bar (4px wide, ~48-56px tall) slides in from the left (-24px offset)
  - Subtle text-shadow glow
  - All transitions: 250ms ease
- **Hover behavior for secondary items:**
  - Color transitions from muted to light gray
- Primary items navigate to `/projects` and `/about`
- Secondary items open external links in new tabs
- Staggered entrance animation: items slide in from left with 50-70ms delay between each

### 2.2 Page Transitions
- Exiting the main menu: fade out + slight left shift
- Entering sub-pages: fade in + slight upward slide
- Use Framer Motion `<AnimatePresence>` with `mode="wait"`

---

## Phase 3: Projects Page

### 3.1 Route: `/projects`
- Full-viewport, no scroll
- Top-left: "PROJECTS" page title (Rajdhani 700 italic, 56px) with project count label beside it
- Center: horizontal row of project cards (mode-selection style)
- Bottom-right: "ESC BACK" button that navigates to `/`
- Background is blurred (see 1.3)

### 3.2 Project Cards
- 5 cards in a horizontal row, centered
- **Default state** (per card):
  - Width: 180px, Height: 360px
  - Dark translucent background with backdrop-blur
  - Subtle border (1px, rgba white 6%)
  - Centered icon (48x48 SVG, muted color)
  - Divider line below icon
  - Project name (Rajdhani 700, 15px, muted)
  - Category label (DM Sans 10px, very muted)
- **Hover/selected state:**
  - Width expands to 280px (cubic-bezier transition, 400ms)
  - Background shifts to project's accent color gradient (very subtle, 20% opacity top to transparent bottom)
  - Border color shifts to project accent (40% opacity)
  - Icon scales up, gains color + drop-shadow glow
  - Accent glow bar appears at bottom edge
  - Project description text fades in below name
  - Tags appear at bottom
  - "VIEW >" action label appears at very bottom
- **Card data** (each project needs):
  - `slug` (URL-safe identifier)
  - `name` (display title, all caps)
  - `category` (short label)
  - `description` (1-2 sentences)
  - `year`
  - `tags` (array of 2-4 strings)
  - `color` (hex accent color)
  - `icon` (React SVG component)
- Clicking a card navigates to `/projects/[slug]`
- Staggered entrance animation for cards (cardEnter keyframe, 60ms delay between each)

### 3.3 Project Data
Store project data in a `lib/projects.ts` file as a typed array. Each project should include all fields above plus:
- `coverImage` (path to hero image for project detail page)
- `sections` (array of content blocks for the case study -- see Phase 5)

---

## Phase 4: About Page

### 4.1 Route: `/about`
- Top-left: "ABOUT" page title (same treatment as projects)
- Content area: centered, max-width 860px
- Bottom-right: "ESC BACK" button
- **No additional background blur** (keep the normal atmospheric background)

### 4.2 Profile Header
- Left: Monogram badge (68x68, rounded, cyan gradient border)
- Right of badge:
  - Name: "RABIH SIDDIQUI" (Rajdhani 700, 26px)
  - Title: "Product Designer & Developer" (DM Sans, 12px, muted)
  - Stat pills: "7 YRS Experience" / "20+ Projects" / "PST Timezone" (Rajdhani 700 cyan values + DM Sans muted labels)

### 4.3 Tabbed Content
- Tab bar with 3 tabs: OVERVIEW | EXPERIENCE | TOOLKIT
- Active tab: white text + cyan underline bar with glow
- Inactive tabs: muted text
- Tab switching animates content with a fade-up transition
- **Use URL search params** (`?tab=experience`) so tabs are linkable and back-button friendly

#### Tab: Overview
- Bio panel: dark translucent card with 1-2 paragraph bio (DM Sans, 14px, light body text)
- Currently panel: cyan dot indicator + "CURRENTLY" label + short description of current work/interests

#### Tab: Experience
- Stacked role entries, each with:
  - Left column: date range (DM Sans 11px, muted, 110px min-width)
  - Right column: role title (Rajdhani 700), company name (DM Sans, cyan), one-line description (DM Sans, muted)
  - Subtle background highlight on hover
- 4-6 entries max

#### Tab: Toolkit
- 3-column grid of category panels (Design / Development / Infrastructure)
- Each panel: dark translucent card with category label + list of tools
- Each tool: name (DM Sans 13px) + proficiency label (DM Sans 10px, muted) -- "Daily driver", "Fluent", "Primary", "Exploring", etc.
- **No skill bars, no percentage indicators, no pill badges**

### 4.4 About Page Data
Store about data in `lib/about.ts`:
- Bio text
- Currently text
- Experiences array
- Toolkit categories array

---

## Phase 5: Project Detail Pages

### 5.1 Route: `/projects/[slug]`
- This is the case study page for individual projects
- **Layout:**
  - Top-left: project name as page title (same style as other page titles)
  - Top-right: persistent header (same as everywhere)
  - Below title: project metadata bar (year, category, tags, external link if applicable)
  - Content area: centered, max-width 900px, scrollable
  - Bottom-right: "ESC BACK" button (navigates to `/projects`)
  - Background blur: same as projects page

### 5.2 Content Structure
Each project case study is composed of ordered content blocks:
- **Hero image/video** - full-width, rounded corners, with subtle border
- **Text section** - heading + paragraph(s)
- **Image gallery** - 1-3 images in a row or full-width
- **Metrics/outcomes** - stat cards showing results (same style as about page stats)
- **Tech stack callout** - tools used, presented in a compact inline list

### 5.3 Content Format
Store case study content as structured data in `lib/projects.ts` or as MDX files in `content/projects/`. MDX is preferred for rich content flexibility. Use a custom MDX component set that renders with the site's design tokens.

---

## Phase 6: Responsive Design

### 6.1 Breakpoints
- **Desktop (1024px+):** Full experience as prototyped
- **Tablet (768-1023px):** 
  - Main menu: reduce font sizes (PROJECTS ~52px, ABOUT ~38px)
  - Project cards: reduce to 3-4 visible with horizontal scroll
  - About toolkit: 2-column grid
- **Mobile (< 768px):**
  - Main menu: stack vertically, further reduced sizes (PROJECTS ~42px, ABOUT ~30px)
  - Project cards: single card visible with swipe/scroll
  - About toolkit: single column
  - Header: collapse profile to monogram only, contact icon stays
  - Status bar: hide or simplify

### 6.2 Touch Considerations
- All hover states need tap equivalents
- Project cards: tap to select/expand, tap again or tap another to switch
- Contact dropdown: tap to toggle (already uses click, not hover)
- Profile dropdown: tap to toggle (convert from hover to click on mobile)

---

## Phase 7: Polish and Performance

### 7.1 SEO and Meta
- Page-level metadata for each route (title, description, og:image)
- Generate og:image dynamically or use static images per page
- Structured data (JSON-LD) for person schema on about page
- Sitemap generation

### 7.2 Performance
- Canvas animation: use `requestAnimationFrame` with proper cleanup
- Lazy load project detail page images
- Preload fonts
- Keep bundle size minimal: no heavy animation libraries beyond Framer Motion
- Target Lighthouse score: 90+ on all categories

### 7.3 Accessibility
- All interactive elements keyboard-navigable
- Tab indicators visible on focus
- ARIA labels on icon-only buttons (contact, monogram)
- Respect `prefers-reduced-motion`: disable canvas animation and transitions
- Color contrast: verify all text colors against dark backgrounds meet WCAG AA
- Skip-to-content link

### 7.4 Analytics
- Add Vercel Analytics or Plausible for lightweight, privacy-friendly tracking

---

## File Structure

```
rabih-portfolio/
  app/
    layout.tsx              # Root layout with header, status bar, background
    page.tsx                # Main menu (/)
    projects/
      page.tsx              # Project selection (/projects)
      [slug]/
        page.tsx            # Project detail (/projects/[slug])
    about/
      page.tsx              # About page (/about)
  components/
    layout/
      Header.tsx            # Persistent top bar (brand, contact, profile)
      StatusBar.tsx          # Bottom status bar
      BackButton.tsx         # "ESC BACK" nav button
    background/
      AnimatedBackground.tsx # Canvas + overlays + blur logic
    main-menu/
      MainNav.tsx           # Large stacked nav items
      SecondaryNav.tsx      # GitHub/LinkedIn/Resume links
    projects/
      ProjectCard.tsx       # Mode-selection style card
      ProjectGrid.tsx       # Horizontal card row
    about/
      ProfileHeader.tsx     # Avatar + name + stats
      TabBar.tsx            # Tab navigation
      OverviewTab.tsx
      ExperienceTab.tsx
      ToolkitTab.tsx
    contact/
      ContactButton.tsx     # Icon button + dropdown
    ui/
      Panel.tsx             # Reusable dark translucent panel
  lib/
    projects.ts             # Project data + types
    about.ts                # About page data + types
    animations.ts           # Shared Framer Motion variants
    theme.ts                # Color tokens, spacing, typography config
  content/
    projects/               # MDX files for project case studies (optional)
  public/
    images/
      projects/             # Project cover images and screenshots
    video/                  # Background video (future)
  tailwind.config.ts
  next.config.ts
```

---

## Design Tokens (Reference)

### Colors
```
bg-base:        #060810
bg-panel:       rgba(12, 16, 28, 0.7)
bg-panel-hover: rgba(255, 255, 255, 0.02)
border-subtle:  rgba(255, 255, 255, 0.06)
border-hover:   rgba(255, 255, 255, 0.12)
text-primary:   #e8eaed
text-body:      #b0b4be
text-secondary: #9ca0ab
text-muted:     #7a7f8a
text-dim:       #4a4f5a
text-ghost:     #2a2f3a
accent:         #00d4ff
accent-glow:    rgba(0, 212, 255, 0.2)
accent-bg:      rgba(0, 212, 255, 0.08)
success:        #10b981
```

### Project Accent Colors
```
meridian:  #00d4ff
kova:      #ff6b35
atlas:     #a78bfa
signal:    #10b981
prism:     #f472b6
```

### Typography
```
Display:  Rajdhani 700, italic for page titles and nav
Heading:  Rajdhani 700, normal for section headers
Label:    DM Sans 500, 10-11px, uppercase, 0.12-0.15em letter-spacing
Body:     DM Sans 400, 13-14px, 1.6-1.75 line-height
Small:    DM Sans 400, 11-12px
```

### Motion
```
hover-shift:    250ms ease
panel-enter:    400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
card-expand:    400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
page-transition: 300ms ease
stagger-delay:  60-80ms between items
bg-blur:        600ms ease
background-drift: 30s+ cycle (continuous, never jarring)
```

### Spacing
```
panel-padding:  22-28px
panel-radius:   10-12px
card-radius:    12px
button-radius:  6-8px
header-height:  72px
status-height:  36px
```

---

## Implementation Priority

1. Foundation (layout shell, background, header, status bar)
2. Main menu with navigation
3. Projects page with cards
4. About page with tabs
5. Project detail pages
6. Responsive breakpoints
7. Polish (a11y, SEO, performance, reduced-motion)
8. Background video swap (when footage is ready)

---

## Notes for Claude Code

- The prototype `.jsx` file is the visual spec. Match its layout, spacing, colors, and interaction behavior precisely.
- Do not introduce UI patterns not present in the prototype (no hamburger menus, no scroll-based animations on the main menu, no sidebar navigation).
- Do not use generic component libraries (no Material UI, no Chakra, no shadcn). Build all components from scratch with Tailwind.
- Do not add skill bars, progress rings, or percentage indicators anywhere.
- Keep the design dark-only. Do not add a light mode toggle.
- The "Available for projects" status and all placeholder data (experience entries, toolkit, project descriptions) are placeholders. Structure the data files so Rabih can easily swap in real content.
- Every animation must respect `prefers-reduced-motion`. When reduced motion is preferred, skip entrance animations and disable the canvas entirely (show a static dark gradient instead).
