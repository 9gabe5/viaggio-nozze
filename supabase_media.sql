-- ============================================================
--  VIAGGIO DI NOZZE — Tabella media (foto e video)
--  Da incollare nell'SQL Editor.
-- ============================================================

create table if not exists media (
  id          bigint generated always as identity primary key,
  tipo        text not null default 'foto',   -- 'foto' | 'video'
  url         text not null,                  -- URL pubblico su Storage
  didascalia  text,
  tappa       text,                           -- nome tappa (facoltativo)
  created_at  timestamptz default now()
);

alter table media enable row level security;

-- Lettura pubblica (la galleria è visibile agli ospiti)
create policy "lettura pubblica media" on media for select using (true);

-- Inserimento consentito (l'upload avviene dalla pagina /admin con anon key).
-- Come per le attività, teniamo semplice: la pagina admin è protetta da
-- password lato browser. Per blindare davvero servirebbe una route server.
create policy "inserimento media" on media for insert with check (true);
create policy "cancellazione media" on media for delete using (true);
