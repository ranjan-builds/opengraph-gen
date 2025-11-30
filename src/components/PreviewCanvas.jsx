// components/PreviewCanvas.jsx
import React from "react";
import {
  Monitor,
  Share2,
  Image as ImageIcon,
  Layout,
  BarChart,
  Globe,
  Quote as QuoteIcon,
} from "lucide-react";
import { PATTERNS, NOISE_SVG } from "../config";

const PreviewCanvas = ({ config, previewScale, exportRef, containerRef }) => {
  const renderTemplateContent = () => {
    const {
      template,
      title,
      description,
      siteName,
      author,
      font,
      fontSize,
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
      gridFade,
      gridFadeOffset,
      noise,
    } = config;

    const bgStyle =
      bgType === "gradient"
        ? {
            backgroundImage: `linear-gradient(${gradientDir}, ${gradientStart}, ${gradientEnd})`,
          }
        : { backgroundColor: solidColor };

    const textStyle = { color: textColor };

    // Pattern logic
    const activePattern =
      PATTERNS.find((p) => p.value === pattern) || PATTERNS[0];

    // Fade mask for grid
    let mask = "none";
    const offset = gridFadeOffset;
    switch (gridFade) {
      case "left":
        mask = `linear-gradient(to right, transparent 0%, black ${offset}%)`;
        break;
      case "right":
        mask = `linear-gradient(to left, transparent 0%, black ${offset}%)`;
        break;
      case "top":
        mask = `linear-gradient(to bottom, transparent 0%, black ${offset}%)`;
        break;
      case "center":
        mask = `radial-gradient(circle at center, transparent 0%, black ${offset}%)`;
        break;
      case "edges":
        mask = `radial-gradient(circle at center, black ${
          100 - offset
        }%, transparent 100%)`;
        break;
      default:
        mask = "none";
    }

    const maskStyle =
      mask !== "none"
        ? {
            maskImage: mask,
            WebkitMaskImage: mask,
          }
        : {};

    const patternStyle =
      pattern !== "none"
        ? {
            backgroundImage: activePattern.value.replace(
              /var\(--grid-color\)/g,
              gridColor
            ),
            backgroundSize: `${gridSize}px ${gridSize}px`,
            opacity: gridOpacity,
            ...maskStyle,
          }
        : {};

    const Wrapper = ({
      children,
      className = "",
      contentClassName = "flex flex-col",
    }) => (
      <div
        className={`w-[1200px] h-[630px] relative overflow-hidden flex ${font} ${className}`}
        style={{ ...bgStyle }}
      >
        {/* Noise */}
        <div
          className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: NOISE_SVG, opacity: noise }}
        />

        {/* Pattern */}
        {pattern !== "none" && (
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={patternStyle}
          />
        )}

        <div className={`relative z-10 w-full h-full ${contentClassName}`}>
          {children}
        </div>
      </div>
    );

    const OutlineChip = ({ children, className = "" }) => (
      <span
        className={`border border-current rounded-full px-4 py-1.5 font-medium tracking-wide uppercase text-sm ${className}`}
        style={{ borderColor: `${textColor}60` }}
      >
        {children}
      </span>
    );

    const titleSize = `${4.5 * fontSize}rem`;
    const descSize = `${1.875 * fontSize}rem`;

    // TEMPLATES RENDERING (same visual logic you already wrote)
    switch (template) {
      case "hero":
        return (
          <Wrapper contentClassName="flex flex-col items-center justify-center p-20 text-center">
            {showLogo && (
              <div className="mb-8 p-4 rounded-full bg-white/10 backdrop-blur-md shadow-xl border border-white/20">
                {image ? (
                  <img
                    src={image}
                    alt="Logo"
                    className="w-16 h-16 object-contain rounded-full"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Layout
                      className="w-8 h-8 opacity-80"
                      style={{ color: textColor }}
                    />
                  </div>
                )}
              </div>
            )}
            <h1
              className="font-extrabold leading-tight tracking-tight mb-6 drop-shadow-sm"
              style={{ ...textStyle, fontSize: titleSize }}
            >
              {title}
            </h1>
            <p
              className="opacity-90 font-light max-w-3xl leading-relaxed"
              style={{ ...textStyle, fontSize: descSize }}
            >
              {description}
            </p>
            <div
              className="absolute bottom-12 flex items-center gap-3 opacity-70"
              style={textStyle}
            >
              <span className="font-bold text-xl tracking-wide uppercase border-b-2 border-current pb-1">
                {siteName}
              </span>
            </div>
          </Wrapper>
        );

      case "magazine":
        return (
          <Wrapper contentClassName="flex flex-col p-16 border-[20px]">
            <div
              className="flex justify-between items-start mb-8 border-b-2 pb-6"
              style={{ borderColor: `${textColor}30` }}
            >
              <div
                className="uppercase font-black tracking-tighter text-4xl"
                style={textStyle}
              >
                {siteName}
              </div>
              <div className="font-mono text-xl opacity-60" style={textStyle}>
                {new Date().toLocaleDateString()}
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <OutlineChip className="w-fit mb-6">Featured</OutlineChip>
              <h1
                className="font-black leading-[0.9] tracking-tighter mb-6 uppercase"
                style={{ ...textStyle, fontSize: `${6 * fontSize}rem` }}
              >
                {title}
              </h1>
              <p
                className="font-serif italic opacity-80 max-w-2xl border-l-4 pl-6"
                style={{
                  ...textStyle,
                  fontSize: descSize,
                  borderColor: accentColor,
                }}
              >
                {description}
              </p>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <div
                className="w-12 h-12 rounded-full bg-current overflow-hidden"
                style={{ color: textColor }}
              >
                {image && (
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                    alt=""
                  />
                )}
              </div>
              <div className="text-lg font-bold" style={textStyle}>
                {author}
              </div>
            </div>
          </Wrapper>
        );

      case "graph":
        return (
          <Wrapper contentClassName="flex p-16 items-center">
            <div className="w-1/2 pr-12 z-20">
              <div
                className="flex items-center gap-3 mb-6"
                style={{ color: accentColor }}
              >
                <BarChart size={32} />
                <span className="font-mono font-bold text-xl uppercase tracking-widest">
                  Analytics
                </span>
              </div>
              <h1
                className="font-bold leading-tight mb-6"
                style={{ ...textStyle, fontSize: `${4 * fontSize}rem` }}
              >
                {title}
              </h1>
              <p
                className="opacity-70 mb-8"
                style={{ ...textStyle, fontSize: descSize }}
              >
                {description}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-slate-500"
                    />
                  ))}
                </div>
                <span className="font-medium opacity-80" style={textStyle}>
                  +4k Readers
                </span>
              </div>
            </div>
            <div className="w-1/2 h-full relative">
              <div className="absolute inset-0 bg-white/5 rounded-2xl border border-white/10 p-8 flex items-end gap-4 shadow-2xl backdrop-blur-sm">
                {[40, 70, 50, 90, 60, 80].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-lg opacity-80"
                    style={{
                      height: `${h}%`,
                      backgroundColor: i % 2 === 0 ? accentColor : textColor,
                    }}
                  />
                ))}
                <div className="absolute top-8 left-8 right-8 bg-black/80 p-4 rounded-lg border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    {image && (
                      <img
                        src={image}
                        className="w-8 h-8 rounded"
                        crossOrigin="anonymous"
                        alt=""
                      />
                    )}
                    <div className="text-xs text-white font-mono">
                      {siteName}
                    </div>
                  </div>
                  <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-green-400" />
                  </div>
                </div>
              </div>
            </div>
          </Wrapper>
        );

      case "quote":
        return (
          <Wrapper contentClassName="flex flex-col items-center justify-center p-20 text-center relative">
            <QuoteIcon
              size={120}
              className="absolute top-16 left-16 opacity-10"
              style={{ color: textColor }}
            />
            <QuoteIcon
              size={120}
              className="absolute bottom-16 right-16 opacity-10 rotate-180"
              style={{ color: textColor }}
            />
            <div className="relative z-10 max-w-4xl">
              <h1
                className="font-serif italic leading-tight mb-8"
                style={{ ...textStyle, fontSize: `${5 * fontSize}rem` }}
              >
                "{title}"
              </h1>
              <div
                className="w-32 h-1 mx-auto mb-8"
                style={{ backgroundColor: accentColor }}
              />
              <p
                className="font-sans font-medium uppercase tracking-widest opacity-80"
                style={{ ...textStyle, fontSize: descSize }}
              >
                {description}
              </p>
            </div>
            <div className="absolute bottom-12 flex items-center gap-3">
              {image && (
                <img
                  src={image}
                  className="w-10 h-10 rounded-full border-2 border-white"
                  crossOrigin="anonymous"
                  alt=""
                />
              )}
              <span className="font-bold opacity-60" style={textStyle}>
                {author} • {siteName}
              </span>
            </div>
          </Wrapper>
        );

      case "split":
        return (
          <Wrapper contentClassName="flex flex-row">
            <div className="w-1/2 p-16 flex flex-col justify-center relative z-10">
              <div className="flex items-center gap-3 mb-8">
                {showLogo &&
                  (image ? (
                    <img
                      src={image}
                      className="w-10 h-10 rounded-full object-cover"
                      crossOrigin="anonymous"
                      alt=""
                    />
                  ) : (
                    <div className="w-10 h-10 bg-current rounded-full opacity-20" />
                  ))}
                <span
                  className="text-xl font-bold uppercase tracking-wider opacity-60"
                  style={textStyle}
                >
                  {siteName}
                </span>
              </div>
              <h1
                className="font-bold leading-tight mb-6"
                style={{ ...textStyle, fontSize: titleSize }}
              >
                {title}
              </h1>
              <p
                className="opacity-80 leading-relaxed"
                style={{ ...textStyle, fontSize: descSize }}
              >
                {description}
              </p>
              <div
                className="mt-auto pt-8 flex items-center gap-2 text-xl font-medium"
                style={{ color: accentColor }}
              >
                Read more →
              </div>
            </div>
            <div className="w-1/2 relative bg-black/10 overflow-hidden">
              {image ? (
                <img
                  src={image}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                  alt=""
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5 backdrop-blur-sm">
                  <ImageIcon
                    size={120}
                    className="opacity-20"
                    style={{ color: textColor }}
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent mix-blend-multiply" />
            </div>
          </Wrapper>
        );

      case "vertical":
        return (
          <Wrapper contentClassName="flex flex-col">
            <div className="h-1/2 p-12 flex flex-col justify-center text-center items-center relative z-10">
              <div
                className="flex items-center gap-2 mb-4 opacity-70"
                style={textStyle}
              >
                {showLogo && (
                  <div className="w-6 h-6 bg-current rounded-full opacity-50" />
                )}
                <span className="text-lg font-bold tracking-widest uppercase">
                  {siteName}
                </span>
              </div>
              <h1
                className="font-black leading-tight"
                style={{ ...textStyle, fontSize: titleSize }}
              >
                {title}
              </h1>
            </div>
            <div className="h-1/2 relative bg-black/20 overflow-hidden mx-12 mb-12 rounded-t-3xl shadow-2xl border-t border-l border-r border-white/20">
              {image ? (
                <img
                  src={image}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                  alt=""
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/10">
                  <p
                    className="text-2xl opacity-40 font-bold"
                    style={textStyle}
                  >
                    Image Preview
                  </p>
                </div>
              )}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <p className="text-white text-2xl font-medium text-center">
                  {description}
                </p>
              </div>
            </div>
          </Wrapper>
        );

      case "browser":
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
                  {config.url || "https://devblog.io/new-post"}
                </div>
              </div>
              <div className="flex-1 relative bg-white">
                {image ? (
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                    alt=""
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-12 text-center">
                    <Globe size={64} className="mb-4 opacity-50" />
                    <h2
                      className="font-bold text-slate-800 mb-2"
                      style={{ fontSize: `2.5rem` }}
                    >
                      {title}
                    </h2>
                    <p className="text-xl max-w-lg">{description}</p>
                  </div>
                )}
                <div className="absolute bottom-8 right-8 bg-black/80 text-white px-6 py-3 rounded-lg backdrop-blur shadow-lg">
                  <div className="flex items-center gap-3">
                    {showLogo && (
                      <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold">
                        D
                      </div>
                    )}
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-bold">
                        Read on
                      </div>
                      <div className="font-bold">{siteName}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Wrapper>
        );

      case "card":
        return (
          <Wrapper contentClassName="flex items-center justify-center p-16">
            <div className="w-full h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-16 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

              <div className="flex justify-between items-start relative z-10">
                {showLogo && (
                  <div className="flex items-center gap-3">
                    {image ? (
                      <img
                        src={image}
                        className="w-12 h-12 rounded-lg shadow-sm"
                        crossOrigin="anonymous"
                        alt=""
                      />
                    ) : (
                      <div className="w-12 h-12 bg-white/20 rounded-lg" />
                    )}
                    <span className="text-xl font-bold" style={textStyle}>
                      {siteName}
                    </span>
                  </div>
                )}
                <OutlineChip>New Post</OutlineChip>
              </div>

              <div className="relative z-10">
                <h1
                  className="font-black mb-6 leading-tight"
                  style={{ ...textStyle, fontSize: titleSize }}
                >
                  {title}
                </h1>
                <p
                  className="opacity-80 leading-relaxed max-w-2xl"
                  style={{ ...textStyle, fontSize: descSize }}
                >
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
                <span
                  className="text-lg font-medium opacity-90"
                  style={textStyle}
                >
                  {author}
                </span>
              </div>
            </div>
          </Wrapper>
        );

      case "code":
        return (
          <Wrapper contentClassName="font-mono p-12 bg-slate-900 flex flex-col">
            <div className="w-full h-full bg-[#1e1e1e] rounded-xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden">
              <div className="h-10 bg-[#2d2d2d] border-b border-black flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="ml-auto text-xs text-gray-500 font-sans">
                  bash — 80x24
                </div>
              </div>
              <div className="p-12 flex flex-col h-full text-gray-300">
                <div className="mb-8 opacity-50">
                  <span className="text-green-400">➜</span>{" "}
                  <span className="text-blue-400">~</span> project start{" "}
                  <span className="text-yellow-300">--verbose</span>
                </div>
                <h1
                  className="font-bold text-white mb-6 leading-snug"
                  style={{ fontSize: `3.5rem` }}
                >
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-blue-400">Title</span> ={" "}
                  <span className="text-green-400">"{title}"</span>;
                </h1>
                <div className="pl-8 border-l-2 border-gray-700 mb-auto">
                  <p
                    className="text-gray-400 leading-relaxed font-light"
                    style={{ fontSize: `1.8rem` }}
                  >
                    // {description}
                  </p>
                </div>
                <div className="flex justify-between items-end mt-8 border-t border-gray-800 pt-8">
                  <div className="flex items-center gap-3">
                    {image && (
                      <img
                        src={image}
                        className="w-8 h-8 rounded"
                        crossOrigin="anonymous"
                        alt=""
                      />
                    )}
                    <span className="text-blue-400">@{siteName}</span>
                  </div>
                  <div className="text-gray-600 text-sm">
                    git commit -m "init"
                  </div>
                </div>
              </div>
            </div>
          </Wrapper>
        );

      case "minimal":
      default:
        return (
          <Wrapper contentClassName="p-16 flex flex-col justify-between">
            {showLogo && (
              <div className="flex items-center gap-3">
                {image ? (
                  <img
                    src={image}
                    className="w-10 h-10 object-contain"
                    crossOrigin="anonymous"
                    alt=""
                  />
                ) : (
                  <div className="w-10 h-10 bg-current rounded-full opacity-20" />
                )}
                <span
                  className="text-2xl font-bold tracking-tight"
                  style={textStyle}
                >
                  {siteName}
                </span>
              </div>
            )}
            <div className="my-auto">
              <h1
                className="font-bold leading-tighter tracking-tight mb-8"
                style={{ ...textStyle, fontSize: titleSize }}
              >
                {title}
              </h1>
              <div
                className="w-24 h-2 mb-8"
                style={{ backgroundColor: accentColor }}
              />
              <p
                className="font-light opacity-80 leading-relaxed max-w-3xl"
                style={{ ...textStyle, fontSize: descSize }}
              >
                {description}
              </p>
            </div>
            <div className="flex justify-between items-center opacity-80">
              <OutlineChip>{author}</OutlineChip>
              <OutlineChip>Read now</OutlineChip>
            </div>
          </Wrapper>
        );
    }
  };

  return (
    <section
      className="w-full lg:flex-1 h-1/2 lg:h-full bg-[#0A0A0A] relative flex flex-col items-center justify-center p-4 lg:p-8 overflow-hidden order-1 lg:order-2"
      ref={containerRef}
    >
      <div
        className="relative shadow-2xl shadow-black/50 border border-slate-800 rounded-sm overflow-hidden transition-transform duration-300 ease-out"
        style={{
          width: "1200px",
          height: "630px",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${previewScale})`,
          transformOrigin: "center center",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
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
};

export default PreviewCanvas;
