/**
 * Language Icon
 * Two rounded squares overlapping
 * Represents language/translation switching
 */

interface IconProps {
  className?: string;
  size?: number;
}

export function LanguageIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background square */}
      <rect
        x="4"
        y="5"
        width="12"
        height="12"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />

      {/* Front square */}
      <rect
        x="8"
        y="7"
        width="12"
        height="12"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Letter A (stylized) */}
      <path
        d="M12 11L13.5 15L15 11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 13.5H14.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
