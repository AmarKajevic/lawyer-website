'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home } from 'lucide-react';

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const breadcrumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = decodeURIComponent(segment).replace(/-/g, ' ');

    const isLast = index === segments.length - 1;

    return (
      <div key={href} className="flex items-center space-x-1">
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>

        {isLast ? (
          <span className="text-white capitalize">{label}</span>
        ) : (
          <a
            href={href}
            className="text-white hover:underline capitalize transition"
          >
            {label}
          </a>
        )}
      </div>
    );
  });

  return (
    <nav
  className="relative flex items-center gap-2 px-4 py-2 h-[120px] sm:h-[200px] bg-[url('/belgrade-pano.webp')] bg-cover bg-center"
  aria-label="Breadcrumb"
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/70 bg-opacity-60 z-0" />

  {/* Breadcrumb content */}
  <div className="relative z-10 flex items-center gap-2 text-white">
    {/* Tvoj Link za početnu i breadcrumb elementi */}
    <Link
      href="/"
      className="flex items-center text-white hover:underline gap-1"
    >
      <Home className="w-4 h-4" />
      <span className="hidden sm:inline">Početna</span>
    </Link>

    {/* Ostatak breadcrumbs */}
    {breadcrumbs}
  </div>
</nav>

  );
}
