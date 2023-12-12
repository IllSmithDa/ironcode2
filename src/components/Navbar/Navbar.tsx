'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMoon, faRobot, faSun, faUser, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import ironcodeman from '@/assets/ironcodeman.webp';
import iron from '@/assets/iron.svg';
import useLanguages from '@/hooks/LanguageHook';
import { ConceptTopic, Language, User } from '@/types';
import { useSelector } from 'react-redux';
import { useTheme } from '@/themes/ThemeContext';
import ProfileDropdown from './ProfileDropdown';

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

export default function Navbar({
  languageId
}: {
  languageId: string
}) {
  const [languages] = useLanguages();
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>();
  const [moobileNav, setModbileNav] = useState(false);
  const [languageOption, setLanguageOption] = useState<string>('Select');
  const {concepts} = useSelector((res: ConceptData) => res.conceptsData);
  const {user} = useSelector((res: UserData) => res.userData)
  const {name} = useSelector((res: LanguageData) => res.languageData.selectedLanguage);
  const {isDark, toggleTheme} = useTheme();

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

  const renderData = (concepts as ConceptTopic[])?.map((topic) => (
    <article key={topic.id} onClick={() => setModbileNav(false)}>
      <Link
        href={`/topic/${topic.id}`}
      >
        {topic.name}
      </Link>
    </article>
  ))
  

  return (
    <section className={`navbar-container color-cloud ${darkMode ? 'dark': ''}`}>
      <section className='navbar-align'>
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
          <li className='app-mobile navbar-dropdown list-left'>
            <FontAwesomeIcon
              icon={faBars}
              tabIndex={0}
              aria-label='home-icon'
              onClick={() =>  setModbileNav(!moobileNav)}
            />
            {
              moobileNav ?
              <section>
                <article onClick={() => setModbileNav(false)}><Link href='/'>Home</Link></article>
                {renderData}
              </section>:
              <></>
            }
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
              <FontAwesomeIcon
                icon={faMoon}
                tabIndex={0}
                aria-label='dark mode button'
                onClick={() => toggleTheme()}
              />:
              <FontAwesomeIcon
                icon={faSun}
                tabIndex={0}
                aria-label='light mode icon'
                style={{ color: '#EAC117'}}
                onClick={() => toggleTheme()}
              />
            }
            </li>
          <li className={`navbar-dropdown list-right ${darkMode ? 'dark': ''}`}>
            <button type='button' onClick={() => setLanguageDropdown(!languageDropdown)} className='menu-tabs'>
              {languageId ? languageOption : `Select`} {languageDropdown ? <>&#11205;</> : <>&#11206;</>}
            </button>
            {
              languageDropdown ?
              <section>
                {(languages as Language[]).map((entry) => (
                  <Link key={entry.id} href={`/language/${entry.id}`}onClick={() => selectLanguageDropdown(entry.name)}         className='list-btn'>
                    {entry.name}
                  </Link>
                ))}
              </section>:
              <></>
            }
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
          languageDropdown || moobileNav? 
          <div className='silent-modal' onClick={() => {
            setLanguageDropdown(false);
            setModbileNav(false);
          }}></div>:
          <></>
        }
      </section>
    </section>
  )
}
