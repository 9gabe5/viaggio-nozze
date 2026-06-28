'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function AdminDiario() {
  const [voci, setVoci] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('diario').select('*').order('data', { ascending: false })
      .then(({ data }) => { setVoci(data || []); setLoading(false); });
  }, []);
  const fmt = (d) => new Date(d).toLocaleDateString('it-IT', { day:'2-digit', month:'long' });

  return (
    <div>
      <h1 className="font-display text-2xl text-notte mb-4">📔 Diario</h1>
      {loading ? <p className="text-notte/50">Caricamento…</p> :
        voci.length === 0 ? (
          <div className="card p-6 text-center text-notte/60">Nessuna voce ancora.</div>
        ) : (
          <div className="flex flex-col gap-5">
            {voci.map((v) => (
              <article key={v.id} className="card p-5">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-xl text-notte">{v.titolo}</h2>
                  <span className="text-xs text-mare uppercase">{fmt(v.data)}</span>
                </div>
                {v.testo && <p className="text-notte/80 mt-2 whitespace-pre-line">{v.testo}</p>}
              </article>
            ))}
          </div>
        )}
    </div>
  );
}
