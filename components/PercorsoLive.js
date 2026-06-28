'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

// Linea a tappe con segnaposto "sposini" sulla tappa del giorno.
export default function PercorsoLive() {
  const [tappe, setTappe] = useState([]);

  useEffect(() => {
    supabase.from('tappe').select('*').order('ordine')
      .then(({ data }) => setTappe(data || []));
  }, []);

  if (tappe.length === 0) return null;

  // Costruisce una data a mezzanotte LOCALE da 'YYYY-MM-DD'
  // (evita lo shift UTC che faceva sballare il confronto di un giorno)
  const dataLocale = (s) => {
    const [y, m, d] = String(s).slice(0, 10).split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  // Data di oggi (solo giorno, senza ora)
  const oggi = new Date(); oggi.setHours(0, 0, 0, 0);
  const primo = dataLocale(tappe[0].data_inizio);
  const ultimo = dataLocale(tappe[tappe.length - 1].data_fine);

  // Indice della tappa corrente
  let idxCorrente = -1; // -1 = non ancora partiti
  tappe.forEach((t, i) => {
    const ini = dataLocale(t.data_inizio);
    const fin = dataLocale(t.data_fine);
    if (oggi >= ini && oggi <= fin) idxCorrente = i;
  });

  const prima = oggi < primo;
  const dopo = oggi > ultimo;
  if (prima) idxCorrente = -1;
  if (dopo) idxCorrente = tappe.length - 1;

  // Messaggio di stato
  let stato;
  if (prima) {
    const giorni = Math.ceil((primo - oggi) / 86400000);
    stato = giorni === 1 ? 'Si parte domani! ✈️' : `Si parte tra ${giorni} giorni ✈️`;
  } else if (dopo) {
    stato = 'Viaggio concluso 💛 grazie di averci seguito!';
  } else {
    stato = `Oggi siamo a ${tappe[idxCorrente]?.nome} 💑`;
  }

  // Posizione % degli sposini lungo la linea
  const n = tappe.length;
  const posPct = idxCorrente < 0
    ? 0
    : (idxCorrente / (n - 1)) * 100;

  const fmtRange = (a, b) => {
    const o = { day: '2-digit', month: 'short' };
    return `${dataLocale(a).toLocaleDateString('it-IT', o)} – ${dataLocale(b).toLocaleDateString('it-IT', o)}`;
  };

  return (
    <div className="card p-6">
      <p className="text-center font-display text-lg text-notte mb-6">{stato}</p>

      {/* Linea orizzontale con tappe */}
      <div className="relative px-2 pt-14 pb-2">
        {/* linea base */}
        <div className="absolute left-4 right-4 top-[4.6rem] h-1 bg-sabbia-dark/50 rounded-full" />
        {/* linea percorsa */}
        <div
          className="absolute left-4 top-[4.6rem] h-1 bg-mare rounded-full transition-all duration-700"
          style={{ width: idxCorrente < 0 ? '0%' : `calc(${posPct}% * (100% - 2rem) / 100%)` }}
        />

        {/* sposini */}
        <img
          src="/sposini.svg" alt="sposini" width="48" height="54"
          className="absolute -translate-x-1/2 transition-all duration-700 drop-shadow"
          style={{ left: `calc(1rem + ${posPct}% * (100% - 2rem) / 100%)`, top: '0.2rem' }}
        />

        {/* nodi tappe */}
        <div className="relative flex justify-between">
          {tappe.map((t, i) => {
            const attiva = i <= idxCorrente && idxCorrente >= 0;
            return (
              <div key={t.id} className="flex flex-col items-center w-1/3">
                <span className={`w-4 h-4 rounded-full border-2 z-10 ${attiva ? 'bg-mare border-mare' : 'bg-white border-sabbia-dark/60'}`} />
                <span className="text-sm font-medium text-notte mt-2 text-center leading-tight">{t.nome}</span>
                <span className="text-[11px] text-notte/50 mt-0.5 text-center">{fmtRange(t.data_inizio, t.data_fine)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
