/**
 * Calculator Icon
 * 9-dot grid with bottom bar
 * Clean modern proportions
 */

interface IconProps {
  className?: string;
  size?: number;
}

export function CalculatorIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Calculator frame */}
      <rect
        x="4"
        y="3"
        width="16"
        height="18"
        rx="3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Display screen */}
      <rect
        x="7"
        y="6"
        width="10"
        height="3"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 9-dot grid (3x3) */}
      <circle cx="8" cy="13" r="0.8" fill="currentColor" />
      <circle cx="12" cy="13" r="0.8" fill="currentColor" />
      <circle cx="16" cy="13" r="0.8" fill="currentColor" />

      <circle cx="8" cy="16" r="0.8" fill="currentColor" />
      <circle cx="12" cy="16" r="0.8" fill="currentColor" />
      <circle cx="16" cy="16" r="0.8" fill="currentColor" />

      <circle cx="8" cy="19" r="0.8" fill="currentColor" />
      <circle cx="12" cy="19" r="0.8" fill="currentColor" />
      <circle cx="16" cy="19" r="0.8" fill="currentColor" />
    </svg>
  );
}
