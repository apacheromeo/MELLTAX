/**
 * Planner Icon
 * Stacked documents with small rising bar chart inside
 */

interface IconProps {
  className?: string;
  size?: number;
}

export function PlannerIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background document (stacked effect) */}
      <rect
        x="5"
        y="4"
        width="14"
        height="16"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      />

      {/* Front document */}
      <rect
        x="6"
        y="6"
        width="14"
        height="16"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Rising bar chart inside */}
      <path
        d="M10 16V15M13 16V13M16 16V11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
