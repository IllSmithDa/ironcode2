'use client';
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer/Footer';
import { useParams } from 'next/navigation';
import TopicsTab from '@/components/TopicsTab/TopicsTab';
import { useTheme } from '@/themes/ThemeContext';
import React, {useEffect, useState} from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { Provider } from 'react-redux';
import { store } from '@/Redux/Store/Store';
import './Home.scss';

const inter = Inter({ subsets: ['latin'] })

export default function MainContent({
  children,
}: {
  children: React.ReactNode,
}) {
  const [darkMode, setDarkMode] = useState<boolean>()
  const {isDark} = useTheme();
  const {topicId, languageId} = useParams();
  useEffect(() => {
    if (isDark !== null) {
      setDarkMode(isDark);
    }
  }, [isDark])

  return (
    <Provider store={store}>
      <body id="iron-code-body" className={`${inter.className} ${darkMode ? 'dark': ''}`}>
        <Navbar languageId={(languageId as string)} />     
        <main className={`main-app ${darkMode ? 'dark': ''}`}>
          <section className='main-body'>
            {
              topicId ? 
              <TopicsTab languageId={''} />:
              <></>
            }
            {
              languageId? 
              <TopicsTab languageId={languageId as string} />:
              <></>
            }
            <section className={`main-top-body ${darkMode ? 'dark': ''}`}>
              {children}
              {
              topicId || languageId ? 
              <Footer />:
              <></>
              }
            </section>
          </section>
        </main>
      </body>
    </Provider>
  )
}
