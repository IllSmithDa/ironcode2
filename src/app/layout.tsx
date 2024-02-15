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
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2907367619848104"
     crossOrigin="anonymous"></script>
     <meta name="google-adsense-account" content="ca-pub-2907367619848104"></meta>
      </head>
      <ThemeProvider>
        <MainContent>
          {children}
        </MainContent>
      </ThemeProvider>
    </html>
  )
}
