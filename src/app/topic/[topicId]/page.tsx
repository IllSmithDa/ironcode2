'use client';
import React, {useEffect, useState} from 'react'
import './Topics.scss'
import { ActiveLanguages, ConceptItem, ConceptTopic, Language } from '@/types';
import { axiosFetch } from '@/axios';
import Loader from '@/components/Loader/Loader';
import LanguageSelect from '@/components/LanguageSelect/LanguageSelect';
import useLanguages from '@/hooks/LanguageHook';
import { useDispatch } from 'react-redux';
import { setTopicSelection } from '@/Redux/Features/TopicsSlice';
import { useTheme } from '@/themes/ThemeContext';
import { parseConcepts } from '@/app/helper/parseData';

interface Concepts extends ConceptItem{
  checked: boolean
}

type Props = {
  params: {
    topicId: string,
  }
}


export default function Home({ params: {topicId}}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string>();
  const [concepts, setConcepts] = useState<Concepts[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>();
  const [topic, setTopic] = useState<ConceptTopic>();
  const [languages] = useLanguages();
  const link = `/api/concept/topic-id/${topicId}`;
  const dispatch = useDispatch()
  const {isDark} = useTheme();

  useEffect(() => {
    if (isDark !== null) {
      setDarkMode(isDark);
    }
  }, [isDark])


  useEffect(() => {
    if(topicId) {
      dispatch(setTopicSelection(topicId));
    }
  }, [topicId, dispatch])

  useEffect(() => {
    if (isLoading === false && concepts.length) {
      for(let i = 0; i < concepts.length; i += 1) {
        parseConcepts(concepts[i].text, `${concepts[i].id}_code`);
      }
    }
  }, [isLoading, concepts])

  // const [topics] = useConceptTopics();
  useEffect(() => {
    // https://blog.logrocket.com/3-ways-implement-infinite-scroll-react/
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosFetch.get(link)
        if (res.status === 200) {
          const data: ConceptItem[] = res.data.data;

          // get active languages from 
          let activeLanguages: ActiveLanguages = {};
          if (localStorage.getItem('iron_code_languages') === null) {
            (languages as Language []).forEach((entry) => {
              activeLanguages[entry.name] = true;
            })
            localStorage.setItem('iron_code_languages', JSON.stringify(activeLanguages))
          } else {
            activeLanguages = JSON.parse(localStorage.getItem('iron_code_languages') as string);
          }
          setConcepts(data.map((entry) => {
            return {
              ...entry,
              checked: activeLanguages[entry.language],
            }
          }))
        }
        const topic = await axiosFetch.get(`/api/concept/topic-object/${topicId}`)
        if (topic.status === 200) {
          setTopic(topic.data.data)
        }
        return true;
      } catch (err) {
        setErrMsg('Network Error! Please contact an administrator for help');
      } finally {
        setIsLoading(false);
      }
    }
    if ((languages as Language[]).length) {
      fetchData();
    }
  }, [link, topicId, languages])



  const updateLanguages = (updatedData: Concepts[]) => {
    setConcepts([...updatedData])
  }
  const renderData = (concepts as Concepts[]).map((data) => (
    <>
      {
        data.checked ? 
        <article key={data.language} className='card'>
        <h4>{data.language}</h4>
        <pre id={`${data.id}_code`} className='code'>{data.text}</pre>
      </article>:
      <></>
      }
    </>
  ))

  return (
    <section className={`code-container code-page-colors ${darkMode ? 'dark': ''}`}>
      {
        /*<CoolBackground />*/
      }
      <article className='topic-desc-cont'>
        <h3>{topic?.name}</h3>
        <p>{topic?.description}</p>
      </article>
      <LanguageSelect concepts={concepts} updateLanguages={updateLanguages}/>
      <h4>Examples</h4>
      {
        isLoading? 

        <section className={`loader-container  ${darkMode ? 'dark': ''}`}>
          <Loader />
        </section>:
        <section
          className={`item-container ${darkMode ? 'dark': ''}`}
        >
          {renderData}
        </section>
      }
      {
      errMsg ? 
      <p className='error-txt'>{errMsg}</p>:
      <></>
      }         
    </section>
  )
}
