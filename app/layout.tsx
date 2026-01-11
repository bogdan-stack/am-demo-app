import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Decizie Fabricație Aditivă pentru IMM',
  description: 'Sistem de decizie pentru tehnologia și abordarea optimă de fabricație aditivă',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  )
}

