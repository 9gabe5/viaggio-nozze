'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { isSposi } from '../../lib/auth';
import Header from '../../components/Header';
import SposiBadge from '../../components/SposiGate';

// I ristoranti li gestiamo come attività di tipo 'pasto' con un luogo,
// ma per ora usiamo una tabella leggera lato itinerario.
// Placeholder finché non popoliamo la lista insieme.
export default function Ristoranti() {
  const [sposi, setSposi] = useState(false);
  useEffect(() => { setSposi(isSposi()); }, []);

  return (
    <main className="max-w-2xl mx-auto px-5 py-8">
      <Header titolo="Da provare" emoji="🍝" />
      <div className="card p-6 text-center">
        <p className="text-notte/70">
          Qui raccoglieremo i posti dove mangiare lungo il viaggio —
          dal cous cous di San Vito al pesce di Trapani.
        </p>
        <p className="text-sm text-notte/40 mt-2">Lista in costruzione 🍋</p>
      </div>
      <SposiBadge onChange={setSposi} />
    </main>
  );
}
