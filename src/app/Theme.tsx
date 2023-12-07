'use client';
import { ThemeProvider } from '@/themes/ThemeContext';

export default function Theme({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
