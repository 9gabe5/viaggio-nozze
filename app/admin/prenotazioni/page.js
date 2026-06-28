'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

const ICONA = { volo:'✈️', auto:'🚗', traghetto:'⛴️', biglietto:'🎟️', altro:'📌' };

export default function AdminPrenotazioni() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('prenotazioni').select('*').order('data_inizio')
      .then(({ data }) => { setItems(data || []); setLoading(false); });
  }, []);
  const fmt = (d) => d ? new Date(d).toLocaleString('it-IT', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' }) : '';

  return (
    <div>
      <h1 className="font-display text-2xl text-notte mb-4">✈️ Prenotazioni</h1>
      {loading ? <p className="text-notte/50">Caricamento…</p> : (
        <div className="flex flex-col gap-4">
          {items.map((p) => (
            <div key={p.id} className="card p-5">
              <div className="flex items-center gap-2 text-lg font-display text-notte">
                <span>{ICONA[p.tipo] || '📌'}</span>{p.titolo}
              </div>
              <div className="text-sm text-notte/70 mt-2 flex flex-col gap-1">
                {p.luogo_partenza && <span>{p.luogo_partenza} → {p.luogo_arrivo}</span>}
                {p.data_inizio && <span>🕒 {fmt(p.data_inizio)}{p.data_fine ? ` — ${fmt(p.data_fine)}` : ''}</span>}
                {p.num_prenotazione && <span className="text-mare-dark">N. {p.num_prenotazione}</span>}
                {p.dettagli && <span className="text-notte/60">{p.dettagli}</span>}
                {p.importo && <span className="text-terra-dark">€ {Number(p.importo).toFixed(2)}</span>}
                {p.contatto && <span className="text-notte/60">📞 {p.contatto}</span>}
                {p.documento_url && !p.documento_url.startsWith('DA_CARICARE') && (
                  <a href={p.documento_url} target="_blank" rel="noreferrer" className="btn-mare text-sm mt-2 self-start">📄 Apri documento</a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
