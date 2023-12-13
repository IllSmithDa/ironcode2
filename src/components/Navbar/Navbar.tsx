'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose, faHome, faMoon, faRobot, faSun, faUser, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
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
  const [mobileNav, setMobileNav] = useState(false);
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
    <Link
      key={topic.id}
      onClick={() =>  setMobileNav(false)}
      href={`/topic/${topic.id}`}
      className={`nav-link  ${darkMode ? 'dark': ''}`}
    >
      {topic.name}
    </Link>
  ))
  

  return (
    <section className={`navbar-container ${darkMode ? 'dark': ''}`}>
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
          <li className={`app-mobile ${darkMode ? 'dark': ''}`}>
            <button onClick={() =>  setMobileNav(!mobileNav)}>
              <FontAwesomeIcon
                icon={faBars}
                tabIndex={0}
                aria-label='nav-icon'
              />
            </button>
            {
              mobileNav ?
              <section>
                <article className='home-grouping'>
                  <div>
                    <button onClick={() =>  setMobileNav(!mobileNav)}>
                      <FontAwesomeIcon
                        icon={faHome}
                        aria-label='nav-icon'
                      />
                    </button>
                    <Link className='home-nav-btn' onClick={() => setMobileNav(false)} href='/'><h3>Home</h3></Link>
                  </div>
                  <button className='align-right' onClick={() => {
                    setLanguageDropdown(false);
                    setMobileNav(false);
                  }}>
                    <FontAwesomeIcon
                      icon={faClose}
                      aria-label='nav-icon'
                    />
                  </button>
                </article>
                <h4>Topics</h4>
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
              <button
                onClick={() => toggleTheme()}
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
              {languageId ? languageOption : `Select`} {languageDropdown ? <>&#11205;</> : <>&#11206;</>}
            </button>
            {
              languageDropdown ?
              <section>
                {(languages as Language[]).map((entry) => (
                  <Link key={entry.id} href={`/language/${entry.id}`}onClick={() => selectLanguageDropdown(entry.name)} className='list-btn'>
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
          languageDropdown || mobileNav? 
          <div className='silent-modal' onClick={() => {
            setLanguageDropdown(false);
            setMobileNav(false);
          }}></div>:
          <></>
        }
      </section>
    </section>
  )
}
