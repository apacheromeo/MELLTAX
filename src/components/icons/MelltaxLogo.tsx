/**
 * MELLTAX Logo Icon
 * Custom icon: Rounded square with M-shape flowing into check mark
 * Baht symbol subtly suggested in negative space
 * Style: Geometric mono-line, 2px stroke
 */

interface IconProps {
  className?: string;
  size?: number;
}

export function MelltaxLogo({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Rounded square container */}
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* M-shape flowing into check mark */}
      <path
        d="M7 14V9L10 12L13 9V14M13 11L16 14L19 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Subtle Baht symbol suggestion (vertical line) */}
      <path
        d="M10 7V8.5M10 13.5V15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
