import { ThemeProvider } from '@/themes/ThemeContext';
import MainContent from './MainContent';
import type { Metadata } from 'next'
import './globals.scss';

export const metadata: Metadata = {
  title: 'IronCodeMan',
  description: '...',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <MainContent>
          {children}
        </MainContent>
      </ThemeProvider>
    </html>
  )
}
