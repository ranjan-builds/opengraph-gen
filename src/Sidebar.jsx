// Sidebar.jsx
import React from 'react';
import {
  Type,
  Image as ImageIcon,
  Layout,
  Palette,
  Upload,
  Link as LinkIcon,
  ChevronDown,
  CloudUpload,
  ExternalLink,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Code,
  RefreshCcw,
} from 'lucide-react';

import { FONTS, GRADIENT_PRESETS, PATTERNS, TEMPLATES } from './constants';
import { ColorPicker, Toggle, RangeControl, CodeBlock } from './ui';

export default function Sidebar({
  config,
  setConfig,
  activeTab,
  setActiveTab,
  isLoadingUrl,
  fetchMetadata,
  handleImageUpload,
  hostedUrl,
}) {
  return (
    <aside className="w-full lg:w-80 h-1/2 lg:h-full bg-[#1e293b] border-t lg:border-t-0 lg:border-r border-slate-800 flex flex-col z-20 order-2 lg:order-1 shrink-0">
      {/* Tabs */}
      <div className="flex p-2 gap-1 border-b border-slate-800 sticky top-0 bg-[#1e293b] z-10 shrink-0">
        {[
          { id: 'content', label: 'Content', icon: Type },
          { id: 'design', label: 'Design', icon: Palette },
          { id: 'templates', label: 'Layouts', icon: Layout },
          { id: 'seo', label: 'SEO', icon: Code },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-md text-xs font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-slate-800 text-blue-400 shadow-sm'
                : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-5 space-y-8 pb-20 overflow-y-auto custom-scrollbar flex-1">
        {/* Layouts */}
        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 gap-3">
            {TEMPLATES.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setConfig({ ...config, template: t.id })}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left group ${
                    config.template === t.id
                      ? 'bg-blue-500/10 border-blue-500/50 text-white'
                      : 'bg-slate-800/50 border-transparent hover:border-slate-600 text-slate-400'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      config.template === t.id ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm group-hover:text-white transition-colors">{t.name}</div>
                    <div className="text-[10px] opacity-60">
                      {t.id === 'split' ? 'Horizontal' : t.id === 'vertical' ? 'Vertical' : 'Standard'}
                    </div>
                  </div>
                  {config.template === t.id && <Check size={16} className="text-blue-500" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Content */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* URL Fetcher */}
            <div className="space-y-2 bg-slate-900/50 p-3 rounded-xl border border-slate-800">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <LinkIcon size={12} /> Import from URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={config.url}
                  onChange={(e) => setConfig({ ...config, url: e.target.value })}
                  placeholder="https://..."
                  className="flex-1 bg-slate-800 border-0 rounded text-xs px-2 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={fetchMetadata}
                  disabled={isLoadingUrl}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-500 disabled:opacity-50"
                >
                  {isLoadingUrl ? '...' : 'Fetch'}
                </button>
              </div>
            </div>

            {/* Title / Description */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Main Text</label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-600"
                placeholder="Enter title..."
              />
              <textarea
                rows={3}
                value={config.description}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-slate-600 resize-none"
                placeholder="Enter description..."
              />
            </div>

            {/* Meta */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Metadata</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={config.siteName}
                  onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Site Name"
                />
                <input
                  type="text"
                  value={config.author}
                  onChange={(e) => setConfig({ ...config, author: e.target.value })}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="@author"
                />
              </div>
            </div>

            {/* Assets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Assets</label>
              <label className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-700 rounded-lg cursor-pointer hover:border-slate-500 transition-colors group">
                <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 overflow-hidden relative">
                  {config.image ? (
                    <img src={config.image} className="w-full h-full object-cover" />
                  ) : (
                    <Upload size={18} className="text-slate-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-300 group-hover:text-white">Upload Image</div>
                  <div className="text-[10px] text-slate-500">Max 2MB (PNG, JPG)</div>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
              {config.image && (
                <button
                  onClick={() => setConfig({ ...config, image: null })}
                  className="text-xs text-red-400 hover:text-red-300 w-full text-right"
                >
                  Remove image
                </button>
              )}
            </div>
          </div>
        )}

        {/* Design */}
        {activeTab === 'design' && (
          <div className="space-y-6">
            {/* Background type */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Background</label>
              <div className="flex rounded-lg bg-slate-900 p-1 border border-slate-800">
                <button
                  onClick={() => setConfig({ ...config, bgType: 'gradient' })}
                  className={`flex-1 py-1.5 text-xs font-medium rounded transition-all ${
                    config.bgType === 'gradient'
                      ? 'bg-slate-700 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Gradient
                </button>
                <button
                  onClick={() => setConfig({ ...config, bgType: 'solid' })}
                  className={`flex-1 py-1.5 text-xs font-medium rounded transition-all ${
                    config.bgType === 'solid' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Solid
                </button>
              </div>

              {config.bgType === 'gradient' ? (
                <div className="space-y-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                  {/* Presets */}
                  <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto custom-scrollbar p-1">
                    {GRADIENT_PRESETS.map((g, i) => (
                      <button
                        key={i}
                        onClick={() =>
                          setConfig({
                            ...config,
                            gradientStart: g.start,
                            gradientEnd: g.end,
                            gradientDir: g.dir,
                            textColor: g.textColor || '#ffffff',
                          })
                        }
                        className="w-full aspect-square rounded-full ring-2 ring-transparent hover:ring-white/40 transition-all shadow-sm relative group"
                        style={{ background: `linear-gradient(${g.dir}, ${g.start}, ${g.end})` }}
                        title={g.name}
                      >
                        <span className="sr-only">{g.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <ColorPicker
                      label="Start"
                      value={config.gradientStart}
                      onChange={(v) => setConfig({ ...config, gradientStart: v })}
                    />
                    <ColorPicker
                      label="End"
                      value={config.gradientEnd}
                      onChange={(v) => setConfig({ ...config, gradientEnd: v })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-bold uppercase">Direction</label>
                    <select
                      value={config.gradientDir}
                      onChange={(e) => setConfig({ ...config, gradientDir: e.target.value })}
                      className="w-full bg-slate-800 text-xs text-white p-2 rounded border border-slate-700 outline-none"
                    >
                      <option value="to right">Left to Right</option>
                      <option value="to bottom">Top to Bottom</option>
                      <option value="45deg">Diagonal (45°)</option>
                      <option value="135deg">Diagonal (135°)</option>
                    </select>
                  </div>
                </div>
              ) : (
                <ColorPicker
                  label="Background Color"
                  value={config.solidColor}
                  onChange={(c) => setConfig({ ...config, solidColor: c })}
                />
              )}
            </div>

            {/* Pattern */}
            <div className="space-y-3 border-t border-slate-800 pt-6">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pattern & Texture</label>
              <div className="flex gap-2">
                {PATTERNS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setConfig({ ...config, pattern: p.value })}
                    className={`flex-1 py-2 text-xs border rounded-lg transition-all ${
                      config.pattern === p.value
                        ? 'bg-blue-500/10 border-blue-500 text-blue-400'
                        : 'border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              {config.pattern !== 'none' && (
                <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 space-y-3">
                  <ColorPicker
                    label="Grid Color"
                    value={config.gridColor}
                    onChange={(v) => setConfig({ ...config, gridColor: v })}
                  />
                  <RangeControl
                    label="Size"
                    value={config.gridSize}
                    min={10}
                    max={100}
                    unit="px"
                    onChange={(v) => setConfig({ ...config, gridSize: v })}
                  />
                  <RangeControl
                    label="Opacity"
                    value={config.gridOpacity}
                    min={0.1}
                    max={1}
                    step={0.1}
                    onChange={(v) => setConfig({ ...config, gridOpacity: v })}
                  />
                </div>
              )}
            </div>

            {/* Palette */}
            <div className="space-y-3 border-t border-slate-800 pt-6">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Palette</label>
              <div className="grid grid-cols-2 gap-4">
                <ColorPicker
                  label="Text Color"
                  value={config.textColor}
                  onChange={(c) => setConfig({ ...config, textColor: c })}
                />
                <ColorPicker
                  label="Accent Color"
                  value={config.accentColor}
                  onChange={(c) => setConfig({ ...config, accentColor: c })}
                />
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-3 border-t border-slate-800 pt-6">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Typography</label>
              <div className="relative">
                <select
                  value={config.font}
                  onChange={(e) => setConfig({ ...config, font: e.target.value })}
                  className="w-full appearance-none bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {FONTS.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3 text-slate-500 pointer-events-none" />
              </div>
            </div>

            {/* Toggles */}
            <div className="border-t border-slate-800 pt-4">
              <Toggle
                label="Show Logo"
                checked={config.showLogo}
                onChange={(v) => setConfig({ ...config, showLogo: v })}
              />
            </div>
          </div>
        )}

        {/* SEO / Meta tab */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            {/* Hosted Image Info */}
            {hostedUrl ? (
              <div className="bg-emerald-900/20 border border-emerald-500/20 p-4 rounded-xl flex items-start gap-3">
                <div className="bg-emerald-500/20 p-2 rounded-full text-emerald-400">
                  <Check size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-emerald-400 font-medium text-sm mb-1">Image Hosted Successfully</h3>
                  <p className="text-emerald-500/60 text-xs mb-3">Your image is live and ready for SEO tags.</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={hostedUrl}
                      readOnly
                      className="bg-black/20 border border-emerald-500/20 rounded text-xs px-2 py-1 text-emerald-100 flex-1 min-w-0"
                    />
                    <a
                      href={hostedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded hover:bg-emerald-500/30"
                      title="Open in new tab"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-blue-900/10 border border-blue-500/10 p-4 rounded-xl flex items-center gap-3">
                <div className="bg-blue-500/10 p-2 rounded-full text-blue-400">
                  <CloudUpload size={16} />
                </div>
                <div>
                  <h3 className="text-blue-400 font-medium text-sm">Host Image for URL</h3>
                  <p className="text-slate-500 text-xs">Click the cloud icon in the header to generate a public link.</p>
                </div>
              </div>
            )}

            {/* HTML Meta */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-slate-300">
                <Code size={16} />
                <h3 className="font-semibold text-sm">HTML Meta Tags</h3>
              </div>
              <CodeBlock
                label="Basic"
                code={`<title>${config.title}</title>\n<meta name="description" content="${config.description}">`}
              />
            </div>

            {/* Open Graph */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-blue-400">
                <Facebook size={16} />
                <h3 className="font-semibold text-sm">Facebook / Open Graph</h3>
              </div>
              <CodeBlock
                label="OG Protocol"
                code={`<meta property="og:url" content="${config.url}">\n<meta property="og:type" content="website">\n<meta property="og:title" content="${config.title}">\n<meta property="og:description" content="${config.description}">\n<meta property="og:image" content="${
                  hostedUrl || 'https://yourwebsite.com/og-image.png'
                }">`}
              />
            </div>

            {/* Twitter */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sky-400">
                <Twitter size={16} />
                <h3 className="font-semibold text-sm">Twitter Card</h3>
              </div>
              <CodeBlock
                label="Summary Large Image"
                code={`<meta name="twitter:card" content="summary_large_image">\n<meta property="twitter:domain" content="${config.url
                  .replace(/^https?:\/\//, '')
                  .split('/')[0]}">\n<meta property="twitter:url" content="${config.url}">\n<meta name="twitter:title" content="${config.title}">\n<meta name="twitter:description" content="${
                  config.description
                }">\n<meta name="twitter:image" content="${hostedUrl || 'https://yourwebsite.com/og-image.png'}">`}
              />
            </div>

            {/* LinkedIn info */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-blue-600">
                <Linkedin size={16} />
                <h3 className="font-semibold text-sm">LinkedIn</h3>
              </div>
              <div className="p-3 bg-slate-900/50 rounded-lg text-xs text-slate-400 border border-slate-800">
                LinkedIn uses the same Open Graph (<code>og:*</code>) tags as Facebook. Use a 1200x630 / 1200x627 image
                for best results.
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
