-- ============================================================
--  VIAGGIO DI NOZZE — Collega i PDF reali (Supabase Storage)
--  Da incollare nell'SQL Editor DOPO supabase_update_documenti.sql
--  Sostituisce i segnaposto 'DA_CARICARE/...' con gli URL pubblici.
--  Bucket: documenti (pubblico)
-- ============================================================

-- Base URL del bucket pubblico
-- https://zxeacjkjzjkemhgkamxl.supabase.co/storage/v1/object/public/documenti/<file>

-- ALLOGGI
update alloggi
  set documento_url = 'https://zxeacjkjzjkemhgkamxl.supabase.co/storage/v1/object/public/documenti/biancolilla.pdf'
  where num_prenotazione = '2026050548200444';

update alloggi
  set documento_url = 'https://zxeacjkjzjkemhgkamxl.supabase.co/storage/v1/object/public/documenti/trapani.pdf'
  where num_prenotazione = '6898284474';

-- PRENOTAZIONI
update prenotazioni
  set documento_url = 'https://zxeacjkjzjkemhgkamxl.supabase.co/storage/v1/object/public/documenti/ryanair.pdf'
  where titolo like 'Volo%';

update prenotazioni
  set documento_url = 'https://zxeacjkjzjkemhgkamxl.supabase.co/storage/v1/object/public/documenti/voucher-auto.pdf'
  where num_prenotazione = 'IT994064410';

-- ============================================================
--  Verifica veloce (facoltativa): controlla i link impostati
-- ============================================================
-- select nome, documento_url from alloggi;
-- select titolo, documento_url from prenotazioni;
