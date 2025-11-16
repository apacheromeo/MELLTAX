/**
 * Sun Icon (Light Mode)
 * 8 rays inside a 24px frame
 * Clean geometric style
 */

interface IconProps {
  className?: string;
  size?: number;
}

export function SunIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Center circle */}
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 8 rays */}
      {/* Top */}
      <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Top-right */}
      <path d="M18.364 5.636L16.95 7.05" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Right */}
      <path d="M22 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Bottom-right */}
      <path d="M18.364 18.364L16.95 16.95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Bottom */}
      <path d="M12 22V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Bottom-left */}
      <path d="M5.636 18.364L7.05 16.95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Left */}
      <path d="M2 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Top-left */}
      <path d="M5.636 5.636L7.05 7.05" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
