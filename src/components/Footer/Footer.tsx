'use client';
import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import './Footer.scss';
import { useTheme } from '@/themes/ThemeContext';

export default function Footer() {
  const {isDark} = useTheme();
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (isDark !== null) {
      setDarkMode(isDark);
    }
  }, [isDark])

  return (
    <section className={`footer-container ${darkMode ? 'dark': ''}`}>
      <ul>
        <li>
          <Link href='/about' >
            About
          </Link>
        </li>
        <li>
          <Link href='/terms' >
            Terms
          </Link>
        </li>
        <li>
          <Link href='/privacy'>
            Privacy
          </Link>
        </li>
        <li>
         <Link href='/cookies'>
            Cookies
          </Link>
        </li>
      </ul>
      <p> 
        Copyright
        {' '}
        {new Date().getFullYear()}
        . All Rights Reserved. IronCodeMan.
      </p>
    </section>
  )
}
