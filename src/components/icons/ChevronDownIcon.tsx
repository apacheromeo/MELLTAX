/**
 * ChevronDownIcon Component
 * Icon for dropdown indicators
 */

interface ChevronDownIconProps {
  size?: number;
  className?: string;
}

export function ChevronDownIcon({ size = 20, className = '' }: ChevronDownIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
