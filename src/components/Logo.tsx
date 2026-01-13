interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "", size = 28 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Stylized V shape with gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(187 100% 55%)" />
          <stop offset="100%" stopColor="hsl(187 100% 42%)" />
        </linearGradient>
      </defs>
      {/* Left arm of V */}
      <path
        d="M20 20 L50 80 L55 80 L30 20 Z"
        fill="url(#logoGradient)"
      />
      {/* Right arm of V */}
      <path
        d="M80 20 L50 80 L45 80 L70 20 Z"
        fill="url(#logoGradient)"
      />
    </svg>
  );
}
