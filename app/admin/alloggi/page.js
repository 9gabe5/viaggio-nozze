'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function AdminAlloggi() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('alloggi').select('*').order('check_in')
      .then(({ data }) => { setItems(data || []); setLoading(false); });
  }, []);
  const fmt = (d) => d ? new Date(d).toLocaleDateString('it-IT', { weekday:'short', day:'2-digit', month:'short' }) : '';

  return (
    <div>
      <h1 className="font-display text-2xl text-notte mb-4">🏠 Alloggi</h1>
      {loading ? <p className="text-notte/50">Caricamento…</p> : (
        <div className="flex flex-col gap-4">
          {items.map((a) => (
            <div key={a.id} className="card p-5">
              <h2 className="font-display text-xl text-notte">{a.nome}</h2>
              <p className="text-sm text-mare mt-0.5">{a.citta}</p>
              <div className="text-sm text-notte/70 mt-2 flex flex-col gap-1">
                <span>📅 {fmt(a.check_in)} → {fmt(a.check_out)}</span>
                {a.indirizzo && <span>📍 {a.indirizzo}</span>}
                {a.num_prenotazione && <span className="text-mare-dark">N. {a.num_prenotazione}</span>}
                {a.contatto && <span>✉️ {a.contatto}</span>}
                {a.sito && <a href={a.sito} className="text-mare underline" target="_blank" rel="noreferrer">Sito web</a>}
                {a.importo && <span className="text-terra-dark">€ {Number(a.importo).toFixed(2)}</span>}
                {a.note && <span className="text-notte/60">{a.note}</span>}
                {a.documento_url && !a.documento_url.startsWith('DA_CARICARE') && (
                  <a href={a.documento_url} target="_blank" rel="noreferrer" className="btn-mare text-sm mt-2 self-start">📄 Apri ricevuta</a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
