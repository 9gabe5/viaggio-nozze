'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { isSposi } from '../../lib/auth';
import Header from '../../components/Header';
import SposiBadge from '../../components/SposiGate';

export default function Diario() {
  const [voci, setVoci] = useState([]);
  const [sposi, setSposi] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setSposi(isSposi()); }, []);
  useEffect(() => {
    supabase.from('diario').select('*').order('data', { ascending: false })
      .then(({ data }) => { setVoci(data || []); setLoading(false); });
  }, []);

  const visibili = voci.filter((v) => sposi || v.pubblico);
  const fmt = (d) => new Date(d).toLocaleDateString('it-IT', { day:'2-digit', month:'long' });

  return (
    <main className="max-w-2xl mx-auto px-5 py-8">
      <Header titolo="Diario" emoji="📔" />
      {loading ? <p className="text-notte/50">Caricamento…</p> :
        visibili.length === 0 ? (
          <div className="card p-6 text-center text-notte/60">
            Il diario si riempirà giorno per giorno, con foto e ricordi del viaggio. 📸
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {visibili.map((v) => (
              <article key={v.id} className="card p-5">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-xl text-notte">{v.titolo}</h2>
                  <span className="text-xs text-mare uppercase">{fmt(v.data)}</span>
                </div>
                {v.testo && <p className="text-notte/80 mt-2 whitespace-pre-line">{v.testo}</p>}
                {v.foto_urls?.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {v.foto_urls.map((u, i) => (
                      <img key={i} src={u} alt="" className="rounded-xl object-cover w-full h-40" />
                    ))}
                  </div>
                )}
                {!v.pubblico && <span className="text-xs text-fico mt-2 inline-block">privato</span>}
              </article>
            ))}
          </div>
        )}
      <SposiBadge onChange={setSposi} />
    </main>
  );
}
