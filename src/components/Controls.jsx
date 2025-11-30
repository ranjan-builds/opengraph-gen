// components/Controls.jsx
import React from 'react';
import { Copy } from 'lucide-react';

export const ColorPicker = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}</label>
    <div className="flex items-center gap-2 bg-[#0A0A0A] border border-[#333] rounded p-1">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-6 w-6 rounded cursor-pointer bg-transparent border-0 p-0"
      />
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent text-xs text-slate-300 font-mono focus:outline-none uppercase"
      />
    </div>
  </div>
);

export const Toggle = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between py-2">
    <label className="text-sm text-slate-300">{label}</label>
    <button
      onClick={() => onChange(!checked)}
      className={`w-10 h-5 rounded-full relative transition-colors ${checked ? 'bg-blue-500' : 'bg-[#333]'}`}
    >
      <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform duration-200 ${checked ? 'left-6' : 'left-1'}`} />
    </button>
  </div>
);

export const Range = ({ label, value, min, max, step = 1, onChange, unit = '' }) => (
  <div className="flex flex-col gap-2 py-2">
    <div className="flex justify-between text-xs text-slate-400">
      <span>{label}</span>
      <span>
        {typeof value === 'number' && !Number.isInteger(value) ? value.toFixed(1) : value}
        {unit}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1 bg-[#333] rounded-lg appearance-none cursor-pointer accent-blue-500"
    />
  </div>
);

export const CodeBlock = ({ label, code }) => (
  <div className="bg-[#0A0A0A] rounded-xl border border-[#333] text-sm overflow-hidden mb-4">
    <div className="flex items-center justify-between px-3 py-2 bg-[#1D1D1D] border-b border-[#333]">
      <h3 className="text-slate-300 font-medium text-xs uppercase tracking-wider">{label}</h3>
      <button 
        onClick={() => {
          navigator.clipboard.writeText(code);
          alert('Copied to clipboard!');
        }}
        className="text-slate-400 hover:text-white transition-colors"
        title="Copy"
      >
        <Copy size={14} />
      </button>
    </div>
    <div className="p-3 overflow-x-auto custom-scrollbar">
      <code className="font-mono text-xs text-blue-300 whitespace-pre">{code}</code>
    </div>
  </div>
);
