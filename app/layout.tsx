import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Игра "Найди пару"',
  description: 'Игра на память с карточками',
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="ru">
      <body>
      {children}
      </body>
      </html>
  );
}