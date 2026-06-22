'use client';
import { useState, useEffect } from 'react';
import { isSposi, loginSposi, logoutSposi } from '../lib/auth';

// Mostra un badge fluttuante per sbloccare/uscire dalla vista sposi.
// I figli ricevono lo stato via context-like prop se serve.
export default function SposiBadge({ onChange }) {
  const [sposi, setSposi] = useState(false);
  const [open, setOpen] = useState(false);
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);

  useEffect(() => { const s = isSposi(); setSposi(s); onChange?.(s); }, [onChange]);

  function tryLogin() {
    if (loginSposi(pw)) { setSposi(true); setOpen(false); setErr(false); setPw(''); onChange?.(true); }
    else setErr(true);
  }
  function exit() { logoutSposi(); setSposi(false); onChange?.(false); }

  return (
    <div className="fixed bottom-4 right-4 z-[1000]">
      {sposi ? (
        <button onClick={exit} className="btn-ghost text-sm shadow-md">
          💍 Vista sposi attiva · esci
        </button>
      ) : open ? (
        <div className="card p-3 flex flex-col gap-2 shadow-lg">
          <input
            type="password" autoFocus value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(false); }}
            onKeyDown={(e) => e.key === 'Enter' && tryLogin()}
            placeholder="Password sposi"
            className="rounded-full border border-sabbia-dark/50 px-4 py-2 outline-none focus:border-mare"
          />
          {err && <span className="text-xs text-terra-dark px-2">Password errata</span>}
          <div className="flex gap-2">
            <button onClick={tryLogin} className="btn-mare text-sm flex-1">Entra</button>
            <button onClick={() => { setOpen(false); setErr(false); }} className="btn-ghost text-sm">Annulla</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="btn-ghost text-sm shadow-md">
          🔒 Siete gli sposi?
        </button>
      )}
    </div>
  );
}
