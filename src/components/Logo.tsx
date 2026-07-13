import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ className = "h-14", variant = 'light' }: LogoProps) {
  // Let's draw the high fidelity logo from the image:
  // - A yellow lightning bolt (#F5BA14) wrapping around the text.
  // - "IGUAÇU" in bright lime green (#76D410) with heavy italic styling.
  // - "GERADORES" in bright yellow (#F5BA14) with heavy italic styling.
  // - A yellow separator line (#F5BA14) running under "IGUAÇU" and above "GERADORES".
  
  return (
    <div className={`flex items-center select-none ${className}`} id="iguacu-brand-logo-component">
      <svg
        viewBox="0 0 580 320"
        className="h-full w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Upper Yellow Lightning Diagonal & Horizontal Separator */}
        <path
          d="M220 62 L180 152 L500 152"
          stroke="#F5BA14"
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Lower Yellow Lightning Bolt Segment */}
        <path
          d="M255 178 L142 178 L102 208 L225 208 L102 300 L145 208 L65 208"
          stroke="#F5BA14"
          strokeWidth="15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* "IGUAÇU" Text - Bright Green */}
        <text
          x="205"
          y="126"
          fill="#76D410"
          fontFamily="'Space Grotesk', 'Inter', system-ui, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="90"
          letterSpacing="-3px"
        >
          IGUAÇU
        </text>

        {/* "GERADORES" Text - Yellow */}
        <text
          x="255"
          y="238"
          fill="#F5BA14"
          fontFamily="'Space Grotesk', 'Inter', system-ui, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="56"
          letterSpacing="-1px"
        >
          GERADORES
        </text>
      </svg>
    </div>
  );
}
