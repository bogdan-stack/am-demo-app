'use client'

import Image from 'next/image';
import React, { useState } from 'react';

const LogoBar = () => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const logos = [
    {
      name: 'BocaSoft',
      src: '/images/bocasoft-logo.png',
      alt: 'BocaSoft Logo',
      href: '#'
    },
    {
      name: 'Public RESEARCH',
      src: '/images/public-research-logo.png',
      alt: 'Public RESEARCH Logo',
      href: '#'
    },
    {
      name: 'Logo C',
      src: '/images/logo-c.png',
      alt: 'Logo C',
      href: '#'
    }
  ];

  return (
    <div className="bg-white border border-gray-200 py-6 rounded-xl shadow-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-gray-500 font-medium">În parteneriat cu</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-16 min-w-[120px] opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 rounded-lg"
              >
                {!imageErrors[index] ? (
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={60}
                    className="object-contain max-h-16"
                    onError={() => {
                      setImageErrors(prev => ({ ...prev, [index]: true }));
                    }}
                  />
                ) : (
                  <span className="text-gray-400 text-xs font-medium text-center">
                    {logo.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoBar;

