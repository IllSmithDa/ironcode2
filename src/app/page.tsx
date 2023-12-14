'use client';
import React, {useEffect, useState} from 'react'
import './Home.scss'
import { ActiveLanguages, ConceptItem, ConceptTopic, Language } from '@/types';
import { axiosFetch } from '@/axios';
import TopicsTab from '@/components/TopicsTab/TopicsTab';
import { useDispatch } from 'react-redux';
import { setTopicSelection } from '@/Redux/Features/TopicsSlice';
import Image from 'next/image';
import { useTheme } from '@/themes/ThemeContext';
import Footer from '@/components/Footer/Footer';
import mainImg from '@/assets/iron_title.svg';

export default function Home() {
  const [darkMode, setDarkMode] = useState<boolean>();
  const dispatch = useDispatch();
  const {isDark} = useTheme();

  useEffect(() => {
    if (isDark !== null) {
      setDarkMode(isDark);
    }
  }, [isDark])

  useEffect(() => {
    dispatch(setTopicSelection(''));
  }, [dispatch])


  return (
    <section className='homepage-container'>
      <TopicsTab languageId='' defaultMode={true} />
      <section className={`landing ${darkMode ? 'dark': ''}`}>
        <section className={`code-container`}>
          <Image src={mainImg} alt='main title image' />
          <h1>IronCodeMan</h1>
          <h2>A Reference for Programmers</h2>
          <h4>Select topic or language</h4>
        </section>
        <Footer />
      </section>
    </section>
  )
}
