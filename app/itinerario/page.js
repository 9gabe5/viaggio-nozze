'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { isSposi } from '../../lib/auth';
import Header from '../../components/Header';
import SposiBadge from '../../components/SposiGate';
import PercorsoLive from '../../components/PercorsoLive';

const TIPO_ICONA = { visita:'📸', pasto:'🍽️', spostamento:'🧳', relax:'🌅', esperienza:'✨' };

export default function Itinerario() {
  const [giorni, setGiorni] = useState([]);
  const [attivita, setAttivita] = useState([]);
  const [tappe, setTappe] = useState([]);
  const [sposi, setSposi] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setSposi(isSposi()); }, []);

  async function load() {
    const { data: g } = await supabase.from('giorni').select('*').order('ordine');
    const { data: a } = await supabase.from('attivita').select('*').order('ordine');
    const { data: t } = await supabase.from('tappe').select('*').order('ordine');
    setGiorni(g || []); setAttivita(a || []); setTappe(t || []); setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function toggle(att) {
    if (!sposi) return;
    const nuovo = !att.completata;
    setAttivita((prev) => prev.map((x) => x.id === att.id ? { ...x, completata: nuovo } : x));
    await supabase.from('attivita').update({ completata: nuovo }).eq('id', att.id);
  }

  const fmtData = (d) => new Date(d).toLocaleDateString('it-IT', { weekday:'long', day:'2-digit', month:'long' });

  // ====== VISTA OSPITI: percorso live + tappe in chiaro, senza logistica ======
  if (!sposi) {
    return (
      <main className="max-w-2xl mx-auto px-5 py-8">
        <Header titolo="Dove siamo" emoji="💑" />
        {loading ? <p className="text-notte/50">Caricamento…</p> : (
          <div className="flex flex-col gap-6">
            <PercorsoLive />
            <div className="flex flex-col gap-4">
              {tappe.map((t) => (
                <section key={t.id} className="card p-5">
                  <h2 className="font-display text-xl text-notte">{t.nome}</h2>
                  {t.descrizione && <p className="text-notte/70 mt-1">{t.descrizione}</p>}
                </section>
              ))}
            </div>
            <p className="text-center text-sm text-notte/40">
              Seguiteci giorno per giorno: il puntino si muove con noi 🍋
            </p>
          </div>
        )}
        <SposiBadge onChange={setSposi} />
      </main>
    );
  }

  // ====== VISTA SPOSI: timeline dettagliata completa ======
  return (
    <main className="max-w-2xl mx-auto px-5 py-8">
      <Header titolo="Itinerario" emoji="🗓️" />
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
                    <li key={a.id}
                      onClick={() => toggle(a)}
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
      <SposiBadge onChange={setSposi} />
    </main>
  );
}
