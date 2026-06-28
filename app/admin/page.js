'use client';
import Link from 'next/link';

const CARDS = [
  { href: '/admin/itinerario',   emoji:'🗓️', t:'Itinerario',   d:'Programma giorno per giorno' },
  { href: '/admin/alloggi',      emoji:'🏠', t:'Alloggi',      d:'Hotel e ricevute' },
  { href: '/admin/prenotazioni', emoji:'✈️', t:'Prenotazioni', d:'Voli, auto, documenti' },
  { href: '/admin/media',        emoji:'📸', t:'Foto / Video', d:'Carica i ricordi' },
  { href: '/admin/diario',       emoji:'📔', t:'Diario',       d:'I vostri appunti' },
];

export default function AdminHome() {
  return (
    <div>
      <h1 className="font-display text-3xl text-notte mb-1">Area sposi 💍</h1>
      <p className="text-notte/60 mb-6">Il vostro quartier generale del viaggio.</p>
      <div className="grid grid-cols-2 gap-4">
        {CARDS.map((c) => (
          <Link key={c.href} href={c.href} className="card p-5 hover:shadow-md hover:-translate-y-0.5 transition">
            <span className="text-3xl">{c.emoji}</span>
            <div className="font-display text-xl text-notte mt-1">{c.t}</div>
            <div className="text-sm text-notte/60">{c.d}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
