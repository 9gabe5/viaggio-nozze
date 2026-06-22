-- ============================================================
--  VIAGGIO DI NOZZE — Marco & Gabri — Sicilia 28 giu / 5 lug 2026
--  Schema Supabase + seed con dati reali (voli, auto, alloggi)
-- ============================================================

-- ---------- PULIZIA (solo in sviluppo) ----------
drop table if exists diario cascade;
drop table if exists attivita cascade;
drop table if exists giorni cascade;
drop table if exists prenotazioni cascade;
drop table if exists alloggi cascade;
drop table if exists tappe cascade;

-- ============================================================
--  TAPPE  (le zone del viaggio, in ordine)
-- ============================================================
create table tappe (
  id          bigint generated always as identity primary key,
  ordine      int not null,
  nome        text not null,
  data_inizio date not null,
  data_fine   date not null,
  lat         double precision,
  lng         double precision,
  descrizione text,
  pubblico    boolean not null default true,
  created_at  timestamptz default now()
);

-- ============================================================
--  ALLOGGI  (collegati alle tappe)
-- ============================================================
create table alloggi (
  id            bigint generated always as identity primary key,
  tappa_id      bigint references tappe(id) on delete set null,
  nome          text not null,
  indirizzo     text,
  citta         text,
  lat           double precision,
  lng           double precision,
  check_in      date,
  check_out     date,
  num_prenotazione text,
  contatto      text,
  sito          text,
  note          text,
  importo       numeric(10,2),
  -- dettagli sensibili → solo vista sposi
  pubblico      boolean not null default false,
  created_at    timestamptz default now()
);

-- ============================================================
--  PRENOTAZIONI  (voli, auto, traghetti, biglietti)
-- ============================================================
create table prenotazioni (
  id            bigint generated always as identity primary key,
  tipo          text not null,            -- 'volo' | 'auto' | 'traghetto' | 'biglietto' | 'altro'
  titolo        text not null,
  num_prenotazione text,
  data_inizio   timestamptz,
  data_fine     timestamptz,
  luogo_partenza text,
  luogo_arrivo   text,
  dettagli      text,
  contatto      text,
  importo       numeric(10,2),
  -- dati sensibili (codici, contatti) → solo vista sposi
  pubblico      boolean not null default false,
  created_at    timestamptz default now()
);

-- ============================================================
--  GIORNI  (ogni giornata del viaggio, legata a una tappa)
-- ============================================================
create table giorni (
  id          bigint generated always as identity primary key,
  tappa_id    bigint references tappe(id) on delete set null,
  data        date not null,
  titolo      text,
  sottotitolo text,
  ordine      int not null default 0,
  created_at  timestamptz default now()
);

-- ============================================================
--  ATTIVITA  (voci dentro ogni giorno; con spunta e visibilità)
-- ============================================================
create table attivita (
  id          bigint generated always as identity primary key,
  giorno_id   bigint references giorni(id) on delete cascade,
  orario      text,                       -- testo libero: '09:30', 'pomeriggio'...
  titolo      text not null,
  descrizione text,
  luogo       text,
  lat         double precision,
  lng         double precision,
  tipo        text default 'visita',      -- visita | pasto | spostamento | relax | esperienza
  completata  boolean not null default false,
  pubblico    boolean not null default true,
  ordine      int not null default 0,
  created_at  timestamptz default now()
);

-- ============================================================
--  DIARIO  (voci con testo e foto, riempite durante il viaggio)
-- ============================================================
create table diario (
  id          bigint generated always as identity primary key,
  data        date not null,
  titolo      text,
  testo       text,
  foto_urls   text[],                     -- array di URL da Supabase Storage
  pubblico    boolean not null default false,
  created_at  timestamptz default now()
);

-- ============================================================
--  SEED — DATI REALI
-- ============================================================

-- ---- TAPPE ----
insert into tappe (ordine, nome, data_inizio, data_fine, lat, lng, descrizione, pubblico) values
  (1, 'San Vito Lo Capo', '2026-06-28', '2026-07-01', 38.1736, 12.7381, 'Spiagge caraibiche, la Riserva dello Zingaro e Scopello.', true),
  (2, 'Trapani',          '2026-07-01', '2026-07-03', 38.0176, 12.5365, 'Saline, Erice, le Egadi e il centro storico fra i due mari.', true),
  (3, 'Cinisi / Palermo', '2026-07-03', '2026-07-05', 38.1669, 13.0947, 'Ultima tappa vicino aeroporto, con possibile gita a Palermo.', true);

-- ---- ALLOGGI ----
insert into alloggi (tappa_id, nome, indirizzo, citta, lat, lng, check_in, check_out, num_prenotazione, sito, contatto, importo, pubblico) values
  (1, 'Hotel Biancolilla', 'Via Antonio Venza 51', 'San Vito Lo Capo (TP)', 38.1736, 12.7381, '2026-06-28', '2026-07-01', '2026050548200444', 'https://www.hotelbiancolilla.it/', 'info@hotelbiancolilla.it', 352.80, false),
  (2, 'Palazzo Mancina',  'Via Mancina 31',       'Trapani',                38.0176, 12.5365, '2026-07-01', '2026-07-03', '6898284474',       null, null, 154.64, false),
  (3, 'Da prenotare (zona aeroporto)', null, 'Cinisi / Terrasini', 38.1669, 13.0947, '2026-07-03', '2026-07-05', null, null, null, null, false);

-- ---- PRENOTAZIONI ----
insert into prenotazioni (tipo, titolo, num_prenotazione, data_inizio, data_fine, luogo_partenza, luogo_arrivo, dettagli, importo, pubblico) values
  ('volo', 'Volo andata — Perugia → Palermo', 'L1LQHJ', '2026-06-28 14:40+02', '2026-06-28 15:55+02', 'Perugia (PEG)', 'Palermo (PMO)', 'Ryanair FR3787 · Gabriele Roscini, Marco Ciancarini · bagaglio 20kg incluso', null, false),
  ('volo', 'Volo ritorno — Palermo → Roma Fiumicino', 'L1LQHJ', '2026-07-05 09:40+02', '2026-07-05 10:55+02', 'Palermo (PMO)', 'Roma Fiumicino (FCO)', 'Ryanair FR4903 · Gabriele Roscini, Marco Ciancarini · bagaglio 20kg incluso', null, false),
  ('auto', 'Noleggio auto — Fiat 500 o simile', 'IT994064410', '2026-06-28 16:25+02', '2026-07-05 08:10+02', 'Aeroporto Palermo (Punta Raisi)', 'Aeroporto Palermo (Punta Raisi)', 'Noleggiare/CarTrawler · conf. DG199811 · guidatore Marco Ciancarini · cambio manuale · AXA premium · deposito 600€ su carta di credito', 210.11, false);

-- ---- GIORNI (scheletro: un giorno per data, attività da riempire insieme) ----
insert into giorni (tappa_id, data, titolo, ordine) values
  (1, '2026-06-28', 'Arrivo in Sicilia', 1),
  (1, '2026-06-29', 'San Vito Lo Capo',  2),
  (1, '2026-06-30', 'Zingaro & Scopello',3),
  (2, '2026-07-01', 'Trasferimento a Trapani', 4),
  (2, '2026-07-02', 'Erice e le Saline',  5),
  (3, '2026-07-03', 'Verso Palermo',      6),
  (3, '2026-07-04', 'Palermo',            7),
  (3, '2026-07-05', 'Rientro',            8);

-- ---- ATTIVITA (solo le certe da logistica; il resto lo aggiungiamo dopo) ----
insert into attivita (giorno_id, orario, titolo, descrizione, tipo, pubblico, ordine)
select id, '15:55', 'Atterraggio a Palermo', 'Volo FR3787 da Perugia.', 'spostamento', true, 1 from giorni where data='2026-06-28';
insert into attivita (giorno_id, orario, titolo, descrizione, tipo, pubblico, ordine)
select id, '16:25', 'Ritiro auto a noleggio', 'Banco Noleggiare al terminal arrivi, Punta Raisi.', 'spostamento', false, 2 from giorni where data='2026-06-28';
insert into attivita (giorno_id, orario, titolo, descrizione, tipo, pubblico, ordine)
select id, 'sera', 'Check-in a San Vito Lo Capo', 'Hotel Biancolilla.', 'relax', false, 3 from giorni where data='2026-06-28';

insert into attivita (giorno_id, orario, titolo, descrizione, tipo, pubblico, ordine)
select id, '08:10', 'Riconsegna auto + volo per Roma', 'Riconsegna a Punta Raisi (08:10), volo FR4903 alle 09:40.', 'spostamento', true, 1 from giorni where data='2026-07-05';
