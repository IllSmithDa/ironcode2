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
import { faL } from '@fortawesome/free-solid-svg-icons';
export default function Language() {
  const [isLoading, setIsLoading] = useState(true);
  const [category, SetCategory] = useState("basic");
  const [title, setTitle] = useState("Basic");
  const [categoryDrop, SetCategoryDrop] = useState(false);
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
  }, [concepts, isLoading, isDark, category])

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

  // const renderData = (concepts as ConceptItem[]).map((data) => (
  //   <li className='card' key={data.id}>
  //     <h4>{data.concept_name}</h4>
  //     <pre id={`${data.id}_code`} className='code'>{data.text}</pre>
  //   </li>
  // ))
  const renderData = () => {
    return (
      <>
        {
          (concepts as ConceptItem[])?.filter(topic => topic.category === category).map((data) => (
            <li className='card' key={data.id}>
            <h4>{data.concept_name}</h4>
            <pre id={`${data.id}_code`} className='code'>{data.text}</pre>
          </li>
          ))
        }
      </>
    )
  }
  const handleTabChange = (topic: string, categoryTitle: string) => {
    SetCategory(topic);
    SetCategoryDrop(!categoryDrop);
    setTitle(categoryTitle)
  }
  return (
    <section className={`language-items-container ${darkMode ? 'dark': ''}`}>
      {/* <SlidingBackground /> */}
      <h3>Concepts for {languageData?.name}</h3>
      <p style={{ margin: "2rem 0"}}>
        {languageData?.description}
      </p>
      {
        isLoading ?

        <section className={`loader-container  ${darkMode ? 'dark': ''}`}>
          <Loader />
        </section>:
        <ul
        >{
          /*
          <h3>Basics</h3>
          {renderData('basic')}
          <h3>Data Structure</h3>
          {renderData('data')}
          <h3>Iterables</h3>
          {renderData('iterables')}
          <h3>Classes</h3>
          {renderData('class')}
          <h3>Regex</h3>
          {renderData('regex')}
        */}
        <section className='dropdown-cont'>
            <button type='button' onClick={() => SetCategoryDrop(!categoryDrop)} className={`lang-navbar-dropdown list-right menu-tabs ${darkMode ? 'dark': ''}`}>
              {title} {categoryDrop ? <>▲</> : <>▼</>}
          </button>
          {
            categoryDrop ?
            <section className={`category-select-dropdown ${darkMode ? 'dark': ''}`}>
              <button
                onClick={() => handleTabChange('basic', 'Basic') }
                className='active-tab menu-tabs'
              >
                Basics
              </button>
              <button
                className={`menu-tabs ${darkMode ? 'dark': ''}`}
                onClick={() => handleTabChange('data', 'Data Structures') }
              >
                Data Structures
              </button>
              <button
                className={`menu-tabs ${darkMode ? 'dark': ''}`}
                onClick={() => handleTabChange('iterables', 'Iterables') }
              >
                Iterables
              </button>
              <button
                onClick={() => handleTabChange('class', 'Classes') }
                className={`menu-tabs ${darkMode ? 'dark': ''}`}
              >
                Classes
              </button>
              <button
                onClick={() => handleTabChange('regex', 'Regex') }
                className={`menu-tabs ${darkMode ? 'dark': ''}`}
              >
                Regex
              </button>
                </section>:
                <></>
              }
            </section>
          <section>
            {renderData()}
          </section>
        </ul>
      }
      {
        categoryDrop ? 
        <div
          className='silent-modal'
          onClick={() => {
            SetCategoryDrop(false); 
          }}
        >
        </div>:
        <></>
      }
    </section>
  )
}
