'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

const TIPO_ICONA = { visita:'📸', pasto:'🍽️', spostamento:'🧳', relax:'🌅', esperienza:'✨' };

export default function AdminItinerario() {
  const [giorni, setGiorni] = useState([]);
  const [attivita, setAttivita] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data: g } = await supabase.from('giorni').select('*').order('ordine');
    const { data: a } = await supabase.from('attivita').select('*').order('ordine');
    setGiorni(g || []); setAttivita(a || []); setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function toggle(att) {
    const nuovo = !att.completata;
    setAttivita((p) => p.map((x) => x.id === att.id ? { ...x, completata: nuovo } : x));
    await supabase.from('attivita').update({ completata: nuovo }).eq('id', att.id);
  }

  const fmtData = (d) => new Date(d).toLocaleDateString('it-IT', { weekday:'long', day:'2-digit', month:'long' });

  return (
    <div>
      <h1 className="font-display text-2xl text-notte mb-4">🗓️ Itinerario completo</h1>
      {loading ? <p className="text-notte/50">Caricamento…</p> : (
        <div className="flex flex-col gap-6">
          {giorni.map((g) => {
            const att = attivita.filter((a) => a.giorno_id === g.id);
            return (
              <section key={g.id} className="card p-5">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-xl text-notte">{g.titolo}</h2>
                  <span className="text-xs text-mare uppercase tracking-wide">{fmtData(g.data)}</span>
                </div>
                <ul className="mt-3 flex flex-col gap-2">
                  {att.length === 0 && <li className="text-sm text-notte/40 italic">Da pianificare…</li>}
                  {att.map((a) => (
                    <li key={a.id} onClick={() => toggle(a)}
                      className={`flex items-start gap-3 rounded-xl p-2 -mx-2 cursor-pointer hover:bg-sabbia/40 ${a.completata ? 'opacity-50' : ''}`}>
                      <span className="text-lg leading-6">{TIPO_ICONA[a.tipo] || '•'}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {a.orario && <span className="text-xs font-medium text-mare-dark bg-mare/10 rounded px-1.5 py-0.5">{a.orario}</span>}
                          <span className={`text-notte ${a.completata ? 'line-through' : ''}`}>{a.titolo}</span>
                        </div>
                        {a.descrizione && <p className="text-sm text-notte/60 mt-0.5">{a.descrizione}</p>}
                      </div>
                      <span className="text-sm">{a.completata ? '✅' : '⬜'}</span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
