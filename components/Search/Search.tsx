'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const getCleanSlug = (url: string) => {
  try {
    const parsed = new URL(url);
    const rawSlug = decodeURIComponent(parsed.pathname.replace(/^\/|\/$/g, ''));
    // Uklanja nevidljive razmake i čudne karaktere
    return rawSlug
      .replace(/\u202F|\u00A0|\u200B|\uFEFF|\u2060|\u2800|\u200E|\u200F/g, '-')
      .replace(/\s+/g, '-') // razmaci u crtice
      .replace(/-+/g, '-'); // višestruke crtice u jednu
  } catch {
    return '';
  }
};

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wp/v2/search?search=${encodeURIComponent(
            query
          )}&subtype[]=page&subtype[]=post`
        );
        const data = await res.json();
        setResults(data);
        setShowDropdown(true);
      } catch (err) {
        console.error('Greška prilikom pretrage:', err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div
      className="max-w-4xl w-full relative py-4 px-4 sm:px-6 md:px-8 z-100"
      ref={dropdownRef}
    >
      <input
        type="text"
        placeholder="Pretraži stranice i blogove..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm"
        onFocus={() => results.length > 0 && setShowDropdown(true)}
      />

      {showDropdown && results.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {results.map((item) => {
            const slug = getCleanSlug(item.url);
            return (
              <li key={item.id}>
                <Link
                  href={`/${slug}`}
                  className="block p-2 hover:bg-gray-100 text-sm"
                  onClick={() => setShowDropdown(false)}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {loading && (
        <div className="absolute top-full mt-2 w-full bg-white px-4 py-2 text-sm text-gray-500 z-50">
          Učitavanje...
        </div>
      )}

      {showDropdown && !loading && results.length === 0 && query.trim() !== '' && (
        <div className="absolute mt-2 w-full bg-white px-4 py-2 text-sm text-gray-500 z-50">
          Nema rezultata za "{query}"
        </div>
      )}
    </div>
  );
};

export default Search;
