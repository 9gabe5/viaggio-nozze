'use client';
import Link from 'next/link';

export default function Header({ titolo, emoji }) {
  return (
    <header className="flex items-center gap-3 mb-6">
      <Link href="/" className="btn-ghost text-sm">← Home</Link>
      <h1 className="font-display text-2xl text-notte flex items-center gap-2">
        <span>{emoji}</span>{titolo}
      </h1>
    </header>
  );
}
