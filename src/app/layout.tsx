'use client';
import { Inter } from 'next/font/google'
import './globals.scss'
import TopicsTab from '@/components/TopicsTab/TopicsTab';
import { Provider } from 'react-redux';
import { store } from '@/Redux/Store/Store';
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar/Navbar';
import Theme from './Theme';
import MainContent from './MainContent';


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const {topicId, languageId} = useParams();
  return (
    <Provider store={store}>
      <Theme>
        <html lang="en">
          <body id="iron-code-body" className={`${inter.className}`}>
            <Navbar languageId={(languageId as string)} />
            <MainContent topicId={topicId as string} languageId={languageId as string}>
              {children}
            </MainContent>
          </body>
        </html>
      </Theme>
    </Provider>
  )
}
