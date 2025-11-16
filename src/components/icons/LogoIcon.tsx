/**
 * LogoIcon Component
 * MELLTAX app logo - geometric, minimal design
 */

interface LogoIconProps {
  size?: number;
  className?: string;
}

export function LogoIcon({ size = 32, className = '' }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* M shape with modern geometric design */}
      <path
        d="M4 26V6L10 14L16 6L22 14L28 6V26M10 14V26M22 14V26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tax symbol - percentage sign */}
      <circle
        cx="16"
        cy="20"
        r="2"
        fill="currentColor"
      />
    </svg>
  );
}
