'use client';
import { axiosFetch } from '@/axios';
import Loader from '@/components/Loader/Loader';
import { ConceptItem, Language } from '@/types';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import './Language.scss';
import { useDispatch } from 'react-redux';
import { setLanguage } from '@/Redux/Features/LanguageSlice';
import SlidingBackground from '@/components/SlidingBackground/SlidingBackground';
import { useTheme } from '@/themes/ThemeContext';
import { parseConcepts } from '@/app/helper/parseData';
export default function Language() {
  const [isLoading, setIsLoading] = useState(true);
  const [concepts, setConcepts] = useState<ConceptItem []>([]);
  const [darkMode, setDarkMode] = useState<boolean>();
  const [languageData, setLanguageData] = useState<Language>();
  const [errMsg, setErrMsg] = useState('');
  const {languageId} = useParams();
  const dispatch = useDispatch();
  const languageLink = `/api/language/by-id/${languageId}`
  const link = `/api/concept/by-language`;
  const {isDark} = useTheme();
  
  useEffect(() => {
    if (isLoading === false && concepts.length) {
      for(let i = 0; i < concepts.length; i += 1) {
        parseConcepts(concepts[i].text, `${concepts[i].id}_code`);
      }
    }
    if (isDark !== null) {
      setDarkMode(isDark);
    }
  }, [concepts, isLoading, isDark])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const languageRes:Language = (await axiosFetch.get(languageLink)).data.data;
        // console.log(languageRes)
        dispatch(setLanguage(languageRes));
        setLanguageData(languageRes);
        const res = await axiosFetch.post(link, { language: languageRes.name})
        if (res.status === 200) {
          const data: ConceptItem[] = res.data.data;

          setConcepts([...data]);
        }
      } catch (err) {
        setErrMsg('Network Error! Please contact an administrator for help');
      } finally {
        setIsLoading(false);
      }
    }
    if (languageId) {
      fetchData();
    }
  }, [languageId, link, languageLink, dispatch]);

  const renderData = (concepts as ConceptItem[]).map((data) => (
    <li className='card' key={data.id}>
      <h4>{data.concept_name}</h4>
      <pre id={`${data.id}_code`} className='code'>{data.text}</pre>
      
    </li>
  ))

  return (
    <section className={`language-items-container ${darkMode ? 'dark': ''}`}>
      {/* <SlidingBackground /> */}
      <h4>Concepts for {languageData?.name}</h4>
      {
        isLoading ?
        <Loader />: 
        <ul
        >
          {renderData}
        </ul>
      }
    </section>
  )
}
