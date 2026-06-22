-- ============================================================
--  VIAGGIO DI NOZZE — Aggiornamento dati + documenti
--  Da incollare nell'SQL Editor DOPO schema e RLS.
--  Aggiunge i link ai PDF e arricchisce ogni voce coi dettagli completi.
-- ============================================================

-- 1) Nuove colonne per i documenti (PDF su Supabase Storage)
alter table alloggi      add column if not exists documento_url text;
alter table prenotazioni add column if not exists documento_url text;

-- ============================================================
-- 2) ALLOGGI — dettagli completi (visibili solo in vista sposi)
-- ============================================================

-- Hotel Biancolilla (San Vito Lo Capo)
update alloggi set
  indirizzo  = 'Via Antonio Venza 51, 91010 San Vito Lo Capo (TP)',
  contatto   = 'info@hotelbiancolilla.it',
  sito       = 'https://www.hotelbiancolilla.it/',
  importo    = 352.80,
  note       = 'Matrimoniale Economy · BeSafe Rate (rimborsabile) · ROOM ONLY · 3 notti · pagato per intero · tassa di soggiorno non inclusa · intestatario Gabriele Roscini',
  documento_url = 'DA_CARICARE/biancolilla.pdf'
where num_prenotazione = '2026050548200444';

-- Palazzo Mancina (Trapani)
update alloggi set
  indirizzo  = 'Via Mancina 31, 91100 Trapani',
  importo    = 154.64,
  note       = 'Booking.com · pagato il 6 mag 2026 · intestatario Gabriele Roscini · ricevuta (non fattura)',
  documento_url = 'DA_CARICARE/trapani.pdf'
where num_prenotazione = '6898284474';

-- ============================================================
-- 3) PRENOTAZIONI — dettagli completi (visibili solo in vista sposi)
-- ============================================================

-- Volo andata
update prenotazioni set
  contatto = 'Ryanair · pren. L1LQHJ',
  dettagli = 'Ryanair FR3787 · Perugia (PEG) → Palermo (PMO) · 28 giu 2026, 14:40–15:55 · passeggeri: Gabriele Roscini, Marco Ciancarini · bagaglio 20kg + bagaglio piccolo + posti assegnati (Plus) · pren. L1LQHJ',
  documento_url = 'DA_CARICARE/ryanair.pdf'
where titolo like 'Volo andata%';

-- Volo ritorno
update prenotazioni set
  contatto = 'Ryanair · pren. L1LQHJ',
  dettagli = 'Ryanair FR4903 · Palermo (PMO) → Roma Fiumicino (FCO) · 5 lug 2026, 09:40–10:55 · passeggeri: Gabriele Roscini, Marco Ciancarini · bagaglio 20kg + bagaglio piccolo + posti assegnati (Plus) · pren. L1LQHJ · totale voli pagato 282,68€ (PayPal, 30 apr 2026)',
  documento_url = 'DA_CARICARE/ryanair.pdf'
where titolo like 'Volo ritorno%';

-- Auto a noleggio
update prenotazioni set
  contatto = 'Banco Noleggiare Punta Raisi +39 0918669674 / +39 3247944010 · assistenza CarTrawler +39 051 054 5041',
  dettagli = 'Fiat 500 o simile (cod. A2-MZMR) · cambio manuale · 4 posti · aria condizionata · ritiro 28 giu 16:25, riconsegna 5 lug 08:10 — Aeroporto Palermo Punta Raisi (banco arrivi) · guidatore principale: Marco Ciancarini · conf. DG199811 · assicurazione AXA premium (franchigia 1400€ rimborsabile) · deposito cauzionale 600€ su carta di credito intestata al guidatore · carburante: ritiro/riconsegna con pieno · chilometraggio illimitato · totale 210,11€ (auto 154,60 + copertura 55,51)',
  importo = 210.11,
  documento_url = 'DA_CARICARE/voucher-auto.pdf'
where num_prenotazione = 'IT994064410';

-- ============================================================
-- NOTA: i 'DA_CARICARE/...' sono segnaposto. Dopo aver caricato
-- i PDF su Storage, sostituiremo con gli URL pubblici reali
-- (te li preparo io nel passo successivo).
-- ============================================================
