'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { supabase } from '../lib/supabase';

// Fix icone Leaflet con bundler
const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

export default function MappaClient() {
  const [tappe, setTappe] = useState([]);

  useEffect(() => {
    supabase.from('tappe').select('*').order('ordine')
      .then(({ data }) => setTappe(data || []));
  }, []);

  const punti = tappe.filter((t) => t.lat && t.lng).map((t) => [t.lat, t.lng]);
  const centro = [37.9, 12.9];

  return (
    <MapContainer center={centro} zoom={9} scrollWheelZoom={false} style={{ height: '70vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {punti.length > 1 && <Polyline positions={punti} pathOptions={{ color: '#1B7FA6', weight: 3, dashArray: '6 8' }} />}
      {tappe.map((t) => t.lat && t.lng && (
        <Marker key={t.id} position={[t.lat, t.lng]} icon={icon}>
          <Popup>
            <strong>{t.ordine}. {t.nome}</strong><br />
            {t.descrizione}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
