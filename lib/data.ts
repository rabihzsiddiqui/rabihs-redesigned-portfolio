// lib/data.ts
// ============================================================
// All portfolio data for rabih.app
// This file is the single source of truth for content.
// Update entries here and they propagate across the site.
// ============================================================

// ── Site Identity ──────────────────────────────────────────

export const identity = {
  name: "Rabih Siddiqui",
  domain: "rabih.app",
  email: "rabihzsiddiqui@gmail.com",
  title: "Aspiring UX Researcher / Developer",
  shortTitle: "Cognitive Science & UX",
  bio: "Cognitive Science graduate from UC San Diego with hands-on experience in product testing and participation in user research through Meta and Google.",
  status: "Open to opportunities",
  github: "https://github.com/rabihzsiddiqui",
  linkedin: "https://www.linkedin.com/in/rabihsiddiqui/",
  location: "California",
  timezone: "PST",
};

// ── About Page ─────────────────────────────────────────────

export const about = {
  background: [
    "I'm a UC San Diego graduate with a degree in Cognitive Science, interested in the space where design, psychology, and engineering meet. I enjoy building clean, thoughtful interfaces and understanding how people actually use the things we create.",
    "Right now, I'm coding regularly and working through professional certificates in Google UX Design, Meta Front-End Development, and IBM Mobile App Development. My goal is to keep strengthening both how I think about products and how I build them.",
  ],
  currently:
    "Coding regularly and working through professional certificates in Google UX Design, Meta Front-End Development, and IBM Mobile App Development.",
};

// ── Experience ─────────────────────────────────────────────

export interface Experience {
  role: string;
  company: string;
  type: string; // "Voluntary" | "Freelance" | etc.
  period: string;
  description: string;
  tags: string[];
}

export const experiences: Experience[] = [
  {
    role: "Trusted Tester",
    company: "Google",
    type: "Voluntary",
    period: "Sept 2021 - Present",
    description:
      "Participate in early-stage testing of Google's experimental apps, features, and hardware products. Deliver structured reports covering usability, functionality, and accessibility, helping teams prioritize fixes and improvements before public release.",
    tags: ["Product Testing", "QA", "Accessibility", "Usability"],
  },
  {
    role: "User Research Participant",
    company: "Google",
    type: "Voluntary",
    period: "Nov 2023 - Present",
    description:
      "Engage in moderated and unmoderated research sessions, including interviews, diary studies, and prototype evaluations, to inform product design decisions across Google's product suite. Provide detailed qualitative feedback on user flows and pain points.",
    tags: ["UX Research", "User Interviews", "Prototype Testing"],
  },
  {
    role: "User Research Participant",
    company: "Meta",
    type: "Voluntary",
    period: "Mar 2025 - Present",
    description:
      "Participate in research studies evaluating Meta's emerging social platforms and technologies. Deliver actionable feedback on interaction design, feature discoverability, and end-to-end user experience across web and mobile surfaces.",
    tags: ["UX Research", "Social Platforms", "Interaction Design"],
  },
  {
    role: "VR Prototype QA",
    company: "KIWI design",
    type: "Freelance",
    period: "Dec 2020 - Aug 2024",
    description:
      "Performed quality assurance testing on VR accessories and prototype hardware designed for Meta Quest headsets. Logged hardware defects, identified usability regressions, and reported compatibility issues, contributing to faster iteration cycles and higher product quality.",
    tags: ["VR/XR", "Hardware QA", "Bug Reporting", "Meta Quest"],
  },
];

// ── Education ──────────────────────────────────────────────

export const education = {
  school: "University of California, San Diego",
  degree: "B.S. Cognitive Science",
  year: "Class of 2024",
  location: "La Jolla, CA",
  status: "Graduated",
  description:
    "Cognitive Science at UC San Diego bridges psychology, neuroscience, linguistics, philosophy, and computer science to understand the nature of mind and intelligence. Coursework provided a strong foundation in human-centered design, research methodology, and the cognitive underpinnings of user behavior.",
};

// ── Toolkit ────────────────────────────────────────────────

export interface ToolCategory {
  name: string;
  tools: { name: string; level: string }[];
}

export const toolkit: ToolCategory[] = [
  {
    name: "LANGUAGES",
    tools: [
      { name: "TypeScript", level: "Primary" },
      { name: "JavaScript", level: "Primary" },
      { name: "Python", level: "Proficient" },
      { name: "Java", level: "Proficient" },
      { name: "HTML/CSS", level: "Daily driver" },
      { name: "R", level: "Familiar" },
    ],
  },
  {
    name: "FRAMEWORKS & TOOLS",
    tools: [
      { name: "Next.js", level: "Primary" },
      { name: "Tailwind CSS", level: "Daily driver" },
      { name: "Vitest", level: "Testing" },
      { name: "Vite", level: "Build tool" },
      { name: "Git", level: "Daily" },
      { name: "Figma", level: "Design" },
    ],
  },
  {
    name: "RESEARCH & TESTING",
    tools: [
      { name: "Product Testing", level: "Core skill" },
      { name: "UX Research", level: "Core skill" },
      { name: "Research Design", level: "Proficient" },
      { name: "Usability Testing", level: "Proficient" },
    ],
  },
];

// ── Projects ───────────────────────────────────────────────
//
// icon: describe the SVG concept for each project.
//       Claude Code should create simple, monoline, 48x48 SVG icons
//       based on these descriptions. No filled shapes, 1.5px stroke,
//       currentColor for stroke so they inherit the card's color state.
//
// All projects follow Rabih's naming convention: a capital R embedded
// in the project name (audoRa, compResso, scReen, etc.), except for
// "nyra", "V.I.S.A", and the restaurant analysis project.

export interface Project {
  slug: string;
  name: string;         // display name, preserving original casing
  nameUpper: string;    // all-caps version for the card UI
  category: string;
  description: string;
  year: string;
  tags: string[];
  color: string;        // accent color for card hover/glow
  iconDescription: string;
  liveUrl: string | null;
  sourceUrl: string | null;
  slidesUrl: string | null;
}

export const projects: Project[] = [
  {
    slug: "audora",
    name: "audoRa",
    nameUpper: "AUDORA",
    category: "AUDIO TOOL",
    description:
      "Browser-based audio extractor. Pulls audio from video files right in the browser using ffmpeg.wasm, so nothing gets uploaded anywhere. Supports common formats like MP4, WebM, MOV, and MKV, with options for bitrate, channels, and trimming before export.",
    year: "2025",
    tags: ["Next.js", "TypeScript", "ffmpeg.wasm", "Tailwind CSS"],
    color: "#00d4ff",
    iconDescription:
      "Waveform icon: three vertical bars of varying height representing an audio waveform, centered in the frame",
    liveUrl: "https://audora-audio.vercel.app/",
    sourceUrl: "https://github.com/rabihzsiddiqui/audora-audio-extractor",
    slidesUrl: null,
  },
  {
    slug: "compresso",
    name: "compResso",
    nameUpper: "COMPRESSO",
    category: "VIDEO TOOL",
    description:
      "Browser-based video compressor. Compresses video files directly in the browser without sending them to a server. Lets users adjust compression settings, compare file size changes, and export a smaller file locally. Made to keep video compression quick, simple, and private.",
    year: "2025",
    tags: ["Next.js", "TypeScript", "ffmpeg.wasm", "Tailwind CSS"],
    color: "#a78bfa",
    iconDescription:
      "Compression icon: two arrows pointing inward toward a small rectangle, representing file size reduction",
    liveUrl: "https://compresso-beta.vercel.app/",
    sourceUrl: "https://github.com/rabihzsiddiqui/compResso",
    slidesUrl: null,
  },
  {
    slug: "screen",
    name: "scReen",
    nameUpper: "SCREEN",
    category: "DISPLAY TOOL",
    description:
      "Browser-native display comparison tool that renders any two screens side by side at accurate physical scale. Choose from a preset library of phones, tablets, laptops, monitors, and TVs, or enter custom dimensions. Everything runs locally with no uploads and no tracking.",
    year: "2025",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vitest"],
    color: "#10b981",
    iconDescription:
      "Two rectangles of different sizes side by side, representing screen comparison. One larger (monitor), one smaller (phone).",
    liveUrl: "https://sc-reen.vercel.app/",
    sourceUrl: "https://github.com/rabihzsiddiqui/scReen",
    slidesUrl: null,
  },
  {
    slug: "pomodoro",
    name: "pomodoRo",
    nameUpper: "POMODORO",
    category: "PRODUCTIVITY",
    description:
      "Browser-native Pomodoro timer with configurable work and break cycles. Fully keyboard-driven with spacebar, skip, and reset controls. Includes a circular SVG countdown ring, session tracking via localStorage, optional audio chimes, browser notifications, and a dynamic favicon that updates with the timer state.",
    year: "2025",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vitest"],
    color: "#f472b6",
    iconDescription:
      "Circle with a clock hand at roughly 10 o'clock position, suggesting a countdown timer",
    liveUrl: "https://romodoro.vercel.app/",
    sourceUrl: "https://github.com/rabihzsiddiqui/pomo",
    slidesUrl: null,
  },
  {
    slug: "scribe",
    name: "scRibe",
    nameUpper: "SCRIBE",
    category: "WRITING TOOL",
    description:
      "A distraction-free writing workspace with write, preview, and read modes. Tracks word count, character count, reading time, and session progress in real time. Includes a built-in Pomodoro timer for focused writing sessions and a dark/light theme that persists across visits.",
    year: "2025",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    color: "#ff6b35",
    iconDescription:
      "Stylized document icon with three horizontal lines representing text, and a pencil or cursor at the top-right corner",
    liveUrl: "https://sc-ribe.vercel.app/",
    sourceUrl: "https://github.com/rabihzsiddiqui/scRibe",
    slidesUrl: null,
  },
  {
    slug: "spectra",
    name: "spectRa",
    nameUpper: "SPECTRA",
    category: "ACCESSIBILITY",
    description:
      "Still a work in progress. A client-side color accessibility tool that goes beyond basic contrast checks by showing how color pairings appear under different types of color vision deficiency and suggesting better alternatives. Built by someone who is colorblind, for people who want to design more accessibly.",
    year: "2025",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    color: "#fbbf24",
    iconDescription:
      "An eye icon with a spectrum or rainbow arc across it, representing color vision. Keep it simple: circle for the eye, arc above.",
    liveUrl: "https://spectra-oculi.vercel.app/",
    sourceUrl: "https://github.com/rabihzsiddiqui/spectRa",
    slidesUrl: null,
  },
  {
    slug: "nyra",
    name: "nyra",
    nameUpper: "NYRA",
    category: "AI PROTOTYPE",
    description:
      "A prototype interface for a personal AI companion and assistant. Built around four states: idle, listening, thinking, and speaking, with a minimal frosted-glass UI and WebGL-based visual effects through GLSL shaders. This is the starting point for a larger long-term assistant project.",
    year: "2025",
    tags: ["JavaScript", "Vite", "GLSL", "WebGL", "HTML/CSS"],
    color: "#818cf8",
    iconDescription:
      "Abstract orb or sphere with radiating lines, representing an AI entity. Concentric circles with small dots at cardinal points.",
    liveUrl: "https://nyra-prototype.vercel.app/",
    sourceUrl: "https://github.com/rabihzsiddiqui/nyra-prototype",
    slidesUrl: null,
  },
  {
    slug: "restaurant-rating-analysis",
    name: "Restaurant Rating Analysis",
    nameUpper: "RESTAURANT ANALYSIS",
    category: "DATA SCIENCE",
    description:
      "Looked at whether restaurant ratings relate to geographic proximity using a real review dataset. Built in Jupyter with Python, pandas, and data visualization to explore patterns and present the results clearly.",
    year: "2024",
    tags: ["Python", "Jupyter Notebook", "Pandas", "Matplotlib"],
    color: "#34d399",
    iconDescription:
      "Bar chart icon with three bars of different heights and a small map pin above one of them",
    liveUrl: null,
    sourceUrl:
      "https://github.com/rabihzsiddiqui/Restaurant_Rating_Analysis/blob/dataproject/Restaurant_Rating_Analysis_Complete.ipynb",
    slidesUrl: null,
  },
  {
    slug: "visa",
    name: "V.I.S.A",
    nameUpper: "V.I.S.A",
    category: "UX CONCEPT",
    description:
      "A concept for an assistive tool that helps visually impaired users navigate their surroundings with more confidence. The idea combines haptic feedback, spatial audio, and environmental awareness, with accessibility and usability kept at the center of the project.",
    year: "2024",
    tags: [
      "Google Workspace",
      "Mind Maps",
      "UX Design",
      "Accessibility",
    ],
    color: "#f87171",
    iconDescription:
      "Simplified compass or navigation icon with radiating waves, representing spatial awareness and guidance",
    liveUrl: null,
    sourceUrl: null,
    slidesUrl:
      "https://docs.google.com/presentation/d/1_LtnJbvFi7YNItDpYPvUZvkwUi15jeFHNBYP9KKGZSw/edit?usp=sharing",
  },
];

// ── Certificates (in progress) ─────────────────────────────

export const certificates = [
  {
    name: "Google UX Design",
    provider: "Google",
    status: "In progress",
  },
  {
    name: "Meta Front-End Development",
    provider: "Meta",
    status: "In progress",
  },
  {
    name: "IBM Mobile App Development",
    provider: "IBM",
    status: "In progress",
  },
];
