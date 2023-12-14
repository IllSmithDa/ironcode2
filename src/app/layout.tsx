import { ThemeProvider } from '@/themes/ThemeContext';
import MainContent from './MainContent';
import type { Metadata } from 'next'
import './globals.scss';

const appIcon =  '/ironcodeman_small.png';

export const metadata: Metadata = {
  title: 'IronCodeMan',
  description: 'A reference for Programmers',
  icons: {
    icon: appIcon,
    shortcut: appIcon,
    apple: appIcon,
    other: {
      rel: 'ironcodeman',
      url: appIcon 
    }
  }
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
