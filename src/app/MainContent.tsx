import Footer from '@/components/Footer/Footer';
import TopicsTab from '@/components/TopicsTab/TopicsTab';
import { useTheme } from '@/themes/ThemeContext';
import React, {useEffect, useState} from 'react';
import './Home.scss';

export default function MainContent({
  children,
  topicId,
  languageId,
}: {
  children: React.ReactNode,
  topicId: string,
  languageId: string,
}) {
  const [darkMode, setDarkMode] = useState<boolean>()
  const {isDark} = useTheme();
  useEffect(() => {
    if (isDark !== null) {
      setDarkMode(isDark);
    }
  }, [isDark])

  return (
    <main className={`main-app ${darkMode ? 'dark': ''}`}>
      <section className='main-body'>
        {
          topicId || languageId? 
          <TopicsTab languageId={languageId as string} />:
          <></>
        }
        <section style={{ width:'100%'}}>
          {children}
          {
          topicId || languageId ? 
          <Footer />:
          <></>
          }
        </section>
      </section>
    </main>
  )
}
