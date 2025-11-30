// config.js
import {
  Layout,
  Type,
  Image as ImageIcon,
  Maximize,
  BarChart,
  Quote as QuoteIcon,
  Globe,
  Monitor,
} from "lucide-react";

export const FONTS = [
  { name: "Inter", value: "font-sans" },
  { name: "Serif", value: "font-serif" },
  { name: "Mono", value: "font-mono" },
  { name: "System", value: "font-system" },
];

// SVG Noise Filter Data URI
export const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export const GRADIENT_PRESETS = [
  // --- TIER 1: THE DARKEST (Blacks, Deep Navys) ---
  {
    name: "Obsidian",
    start: "#0f172a",
    end: "#020617",
    dir: "to bottom",
    textColor: "#f8fafc",
  },
  {
    name: "Void",
    start: "#18181b",
    end: "#09090b",
    dir: "to bottom",
    textColor: "#f8fafc",
  }, // NEW: Pitch Black
  {
    name: "Midnight",
    start: "#0f172a",
    end: "#581c87",
    dir: "135deg",
    textColor: "#f8fafc",
  },
  {
    name: "Deep Sea",
    start: "#1e3a8a",
    end: "#172554",
    dir: "to bottom",
    textColor: "#f8fafc",
  },
  {
    name: "Charcoal",
    start: "#334155",
    end: "#0f172a",
    dir: "135deg",
    textColor: "#f8fafc",
  },

  // --- TIER 2: DEEP COLORS (Rich Greens, Purples, Crimsons) ---
  {
    name: "Forest",
    start: "#14532d",
    end: "#052e16",
    dir: "to bottom",
    textColor: "#f0fdf4",
  }, // NEW: Deep Green
  {
    name: "Plum",
    start: "#4c1d95",
    end: "#be185d",
    dir: "135deg",
    textColor: "#fdf4ff",
  },
  {
    name: "Crimson",
    start: "#991b1b",
    end: "#450a0a",
    dir: "to right",
    textColor: "#fef2f2",
  }, // NEW: Deep Red
  {
    name: "Emerald",
    start: "#10b981",
    end: "#064e3b",
    dir: "135deg",
    textColor: "#ecfdf5",
  },
  {
    name: "Corporate",
    start: "#2563eb",
    end: "#4338ca",
    dir: "135deg",
    textColor: "#eff6ff",
  },

  // --- TIER 3: VIBRANT & SATURATED (Mids) ---
  {
    name: "Azure",
    start: "#0ea5e9",
    end: "#2563eb",
    dir: "135deg",
    textColor: "#ffffff",
  },
  {
    name: "Dusk",
    start: "#6366f1",
    end: "#a855f7",
    dir: "to right",
    textColor: "#ffffff",
  },
  {
    name: "Ocean",
    start: "#60a5fa",
    end: "#34d399",
    dir: "135deg",
    textColor: "#ffffff",
  },
  {
    name: "Teal",
    start: "#2dd4bf",
    end: "#0f766e",
    dir: "135deg",
    textColor: "#ffffff",
  },
  {
    name: "Berry",
    start: "#a855f7",
    end: "#ec4899",
    dir: "135deg",
    textColor: "#ffffff",
  },
  {
    name: "Aurora",
    start: "#4ade80",
    end: "#3b82f6",
    dir: "135deg",
    textColor: "#ffffff",
  },
  {
    name: "Cyber",
    start: "#f0abfc",
    end: "#8b5cf6",
    dir: "to right",
    textColor: "#ffffff",
  }, // NEW: Cyberpunk Purple

  // --- TIER 4: WARM & ENERGETIC ---
  {
    name: "Smoke",
    start: "#94a3b8",
    end: "#475569",
    dir: "135deg",
    textColor: "#f8fafc",
  },
  {
    name: "Flare",
    start: "#f97316",
    end: "#dc2626",
    dir: "135deg",
    textColor: "#fff7ed",
  },
  {
    name: "Sunset",
    start: "#fb923c",
    end: "#f43f5e",
    dir: "135deg",
    textColor: "#fff7ed",
  },
  {
    name: "Gold",
    start: "#fbbf24",
    end: "#b45309",
    dir: "135deg",
    textColor: "#ffffff",
  },
  {
    name: "Neon",
    start: "#f472b6",
    end: "#db2777",
    dir: "to bottom",
    textColor: "#ffffff",
  },
  {
    name: "Candy",
    start: "#f9a8d4",
    end: "#f43f5e",
    dir: "to bottom",
    textColor: "#ffffff",
  },

  // --- TIER 5: PASTELS & LIGHTS ---
  {
    name: "Sky",
    start: "#bae6fd",
    end: "#38bdf8",
    dir: "to bottom",
    textColor: "#0c4a6e",
  },
  {
    name: "Mint",
    start: "#d1fae5",
    end: "#6ee7b7",
    dir: "to right",
    textColor: "#064e3b",
  },
  {
    name: "Rose",
    start: "#ffe4e6",
    end: "#fda4af",
    dir: "135deg",
    textColor: "#881337",
  }, // NEW: Soft Pink
  {
    name: "Lavender",
    start: "#e9d5ff",
    end: "#c084fc",
    dir: "to right",
    textColor: "#581c87",
  },
  {
    name: "Peach",
    start: "#ffedd5",
    end: "#fdba74",
    dir: "to right",
    textColor: "#7c2d12",
  },
  {
    name: "Solar",
    start: "#fde047",
    end: "#eab308",
    dir: "135deg",
    textColor: "#422006",
  },

  // --- TIER 6: THE LIGHTEST (Whites, Off-Whites, Silvers) ---
  {
    name: "Steel",
    start: "#e2e8f0",
    end: "#94a3b8",
    dir: "to top",
    textColor: "#0f172a",
  }, // NEW: Metallic
  {
    name: "Slate",
    start: "#f1f5f9",
    end: "#cbd5e1",
    dir: "135deg",
    textColor: "#0f172a",
  },
  {
    name: "Clean",
    start: "#f3f4f6",
    end: "#e5e7eb",
    dir: "135deg",
    textColor: "#1f2937",
  },
  {
    name: "Glacier",
    start: "#e0f2fe",
    end: "#f0f9ff",
    dir: "to bottom",
    textColor: "#0c4a6e",
  }, // NEW: Icy White
  {
    name: "Polar",
    start: "#f8fafc",
    end: "#e2e8f0",
    dir: "to bottom",
    textColor: "#0f172a",
  },
];

export const PATTERNS = [
  { name: "None", value: "none" },
  {
    name: "Dots",
    value: "radial-gradient(circle, var(--grid-color) 1px, transparent 1px)",
  },
  {
    name: "Grid",
    value:
      "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
  },
];

export const FADE_OPTIONS = [
  { id: "none", label: "None" },
  { id: "left", label: "Fade Left" },
  { id: "right", label: "Fade Right" },
  { id: "edges", label: "Fade Edges" },
  { id: "center", label: "Fade Center" },
  { id: "top", label: "Fade Top" },
];

export const TEMPLATES = [
  { id: "minimal", name: "Minimalist", icon: Layout },
  { id: "hero", name: "Big Hero", icon: Type },
  { id: "magazine", name: "Magazine", icon: Layout },
  { id: "split", name: "Split Side", icon: ImageIcon },
  { id: "vertical", name: "Split Vertical", icon: Maximize },
  { id: "graph", name: "Chart Data", icon: BarChart },
  { id: "quote", name: "Quote", icon: QuoteIcon },
  { id: "card", name: "Glass Card", icon: Layout },
  { id: "browser", name: "Browser Frame", icon: Globe },
  { id: "code", name: "Developer", icon: Monitor },
];

export const DEFAULT_CONFIG = {
  template: "minimal",
  title: "Build Faster with AI",
  description:
    "Learn how to leverage generative models to speed up your development workflow by 10x.",
  siteName: "github.io",
  author: "@ranjan-builds",
  font: "font-sans",
  fontSize: 1, // Multiplier

  // Background
  bgType: "gradient", // gradient, solid
  solidColor: "#1e293b",
  gradientStart: "#0f172a",
  gradientEnd: "#334155",
  gradientDir: "135deg",
  noise: 0.05,

  // Grid/Pattern - default to grid
  pattern:
    "linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)",
  gridColor: "rgba(255,255,255,0.1)",
  gridSize: 40,
  gridOpacity: 0.8,
  gridFade: "edges",
  gridFadeOffset: 60,

  // Colors
  textColor: "#ffffff",
  accentColor: "#ffffff",

  // Toggles & Assets
  showLogo: true,
  image: null,
  zoom: 100,

  // Meta
  url: "https://example.com",
};
