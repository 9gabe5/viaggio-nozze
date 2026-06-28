'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { isSposi, loginSposi, logoutSposi } from '../../lib/auth';

const NAV = [
  { href: '/admin',              label: 'Home admin' },
  { href: '/admin/itinerario',   label: 'Itinerario' },
  { href: '/admin/alloggi',      label: 'Alloggi' },
  { href: '/admin/prenotazioni', label: 'Prenotazioni' },
  { href: '/admin/media',        label: 'Carica foto/video' },
  { href: '/admin/diario',       label: 'Diario' },
];

export default function AdminLayout({ children }) {
  const [ok, setOk] = useState(false);
  const [ready, setReady] = useState(false);
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);

  useEffect(() => { setOk(isSposi()); setReady(true); }, []);

  function entra() {
    if (loginSposi(pw)) { setOk(true); setErr(false); }
    else setErr(true);
  }

  if (!ready) return null;

  if (!ok) {
    return (
      <main className="max-w-sm mx-auto px-5 py-20">
        <div className="card p-6 text-center">
          <h1 className="font-display text-2xl text-notte">Area sposi 💍</h1>
          <p className="text-sm text-notte/60 mt-1 mb-4">Inserite la password per accedere.</p>
          <input
            type="password" autoFocus value={pw}
            onChange={(e) => { setPw(e.target.value); setErr(false); }}
            onKeyDown={(e) => e.key === 'Enter' && entra()}
            placeholder="Password"
            className="w-full rounded-full border border-sabbia-dark/50 px-4 py-2 outline-none focus:border-mare text-center"
          />
          {err && <p className="text-sm text-terra-dark mt-2">Password errata</p>}
          <button onClick={entra} className="btn-mare w-full mt-4">Entra</button>
          <Link href="/" className="block text-sm text-mare mt-4">← Torna al sito pubblico</Link>
        </div>
      </main>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-6">
      <nav className="card p-3 mb-6 flex flex-wrap gap-2 items-center text-sm">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="px-3 py-1.5 rounded-full hover:bg-sabbia/50 text-notte">
            {n.label}
          </Link>
        ))}
        <button
          onClick={() => { logoutSposi(); setOk(false); }}
          className="ml-auto px-3 py-1.5 rounded-full text-terra-dark hover:bg-terra/10">
          Esci
        </button>
      </nav>
      {children}
    </div>
  );
}
