// OpenGraphGenApp.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  Download,
  ChevronDown,
  CloudUpload,
  RefreshCcw,
  Github,
} from 'lucide-react';

import Sidebar from './Sidebar';
import PreviewCanvas from './PreviewCanvas';
import { DEFAULT_CONFIG } from './constants';

export default function OpenGraphGenApp() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [isExporting, setIsExporting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [exportFormat, setExportFormat] = useState('png');
  const [hostedUrl, setHostedUrl] = useState(null);
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const [activeTab, setActiveTab] = useState('content'); // content, design, templates, seo

  const exportRef = useRef(null);

  // Load html-to-image script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.js';
    script.async = true;
    document.body.appendChild(script);

    const style = document.createElement('style');
    style.innerHTML = `
      .custom-scrollbar::-webkit-scrollbar { display: none; }
      .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setConfig((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const fetchMetadata = async () => {
    if (!config.url) return;
    setIsLoadingUrl(true);
    try {
      const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(config.url)}`);
      const data = await response.json();

      if (data.status === 'success') {
        const { title, description, image, publisher } = data.data;
        setConfig((prev) => ({
          ...prev,
          title: title || prev.title,
          description: description || prev.description,
          siteName: publisher || prev.siteName,
          image: image?.url || prev.image,
        }));
      }
    } catch (error) {
      console.error('Failed to fetch metadata', error);
      alert('Could not fetch metadata. Please try entering details manually.');
    }
    setIsLoadingUrl(false);
  };

  const uploadToCloud = async () => {
    if (!window.htmlToImage || !exportRef.current) {
      alert('Engine not ready.');
      return;
    }

    setIsUploading(true);
    try {
      const blob = await window.htmlToImage.toBlob(exportRef.current, {
        width: 1200,
        height: 630,
        pixelRatio: 1,
        style: { transform: 'scale(1)', transformOrigin: 'top left' },
      });

      const formData = new FormData();
      formData.append('image', blob);

      const response = await fetch(
        'https://api.imgbb.com/1/upload?key=78f181e26e4703d05102e47f09b8ad9a',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setHostedUrl(data.data.url);
        setActiveTab('seo');
        alert('Image hosted successfully! SEO tags updated.');
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const downloadImage = async () => {
    if (!window.htmlToImage || !exportRef.current) {
      alert('Generation engine not loaded yet. Please wait a moment.');
      return;
    }
    setIsExporting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const method =
        exportFormat === 'jpeg'
          ? window.htmlToImage.toJpeg
          : exportFormat === 'webp'
          ? window.htmlToImage.toBlob // you'd normally use a webp-specific lib; keeping png/jpeg main
          : window.htmlToImage.toPng;

      const dataUrl =
        exportFormat === 'webp'
          ? await window.htmlToImage.toPng(exportRef.current, {
              quality: 1,
              width: 1200,
              height: 630,
              pixelRatio: 1,
              style: { transform: 'scale(1)', transformOrigin: 'top left' },
            })
          : await method(exportRef.current, {
              quality: 1,
              width: 1200,
              height: 630,
              pixelRatio: 1,
              style: { transform: 'scale(1)', transformOrigin: 'top left' },
            });

      const link = document.createElement('a');
      link.download = `og-image-${Date.now()}.${exportFormat === 'webp' ? 'png' : exportFormat}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert('Export failed. If using external images, ensure they allow CORS.');
    }
    setIsExporting(false);
  };

  return (
    <div className="h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blue-500 selection:text-white overflow-hidden flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-[#0f172a]/95 backdrop-blur flex items-center justify-between px-4 lg:px-6 z-50 shrink-0 gap-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
            OG
          </div>
          <span className="font-bold text-lg tracking-tight text-white hidden sm:block truncate">
            OpenGraph<span className="text-blue-400">.gen</span>
          </span>

          <a
            href="https://github.com/ranjan-builds"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 hover:bg-slate-800 transition-colors text-[10px] text-slate-400 hover:text-white ml-2 whitespace-nowrap"
          >
            <Github size={12} />
            <span>@ranjan-builds</span>
          </a>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <button
            onClick={uploadToCloud}
            disabled={isUploading}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all flex items-center gap-2"
            title="Host Image on ImgBB"
          >
            {isUploading ? <RefreshCcw className="animate-spin" size={20} /> : <CloudUpload size={20} />}
            <span className="hidden lg:inline text-xs font-medium">Host</span>
          </button>

          <div className="flex items-center bg-blue-600 rounded-lg shadow-lg shadow-blue-900/20 overflow-hidden shrink-0">
            <div className="relative border-r border-blue-500 hidden sm:block">
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="appearance-none bg-blue-600 text-white text-xs font-medium px-2 py-2 pr-6 outline-none cursor-pointer hover:bg-blue-500 transition-colors"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPG</option>
                <option value="webp">WebP</option>
              </select>
              <ChevronDown
                size={12}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-blue-200 pointer-events-none"
              />
            </div>
            <button
              onClick={downloadImage}
              disabled={isExporting}
              className="flex items-center gap-2 px-3 py-2 hover:bg-blue-500 text-white font-medium transition-colors active:bg-blue-700 disabled:opacity-50 disabled:cursor-wait"
            >
              {isExporting ? <RefreshCcw className="animate-spin" size={16} /> : <Download size={16} />}
              <span className="text-sm hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <Sidebar
          config={config}
          setConfig={setConfig}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isLoadingUrl={isLoadingUrl}
          fetchMetadata={fetchMetadata}
          handleImageUpload={handleImageUpload}
          hostedUrl={hostedUrl}
        />
        <PreviewCanvas config={config} exportRef={exportRef} />
      </main>
    </div>
  );
}
