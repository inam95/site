"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Logo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";
  const primaryColor = isDark ? "hsl(0 72% 66%)" : "hsl(235 28% 19%)";
  const accentColor = isDark ? "hsl(140 36% 45%)" : "hsl(0 72% 66%)";

  return (
    <svg
      width="160"
      height="32"
      viewBox="0 0 160 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transform transition-transform duration-300 hover:scale-105"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Decorative background elements */}
      <path
        d="M1 16C1 8.26801 8.26801 2 16 2H144C151.732 2 158 8.26801 158 16C158 23.732 151.732 30 144 30H16C8.26801 30 2 23.732 2 16Z"
        fill="currentColor"
        fillOpacity="0.05"
        className="transition-colors duration-300"
      />
      <path
        d="M3 16C3 8.8203 8.8203 3 16 3H144C151.18 3 157 8.8203 157 16C157 23.1797 151.18 29 144 29H16C8.8203 29 3 23.1797 3 16Z"
        stroke={primaryColor}
        strokeOpacity="0.2"
        strokeWidth="0.5"
      />

      {/* Text paths for "INAM" */}

      <path
        d="M20 10 L20 22"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 10 L30 22 M30 10 L36 22 M36 22 L36 10"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M45 22 L48 10 M48 10 L51 22 M46 16 L50 16"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60 22 L60 10 M60 10 L63 16 M63 16 L66 10 M66 10 L66 22"
        stroke={primaryColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Text paths for "KODO" */}
      <path
        d="M75 10 V22 M75 16 L81 10 M75 16 L81 22"
        stroke={accentColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M88 16 A6 6 0 1 1 101 16 A6 6 0 0 1 88 16"
        stroke={accentColor}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M91 7 L98 7"
        stroke={accentColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M110 10 L110 22 C110 22 116 22 116 16 C116 10 110 10 110 10Z"
        stroke={accentColor}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M138 16 A6 6 0 1 1 124 16 A6 6 0 1 1 138 16"
        stroke={accentColor}
        strokeWidth="2"
        fill="none"
      />

      {/* Decorative elements */}
      <circle
        cx="148"
        cy="16"
        r="2"
        fill={accentColor}
        className="animate-pulse"
      />
      <circle
        cx="10"
        cy="16"
        r="2"
        fill={primaryColor}
        className="animate-pulse"
      />
    </svg>
  );
}
