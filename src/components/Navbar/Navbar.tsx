'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose, faHome, faMoon, faRobot, faSun, faUser, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import ironcodeman from '@/app/ironcodeman_icon.png'; 
import iron from '@/assets/iron.svg';
import useLanguages from '@/hooks/LanguageHook';
import { ConceptTopic, Language, User } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@/themes/ThemeContext';
import ProfileDropdown from './ProfileDropdown';
import { useRouter } from 'next/navigation';
import { setTopicSelection } from '@/Redux/Features/TopicsSlice';

interface LanguageData {
  languageData: {
    selectedLanguage: Language
  }
}
interface ConceptData {
   conceptsData: {
    concepts: ConceptTopic []
  }
}
interface UserData {
  userData: {
    user: User
  }
}
interface TopicsState {
  topicsData : {
    selectedTopic: string,
  }
}

export default function Navbar({
  languageId
}: {
  languageId: string
}) {
  const [languages] = useLanguages();
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>();
  const [mobileNav, setMobileNav] = useState(false);
  const [languageOption, setLanguageOption] = useState<string>('Select');
  const {concepts} = useSelector((res: ConceptData) => res.conceptsData);
  const {user} = useSelector((res: UserData) => res.userData)
  const {name} = useSelector((res: LanguageData) => res.languageData.selectedLanguage);
  const { selectedTopic } = useSelector((res:TopicsState) => res.topicsData);
  const {isDark, toggleTheme} = useTheme();
  const {push} = useRouter();
  const dispatch = useDispatch();

  const selectLanguageDropdown = (val: string) => {
    setLanguageOption(val);
    setLanguageDropdown(false);
  }

  useEffect(() => {
    if (name) {
      setLanguageOption(name);
    }
    if (isDark !== null) {
      setDarkMode(isDark);
    }
  }, [name, concepts, isDark])

  useEffect(() => {
    if (mobileNav || languageDropdown) {
      const body = document.getElementById('iron-code-body');
      if (body) body.classList.add('modal-open')
    } else {
      const body = document.getElementById('iron-code-body');
      if (body) body.classList.remove('modal-open')
    }
  }, [mobileNav, languageDropdown])

  const renderData = (category: string) => {
    return (
      <>
        {
          (concepts as ConceptTopic[])?.filter(topic => topic.category === category).map((topic) => (
            <>
              {
                topic.id === selectedTopic ? 
                <Link
                  id={`${topic.id}_nav`}
                  key={topic.id}
                  onClick={() =>  {
                    setMobileNav(false);
                  
                  }}
                  href={`/topic/${topic.id}`}
                  className={`nav-link ${darkMode ? 'dark': ''} active`}
                >
                  {topic.name}
                </Link>:
                <Link
                  id={`${topic.id}_nav`}
                  key={topic.id}
                  onClick={() =>  {
                    setMobileNav(false);
                  }}
                  href={`/topic/${topic.id}`}
                  className={`nav-link ${darkMode ? 'dark': ''}`}
                >
                  {topic.name}
                </Link>
              }
            </>
          ))
        }
      </>
    )
  }
  

  return (
    <div className={`navbar-background ${darkMode ? 'dark': ''}`} >
    <section className={`navbar-container ${darkMode ? 'dark': ''}`}>
        <ul>
          <li className='app-icons desktop-items'>
            <Link href='/'>
              {/*
              <FontAwesomeIcon
                icon={faWeightHanging}
                tabIndex={0}
                aria-label='home-icon'
              />
              */}
              <Image src={iron} alt='app-icon' />
            </Link>
          </li>
          <li className='app-icons desktop-items'>
            <Link href='/'>
              <h2>IronCodeMan</h2>
            </Link>
          </li>
          <li className={`app-mobile ${darkMode ? 'dark': ''}`}>
            <button onClick={() =>  setMobileNav(!mobileNav)} className={`navbar-icons ${darkMode ? 'dark': ''}`}>
              <FontAwesomeIcon
                icon={faBars}
                tabIndex={0}
                aria-label='nav-icon'
              />
            </button>
          </li>
          <li>
            {
              /*
            <input />
          */  
          }
          </li>
        </ul>
        <ul>
          <li className='app-icons'>
            {
              isDark ?
              <button
                onClick={() => toggleTheme()}
                className={`navbar-icons ${darkMode ? 'dark': ''}`}
              >
                <FontAwesomeIcon
                  icon={faMoon}
                  tabIndex={0}
                  aria-label='dark mode button'
                  style={{ color: '#00AAFF'}}
                />
              </button>:
              <button
                onClick={() => toggleTheme()}
                className={`navbar-icons ${darkMode ? 'dark': ''}`}
              >
                <FontAwesomeIcon
                  icon={faSun}
                  tabIndex={0}
                  aria-label='light mode icon'
                  style={{ color: '#EAC117'}}
                />
              </button>
            }
          </li>
          <li className={`navbar-dropdown list-right ${darkMode ? 'dark': ''}`}>
            <button type='button' onClick={() => setLanguageDropdown(!languageDropdown)} className='menu-tabs'>
              {languageId ? languageOption : `Select`} {languageDropdown ? <>▲</> : <>▼</>}
            </button>
          </li>
          <li  className='app-icons'>
            {
              user?.username ? 
              <ProfileDropdown userData={user} />:
              <></>
            }
            </li>
        </ul>
        {
          mobileNav ?
          <section className={`nav-topic-menu ${darkMode ? 'dark': ''}`}>
            <article className='home-grouping'>
              <div>
                <button onClick={() =>  push('/')}>
                  <FontAwesomeIcon
                    icon={faHome}
                    aria-label='nav-icon'
                  />
                </button>
                <Link className='home-nav-btn' onClick={() => setMobileNav(false)} href='/'><h3>Home</h3></Link>
              </div>
              <button className='align-right close-btn' onClick={() => {
                setLanguageDropdown(false);
                setMobileNav(false);
              }}>
                <FontAwesomeIcon
                  icon={faClose}
                  aria-label='nav-icon'
                />
              </button>
            </article>
            <h4>Basics</h4>
            {renderData('basic')}
            <h4>Data Structure</h4>
            {renderData('data')}
            <h4>Iterables</h4>
            {renderData('iterables')}
            <h4>Classes</h4>
            {renderData('class')}
            <h4>Regex</h4>
            {renderData('regex')}
          </section>:
          <></>
        }
        {
          languageDropdown || mobileNav? 
          <div className='silent-modal' onClick={() => {
            setLanguageDropdown(false);
            setMobileNav(false);
          }}></div>:
          <></>
        }
        {
          languageDropdown ?
          <section className={`language-select-dropdown ${darkMode ? 'dark': ''}`}>
              <button onClick={() => {
                setLanguageDropdown(false);
                setMobileNav(false);
              }}>
                <FontAwesomeIcon
                  icon={faClose}
                  aria-label='nav-icon'
                />
              </button>
            <h4>Select Language</h4>
            {(languages as Language[]).map((entry) => (
              <Link 
                key={entry.id}
                href={`/language/${entry.id}`}
                onClick={() => {
                  selectLanguageDropdown(entry.name)
                  dispatch(setTopicSelection(''))
                }}
                className={`list-btn`}
              >
                {entry.name}
              </Link>
            ))}
          </section>:
          <></>
        }
    </section>
    </div>
  )
}
