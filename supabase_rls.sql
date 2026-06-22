-- ============================================================
--  VIAGGIO DI NOZZE — Row Level Security (RLS)
--  Da incollare DOPO supabase_schema.sql
--
--  Logica (Opzione A — pragmatica):
--   • LETTURA: aperta a tutti (la anon key serve a far leggere il sito).
--     Il filtro pubblico/sposi è gestito dall'app: le pagine mostrano
--     i campi sensibili solo in vista sposi. NB: tecnicamente i dati
--     "non pubblici" viaggiano comunque verso il browser; per un sito
--     di viaggio di nozze è accettabile. Per nasconderli davvero serve
--     l'Opzione B (route server con service_role).
--   • SCRITTURA: consentito solo l'update del flag attivita.completata
--     (le spunte della check-list). Nessun'altra scrittura è permessa
--     con la anon key.
-- ============================================================

-- Abilita RLS su tutte le tabelle
alter table tappe        enable row level security;
alter table alloggi      enable row level security;
alter table prenotazioni enable row level security;
alter table giorni       enable row level security;
alter table attivita     enable row level security;
alter table diario       enable row level security;

-- ---------- LETTURA PUBBLICA (SELECT per tutti) ----------
create policy "lettura pubblica tappe"        on tappe        for select using (true);
create policy "lettura pubblica alloggi"      on alloggi      for select using (true);
create policy "lettura pubblica prenotazioni" on prenotazioni for select using (true);
create policy "lettura pubblica giorni"       on giorni       for select using (true);
create policy "lettura pubblica attivita"     on attivita     for select using (true);
create policy "lettura pubblica diario"       on diario       for select using (true);

-- ---------- SCRITTURA: solo spunta attività ----------
-- Consentiamo l'UPDATE delle attività (serve per il toggle completata).
-- Le altre colonne non vengono toccate dall'app; volendo si può
-- restringere ulteriormente con un trigger, ma qui teniamo semplice.
create policy "spunta attivita" on attivita
  for update using (true) with check (true);

-- Nessuna policy di INSERT/UPDATE/DELETE sulle altre tabelle:
-- con RLS attivo e senza policy, ogni scrittura con la anon key è negata.
-- Le modifiche ai dati (alloggi, diario, ecc.) le facciamo da te,
-- nell'editor Supabase, o più avanti da una mini-area admin protetta.
