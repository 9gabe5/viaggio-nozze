# Viaggio di nozze — Marco & Gabri

Webapp del viaggio di nozze in Sicilia (28 giu – 5 lug 2026).

## Stack
Next.js 14 (App Router) · Supabase · Tailwind · Leaflet · Vercel

## Setup
1. `npm install`
2. Copia `.env.example` in `.env.local` e inserisci URL + anon key Supabase
3. Esegui `supabase_schema.sql` nell'editor SQL di Supabase
4. `npm run dev`

## Viste
- **Pubblica** (curiosi): itinerario leggero, mappa, diario pubblico
- **Sposi** (password `chiave2706`): tutti i dettagli, check-list, diario completo

Il campo `pubblico` su ogni riga decide cosa è visibile ai curiosi.

## Dominio
viaggio.marcogabrisposi.com
