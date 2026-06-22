'use client';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import Header from '../../components/Header';
import SposiBadge from '../../components/SposiGate';

const MappaClient = dynamic(() => import('../../components/MappaClient'), { ssr: false });

export default function Mappa() {
  return (
    <main className="max-w-3xl mx-auto px-5 py-8">
      <Header titolo="Mappa" emoji="🗺️" />
      <div className="card p-2 overflow-hidden">
        <MappaClient />
      </div>
      <p className="text-sm text-notte/50 mt-3 text-center">Il percorso: San Vito Lo Capo → Trapani → Palermo.</p>
      <SposiBadge />
    </main>
  );
}
