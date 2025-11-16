/**
 * MenuIcon Component
 * Icon for mobile menu button
 */

interface MenuIconProps {
  size?: number;
  className?: string;
}

export function MenuIcon({ size = 24, className = '' }: MenuIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4 6H20M4 12H20M4 18H20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
