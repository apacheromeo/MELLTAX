/**
 * About/Info Icon
 * Circle with "i", vertical line slightly shortened for premium feel
 */

interface IconProps {
  className?: string;
  size?: number;
}

export function InfoIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Circle */}
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dot of "i" */}
      <circle cx="12" cy="9" r="1" fill="currentColor" />

      {/* Vertical line of "i" (slightly shortened) */}
      <path
        d="M12 12V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
