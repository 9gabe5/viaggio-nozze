'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function AdminMedia() {
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [didascalia, setDidascalia] = useState('');
  const [msg, setMsg] = useState('');

  async function load() {
    const { data } = await supabase.from('media').select('*').order('created_at', { ascending: false });
    setMedia(data || []);
  }
  useEffect(() => { load(); }, []);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true); setMsg('');
    try {
      const ext = file.name.split('.').pop();
      const nome = `${Date.now()}.${ext}`;
      const tipo = file.type.startsWith('video') ? 'video' : 'foto';

      const { error: upErr } = await supabase.storage.from('media').upload(nome, file, { upsert: false });
      if (upErr) throw upErr;

      const { data: pub } = supabase.storage.from('media').getPublicUrl(nome);
      const { error: insErr } = await supabase.from('media').insert({
        tipo, url: pub.publicUrl, didascalia: didascalia || null,
      });
      if (insErr) throw insErr;

      setDidascalia(''); setMsg('Caricato! ✅');
      load();
    } catch (err) {
      setMsg('Errore: ' + (err.message || err));
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  async function elimina(m) {
    if (!confirm('Eliminare questo media?')) return;
    // togli dal db; il file nello storage resta (lo si può ripulire dopo)
    await supabase.from('media').delete().eq('id', m.id);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-notte mb-4">📸 Carica foto / video</h1>

      <div className="card p-5 mb-6">
        <input
          type="text" value={didascalia} onChange={(e) => setDidascalia(e.target.value)}
          placeholder="Didascalia (facoltativa)"
          className="w-full rounded-full border border-sabbia-dark/50 px-4 py-2 mb-3 outline-none focus:border-mare"
        />
        <label className="btn-mare cursor-pointer inline-block">
          {uploading ? 'Caricamento…' : 'Scegli foto o video'}
          <input type="file" accept="image/*,video/*" onChange={handleUpload} disabled={uploading} className="hidden" />
        </label>
        {msg && <p className="text-sm mt-2 text-notte/70">{msg}</p>}
        <p className="text-xs text-notte/40 mt-2">Le foto e i video caricati appaiono sulla home pubblica.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {media.map((m) => (
          <div key={m.id} className="card p-2">
            {m.tipo === 'video'
              ? <video src={m.url} controls className="rounded-lg w-full h-32 object-cover" />
              : <img src={m.url} alt="" className="rounded-lg w-full h-32 object-cover" />}
            {m.didascalia && <p className="text-xs text-notte/60 mt-1 px-1">{m.didascalia}</p>}
            <button onClick={() => elimina(m)} className="text-xs text-terra-dark mt-1 px-1">Elimina</button>
          </div>
        ))}
      </div>
    </div>
  );
}
