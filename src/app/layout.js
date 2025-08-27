// src/app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';

// Configura la fuente Inter, como se define en el CSS
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LM Digital Stock',
  description: 'Plataforma de gestión de inventario',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}