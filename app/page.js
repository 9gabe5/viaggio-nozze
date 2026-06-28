'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import PercorsoLive from '../components/PercorsoLive';

export default function Home() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('media').select('*').order('created_at', { ascending: false }).limit(12)
      .then(({ data }) => { setMedia(data || []); setLoading(false); });
  }, []);

  return (
    <main className="max-w-2xl mx-auto px-5 py-10">
      <header className="text-center mb-8">
        <p className="text-mare font-medium tracking-widest uppercase text-sm">28 giugno – 5 luglio 2026</p>
        <h1 className="font-display text-4xl sm:text-5xl mt-2 text-notte">Marco &amp; Gabri</h1>
        <p className="text-lg mt-1 text-terra-dark">il nostro viaggio di nozze in Sicilia 🍋</p>
      </header>

      {/* ===== DOVE SONO GLI SPOSINI ===== */}
      <section className="mb-10">
        <h2 className="font-display text-2xl text-notte mb-3 text-center">Dove sono gli sposini</h2>
        <PercorsoLive />
      </section>

      {/* ===== FOTO E VIDEO RECENTI ===== */}
      <section>
        <h2 className="font-display text-2xl text-notte mb-3 text-center">Foto e video recenti</h2>
        {loading ? (
          <p className="text-center text-notte/50">Caricamento…</p>
        ) : media.length === 0 ? (
          <div className="card p-6 text-center text-notte/60">
            Le foto del viaggio arriveranno presto 📸
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {media.map((m) => (
              <figure key={m.id} className="card p-2">
                {m.tipo === 'video'
                  ? <video src={m.url} controls className="rounded-lg w-full h-40 object-cover" />
                  : <img src={m.url} alt={m.didascalia || ''} className="rounded-lg w-full h-40 object-cover" />}
                {m.didascalia && <figcaption className="text-xs text-notte/60 mt-1 px-1">{m.didascalia}</figcaption>}
              </figure>
            ))}
          </div>
        )}
      </section>

      <footer className="text-center mt-12 text-sm text-notte/40">
        Con amore, dalla Sicilia. 💛
      </footer>
    </main>
  );
}
