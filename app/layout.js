import './globals.css';

export const metadata = {
  title: 'Marco & Gabri — Viaggio di nozze in Sicilia',
  description: 'Il diario del nostro viaggio di nozze, 28 giugno – 5 luglio 2026.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
