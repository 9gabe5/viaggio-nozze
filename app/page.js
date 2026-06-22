'use client';
import { useState } from 'react';
import Link from 'next/link';
import SposiBadge from '../components/SposiGate';

const SEZIONI = [
  { href: '/itinerario',   emoji: '🗓️', titolo: 'Itinerario',   desc: 'Giorno per giorno' },
  { href: '/mappa',        emoji: '🗺️', titolo: 'Mappa',        desc: 'Le tappe del viaggio' },
  { href: '/alloggi',      emoji: '🏠', titolo: 'Alloggi',      desc: 'Dove dormiamo' },
  { href: '/prenotazioni', emoji: '✈️', titolo: 'Prenotazioni', desc: 'Voli, auto, biglietti' },
  { href: '/ristoranti',   emoji: '🍝', titolo: 'Da provare',   desc: 'Dove mangiare' },
  { href: '/diario',       emoji: '📔', titolo: 'Diario',       desc: 'Foto e ricordi' },
];

export default function Home() {
  const [sposi, setSposi] = useState(false);

  return (
    <main className="max-w-3xl mx-auto px-5 py-10">
      <header className="text-center mb-10">
        <p className="text-mare font-medium tracking-widest uppercase text-sm">28 giugno – 5 luglio 2026</p>
        <h1 className="font-display text-4xl sm:text-5xl mt-2 text-notte">Marco &amp; Gabri</h1>
        <p className="text-lg mt-1 text-terra-dark">il nostro viaggio di nozze in Sicilia 🍋</p>
        {sposi && (
          <p className="mt-3 inline-block text-sm bg-fico/15 text-fico rounded-full px-4 py-1">
            Modalità sposi — vedete tutti i dettagli
          </p>
        )}
      </header>

      <div className="grid grid-cols-2 gap-4">
        {SEZIONI.map((s) => (
          <Link key={s.href} href={s.href}
            className="card p-5 flex flex-col gap-1 hover:shadow-md hover:-translate-y-0.5 transition">
            <span className="text-3xl">{s.emoji}</span>
            <span className="font-display text-xl text-notte mt-1">{s.titolo}</span>
            <span className="text-sm text-notte/60">{s.desc}</span>
          </Link>
        ))}
      </div>

      <footer className="text-center mt-12 text-sm text-notte/40">
        Da Perugia a Palermo, tra mare e saline.
      </footer>

      <SposiBadge onChange={setSposi} />
    </main>
  );
}
