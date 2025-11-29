// constants.js

import { Layout, Image as ImageIcon, Type, Maximize, Palette, Globe, Monitor } from 'lucide-react';

export const FONTS = [
  { name: 'Inter', value: 'font-sans' },
  { name: 'Serif', value: 'font-serif' },
  { name: 'Mono', value: 'font-mono' },
  { name: 'System', value: 'font-system' },
];

export const GRADIENT_PRESETS = [
  // Mono / Base
  { name: 'Polar', start: '#f8fafc', end: '#e2e8f0', dir: 'to bottom', textColor: '#0f172a' },
  { name: 'Slate', start: '#f1f5f9', end: '#cbd5e1', dir: '135deg', textColor: '#0f172a' },
  { name: 'Obsidian', start: '#0f172a', end: '#020617', dir: 'to bottom', textColor: '#f8fafc' },
  { name: 'Charcoal', start: '#334155', end: '#0f172a', dir: '135deg', textColor: '#f8fafc' },

  // Warm
  { name: 'Sunset', start: '#fb923c', end: '#f43f5e', dir: '135deg' },
  { name: 'Peach', start: '#ffedd5', end: '#fdba74', dir: 'to right', textColor: '#7c2d12' },
  { name: 'Dawn', start: '#fca5a5', end: '#fecaca', dir: 'to top', textColor: '#7f1d1d' },
  { name: 'Solar', start: '#fde047', end: '#eab308', dir: '135deg', textColor: '#422006' },
  { name: 'Flare', start: '#f97316', end: '#dc2626', dir: '135deg' },

  // Cool
  { name: 'Ocean', start: '#60a5fa', end: '#34d399', dir: '135deg' },
  { name: 'Sky', start: '#bae6fd', end: '#38bdf8', dir: 'to bottom', textColor: '#0c4a6e' },
  { name: 'Azure', start: '#0ea5e9', end: '#2563eb', dir: '135deg' },
  { name: 'Deep Sea', start: '#1e3a8a', end: '#172554', dir: 'to bottom' },
  { name: 'Teal', start: '#2dd4bf', end: '#0f766e', dir: '135deg' },

  // Violet / Pink
  { name: 'Berry', start: '#a855f7', end: '#ec4899', dir: '135deg' },
  { name: 'Lavender', start: '#e9d5ff', end: '#c084fc', dir: 'to right', textColor: '#581c87' },
  { name: 'Midnight', start: '#0f172a', end: '#581c87', dir: '135deg' },
  { name: 'Neon', start: '#f472b6', end: '#db2777', dir: 'to bottom' },
  { name: 'Plum', start: '#4c1d95', end: '#be185d', dir: '135deg' },

  // Corporate / Clean
  { name: 'Clean', start: '#f3f4f6', end: '#e5e7eb', dir: '135deg', textColor: '#1f2937' },
  { name: 'Corporate', start: '#2563eb', end: '#4338ca', dir: '135deg' },
  { name: 'Emerald', start: '#10b981', end: '#064e3b', dir: '135deg' },
  { name: 'Mint', start: '#d1fae5', end: '#6ee7b7', dir: 'to right', textColor: '#064e3b' },

  // Special
  { name: 'Dusk', start: '#6366f1', end: '#a855f7', dir: 'to right' },
  { name: 'Aurora', start: '#4ade80', end: '#3b82f6', dir: '135deg' },
  { name: 'Candy', start: '#f9a8d4', end: '#f43f5e', dir: 'to bottom' },
  { name: 'Smoke', start: '#94a3b8', end: '#475569', dir: '135deg' },
  { name: 'Gold', start: '#fbbf24', end: '#b45309', dir: '135deg' },
];

export const PATTERNS = [
  { name: 'None', value: 'none' },
  { name: 'Dots', value: 'radial-gradient(circle, var(--grid-color) 1px, transparent 1px)' },
  { name: 'Grid', value: 'linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)' },
];

export const TEMPLATES = [
  { id: 'minimal', name: 'Minimalist', icon: Layout },
  { id: 'hero', name: 'Big Hero', icon: Type },
  { id: 'split', name: 'Split Side', icon: ImageIcon },
  { id: 'vertical', name: 'Split Vertical', icon: Maximize },
  { id: 'card', name: 'Glass Card', icon: Palette },
  { id: 'browser', name: 'Browser Frame', icon: Globe },
  { id: 'code', name: 'Developer', icon: Monitor },
];

export const DEFAULT_CONFIG = {
  template: 'minimal',
  title: 'Build Faster with AI',
  description: 'Learn how to leverage generative models to speed up your development workflow by 10x.',
  siteName: 'www.example.com',
  author: 'Ranjan Kashyap',
  font: 'font-sans',

  // Background
  bgType: 'gradient',
  solidColor: '#1e293b',
  gradientStart: '#0f172a',
  gradientEnd: '#334155',
  gradientDir: '135deg',

  // Pattern
  pattern: 'none',
  gridColor: 'rgba(255,255,255,0.1)',
  gridSize: 40,
  gridOpacity: 0.8,

  // Colors
  textColor: '#ffffff',
  accentColor: '#3b82f6',

  // Toggles & Assets
  showLogo: false,
  image: null,
  zoom: 100,

  // Meta
  url: 'https://example.com',
};
