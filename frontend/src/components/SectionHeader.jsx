import React from 'react';

export const SectionHeader = ({
  number,
  eyebrow,
  title,
  description,
  dark = false,
  align = 'left',
  children,
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-4xl'}`}>
      {/* Number & Eyebrow */}
      <div className={`flex items-center space-x-3 mb-3 ${isCenter ? 'justify-center' : ''}`}>
        {number && (
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-sm bg-[#95B2B8]/20 text-[#95B2B8] border border-[#95B2B8]/30">
            {number}
          </span>
        )}
        {eyebrow && (
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-[#95B2B8]">
            {eyebrow}
          </span>
        )}
      </div>

      {/* Main Title */}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
          dark ? 'text-white' : 'text-[#172326]'
        }`}
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={`mt-4 text-sm sm:text-base leading-relaxed ${
            dark ? 'text-gray-300' : 'text-[#596568]'
          }`}
        >
          {description}
        </p>
      )}

      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};

export default SectionHeader;
