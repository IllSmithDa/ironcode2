'use client';
import React, { useEffect, useState } from 'react';
import './LanguageSelect.scss';
import { ActiveConceptItem, ActiveLanguages, ConceptItem, Language } from '@/types';
import useLanguages from '@/hooks/LanguageHook';
import { useTheme } from '@/themes/ThemeContext';

export default function LanguageSelect({
  concepts,
  updateLanguages
}:{
    concepts: ActiveConceptItem[],
    updateLanguages: (updateedData: ActiveConceptItem[]) => void
}) {

  const [darkMode, setDarkMode] = useState<boolean>();
  const {isDark} = useTheme();

  useEffect(() => {
    if (isDark !== null) {
      setDarkMode(isDark);
    }
    if(concepts.length) {
      console.log(concepts);
    }
  }, [isDark, concepts])

  const handleLanguage = (language: string, newChecked: boolean) => {
    
    // updating local storage languages
    const activeLanguages: ActiveLanguages = JSON.parse(localStorage.getItem('iron_code_languages') as string);
    activeLanguages[language] = newChecked;
    localStorage.setItem('iron_code_languages', JSON.stringify(activeLanguages));

    const result = concepts.map((data: ConceptItem) => {
      if (data.language === language) {
        return {
          ...data,
          language: data.language,
          checked: newChecked
        } 
      }
      return data;
    });
    updateLanguages([...result] as ActiveConceptItem[]);
  } 


  const renderData = concepts.map((data) => (
    <li key={data.language}>
      <input id={`selection-${data.language}`} type='checkbox' checked={data.checked} onChange={() => {
        handleLanguage(data.language, !data.checked)
      }} />
      <button
        className='inv-btn'
        onClick={() => {
          handleLanguage(data.language, !data.checked)
        }}
        >
          {data.language}
        </button>
    </li>
  ))
  
  return (
    <section
      className={`language-select-container ${darkMode ? 'dark': ''}`}
    >
      <h4>Select Languages</h4>
      <ul className={`${darkMode ? 'dark':''}`}>
        {renderData}
      </ul>
    </section>
  )
}
