// PreviewCanvas.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Monitor, Share2, Globe } from 'lucide-react';
import { PATTERNS } from './constants';

export default function PreviewCanvas({ config, exportRef }) {
  const containerRef = useRef(null);
  const [previewScale, setPreviewScale] = useState(0.5);

  // Auto-scale to fit viewport
  useEffect(() => {
    const calculateScale = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const padding = window.innerWidth < 768 ? 32 : 80;
        const scaleX = (clientWidth - padding) / 1200;
        const scaleY = (clientHeight - padding) / 630;
        const scale = Math.min(scaleX, scaleY, 1);
        setPreviewScale(scale);
      }
    };

    calculateScale();
    const onResize = () => calculateScale();

    window.addEventListener('resize', onResize);
    setTimeout(calculateScale, 100);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const {
    template,
    title,
    description,
    siteName,
    author,
    font,
    bgType,
    solidColor,
    gradientStart,
    gradientEnd,
    gradientDir,
    textColor,
    accentColor,
    showLogo,
    image,
    pattern,
    gridColor,
    gridSize,
    gridOpacity,
  } = config;

  const bgStyle =
    bgType === 'gradient'
      ? { backgroundImage: `linear-gradient(${gradientDir}, ${gradientStart}, ${gradientEnd})` }
      : { backgroundColor: solidColor };

  const textStyle = { color: textColor };

  const activePattern = PATTERNS.find((p) => p.value === pattern) || PATTERNS[0];
  const patternStyle =
    pattern !== 'none'
      ? {
          backgroundImage: activePattern.value.replace(/var\(--grid-color\)/g, gridColor),
          backgroundSize: `${gridSize}px ${gridSize}px`,
          opacity: gridOpacity,
        }
      : {};

  const Wrapper = ({ children, className = '', contentClassName = 'flex flex-col' }) => (
    <div className={`w-[1200px] h-[630px] relative overflow-hidden flex ${font} ${className}`} style={bgStyle}>
      {pattern !== 'none' && <div className="absolute inset-0 pointer-events-none z-0" style={patternStyle} />}
      <div className={`relative z-10 w-full h-full ${contentClassName}`}>{children}</div>
    </div>
  );

  // === All layout variants (same as your switch) ===
  const renderTemplateContent = () => {
    switch (template) {
      case 'hero':
        return (
          <Wrapper contentClassName="flex flex-col items-center justify-center p-20 text-center">
            {showLogo && (
              <div className="mb-8 p-4 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20">
                {image ? (
                  <img src={image} alt="Logo" className="w-16 h-16 object-contain rounded-full" crossOrigin="anonymous" />
                ) : (
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Monitor className="w-8 h-8 opacity-80" style={{ color: textColor }} />
                  </div>
                )}
              </div>
            )}
            <h1 className="text-7xl font-extrabold leading-tight tracking-tight mb-6 drop-shadow-sm" style={textStyle}>
              {title}
            </h1>
            <p className="text-3xl opacity-90 font-light max-w-3xl leading-relaxed" style={textStyle}>
              {description}
            </p>
            <div className="absolute bottom-12 flex items-center gap-3 opacity-70" style={textStyle}>
              <span className="font-bold text-xl tracking-wide uppercase border-b-2 border-current pb-1">
                {siteName}
              </span>
            </div>
          </Wrapper>
        );

      case 'split':
        return (
          <Wrapper contentClassName="flex flex-row">
            <div className="w-1/2 p-16 flex flex-col justify-center relative z-10">
              <div className="flex items-center gap-3 mb-8">
                {showLogo &&
                  (image ? (
                    <img src={image} className="w-10 h-10 rounded-full object-cover" crossOrigin="anonymous" />
                  ) : (
                    <div className="w-10 h-10 bg-current rounded-full opacity-20" />
                  ))}
                <span className="text-xl font-bold uppercase tracking-wider opacity-60" style={textStyle}>
                  {siteName}
                </span>
              </div>
              <h1 className="text-6xl font-bold leading-tight mb-6" style={textStyle}>
                {title}
              </h1>
              <p className="text-2xl opacity-80 leading-relaxed" style={textStyle}>
                {description}
              </p>
              <div className="mt-auto pt-8 flex items-center gap-2 text-xl font-medium" style={{ color: accentColor }}>
                Read more →
              </div>
            </div>
            <div className="w-1/2 relative bg-black/10 overflow-hidden">
              {image ? (
                <img src={image} className="w-full h-full object-cover" crossOrigin="anonymous" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5 backdrop-blur-sm">
                  <Globe size={120} className="opacity-20" style={{ color: textColor }} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent mix-blend-multiply" />
            </div>
          </Wrapper>
        );

      case 'vertical':
        return (
          <Wrapper contentClassName="flex flex-col">
            <div className="h-1/2 p-12 flex flex-col justify-center text-center items-center relative z-10">
              <div className="flex items-center gap-2 mb-4 opacity-70" style={textStyle}>
                {showLogo && <div className="w-6 h-6 bg-current rounded-full opacity-50" />}
                <span className="text-lg font-bold tracking-widest uppercase">{siteName}</span>
              </div>
              <h1 className="text-6xl font-black leading-tight" style={textStyle}>
                {title}
              </h1>
            </div>
            <div className="h-1/2 relative bg-black/20 overflow-hidden mx-12 mb-12 rounded-t-3xl shadow-2xl border-t border-l border-r border-white/20">
              {image ? (
                <img src={image} className="w-full h-full object-cover" crossOrigin="anonymous" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/10">
                  <p className="text-2xl opacity-40 font-bold" style={textStyle}>
                    Image Preview
                  </p>
                </div>
              )}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <p className="text-white text-2xl font-medium text-center">{description}</p>
              </div>
            </div>
          </Wrapper>
        );

      case 'browser':
        return (
          <Wrapper contentClassName="flex flex-col p-12 items-center justify-center">
            <div className="w-full h-full bg-slate-900 rounded-xl shadow-2xl overflow-hidden flex flex-col border border-slate-700">
              <div className="h-12 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 bg-slate-900 h-8 rounded-md flex items-center px-4 text-slate-500 text-sm font-mono overflow-hidden">
                  {config.url || 'https://devblog.io/new-post'}
                </div>
              </div>
              <div className="flex-1 relative bg-white">
                {image ? (
                  <img src={image} className="w-full h-full object-cover" crossOrigin="anonymous" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-12 text-center">
                    <Globe size={64} className="mb-4 opacity-50" />
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">{title}</h2>
                    <p className="text-xl max-w-lg">{description}</p>
                  </div>
                )}
                <div className="absolute bottom-8 right-8 bg-black/80 text-white px-6 py-3 rounded-lg backdrop-blur shadow-lg">
                  <div className="flex items-center gap-3">
                    {showLogo && (
                      <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold">D</div>
                    )}
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-bold">Read on</div>
                      <div className="font-bold">{siteName}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Wrapper>
        );

      case 'card':
        return (
          <Wrapper contentClassName="flex items-center justify-center p-16">
            <div className="w-full h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-16 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

              <div className="flex justify-between items-start relative z-10">
                {showLogo && (
                  <div className="flex items-center gap-3">
                    {image ? (
                      <img src={image} className="w-12 h-12 rounded-lg shadow-sm" crossOrigin="anonymous" />
                    ) : (
                      <div className="w-12 h-12 bg-white/20 rounded-lg" />
                    )}
                    <span className="text-xl font-bold" style={textStyle}>
                      {siteName}
                    </span>
                  </div>
                )}
                <div
                  className="px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide bg-white/20 backdrop-blur-md"
                  style={textStyle}
                >
                  New Post
                </div>
              </div>

              <div className="relative z-10">
                <h1 className="text-6xl font-black mb-6 leading-tight" style={textStyle}>
                  {title}
                </h1>
                <p className="text-2xl opacity-80 leading-relaxed max-w-2xl" style={textStyle}>
                  {description}
                </p>
              </div>

              <div className="flex items-center gap-3 relative z-10 mt-8">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center font-bold text-lg"
                  style={textStyle}
                >
                  {author[0].toUpperCase()}
                </div>
                <span className="text-lg font-medium opacity-90" style={textStyle}>
                  {author}
                </span>
              </div>
            </div>
          </Wrapper>
        );

      case 'code':
        return (
          <Wrapper contentClassName="font-mono p-12 bg-slate-900 flex flex-col">
            <div className="w-full h-full bg-[#1e1e1e] rounded-xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden">
              <div className="h-10 bg-[#2d2d2d] border-b border-black flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="ml-auto text-xs text-gray-500 font-sans">bash — 80x24</div>
              </div>
              <div className="p-12 flex flex-col h-full text-gray-300">
                <div className="mb-8 opacity-50">
                  <span className="text-green-400">➜</span>{' '}
                  <span className="text-blue-400">~</span> project start{' '}
                  <span className="text-yellow-300">--verbose</span>
                </div>
                <h1 className="text-5xl font-bold text-white mb-6 leading-snug">
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-blue-400">Title</span> ={' '}
                  <span className="text-green-400">"{title}"</span>;
                </h1>
                <div className="pl-8 border-l-2 border-gray-700 mb-auto">
                  <p className="text-2xl text-gray-400 leading-relaxed font-light">// {description}</p>
                </div>
                <div className="flex justify-between items-end mt-8 border-t border-gray-800 pt-8">
                  <div className="flex items-center gap-3">
                    {image && <img src={image} className="w-8 h-8 rounded" crossOrigin="anonymous" />}
                    <span className="text-blue-400">@{siteName}</span>
                  </div>
                  <div className="text-gray-600 text-sm">git commit -m "init"</div>
                </div>
              </div>
            </div>
          </Wrapper>
        );

      case 'minimal':
      default:
        return (
          <Wrapper contentClassName="p-16 flex flex-col justify-between">
            {showLogo && (
              <div className="flex items-center gap-3">
                {image ? (
                  <img src={image} className="w-10 h-10 object-contain" crossOrigin="anonymous" />
                ) : (
                  <div className="w-10 h-10 bg-current rounded opacity-20" />
                )}
                <span className="text-2xl font-bold tracking-tight" style={textStyle}>
                  {siteName}
                </span>
              </div>
            )}

            <div className="my-auto">
              <h1 className="text-7xl font-bold leading-tighter tracking-tight mb-8" style={textStyle}>
                {title}
              </h1>
              <div className="w-24 h-2 mb-8" style={{ backgroundColor: textColor }} />
              <p className="text-3xl font-light opacity-80 leading-relaxed max-w-3xl" style={textStyle}>
                {description}
              </p>
            </div>

            <div className="flex justify-between items-center opacity-60">
              <span className="text-lg font-medium" style={textStyle}>
                {author}
              </span>
              <span className="text-lg" style={textStyle}>
                Read now
              </span>
            </div>
          </Wrapper>
        );
    }
  };

  return (
    <section
      className="w-full lg:flex-1 h-1/2 lg:h-full bg-[#0f172a] relative flex flex-col items-center justify-center p-4 lg:p-8 overflow-hidden order-1 lg:order-2"
      ref={containerRef}
    >
      <div
        className="relative shadow-2xl shadow-black/50 border border-slate-800 rounded-sm overflow-hidden transition-transform duration-300 ease-out"
        style={{
          width: '1200px',
          height: '630px',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${previewScale})`,
          transformOrigin: 'center center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div ref={exportRef} className="w-full h-full bg-white">
          {renderTemplateContent()}
        </div>
      </div>

      <div className="absolute bottom-6 right-6 bg-slate-800/80 backdrop-blur text-slate-400 text-xs px-3 py-1.5 rounded-full border border-slate-700 font-mono z-20">
        {Math.round(previewScale * 100)}% View
      </div>

      <div className="absolute bottom-6 left-6 hidden sm:flex gap-2 z-20">
        <div className="group relative">
          <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-full transition-colors border border-slate-700">
            <Monitor size={16} />
          </button>
          <span className="absolute bottom-full left-0 mb-2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Universal (1200x630)
          </span>
        </div>
        <div className="group relative">
          <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-full transition-colors border border-slate-700">
            <Share2 size={16} />
          </button>
          <span className="absolute bottom-full left-0 mb-2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Social Cards
          </span>
        </div>
      </div>
    </section>
  );
}
