'use client';
import React, {useEffect, useRef, useState} from 'react';
import './Admin.scss';
import ConceptForm from './ConceptForm';
import Loader from '@/components/Loader/Loader';
import NewForm from './NewForm';
import useLanguages from '@/hooks/LanguageHook';
import EditTopics from '@/app/admin/EditTopics';
import ConceptList from './ConceptList';
import DeleteLanguages from './DeleteLanguages';
import { useTheme } from '@/themes/ThemeContext';

export default function Admin() {
  const [selectTab, setSelectTab] = useState<'new'|'edit-concepts'|'edit-topics'|'concept'|'language'|'loading'>('new')
  const [darkMode, setDarkMode] = useState<boolean>();
  const {isDark} = useTheme();

  useEffect(() => {
    if (isDark !== null) {
      setDarkMode(isDark);
    }
  }, [isDark])

  const handleTabChange = (tabVal: 'new'|'edit-concepts'|'edit-topics'|'concept'|'language'|'loading') => {
    const activeTab = `${selectTab}-tab`;
    const oldSelected = document.getElementById(activeTab);
    if (oldSelected) {
      oldSelected.classList.remove('active-tab');
    }
    const newSelected = document.getElementById(`${tabVal}-tab`);
    if (newSelected) newSelected.classList.add('active-tab');
    setSelectTab(tabVal);
  }
  const renderTab = () => {
    if (selectTab === 'concept') {
      return (
        <ConceptForm />
      )
    } else if (selectTab === 'edit-topics') {
      return (
        <EditTopics />
      );
    }  else if (selectTab === 'edit-concepts') {
      return (
        <ConceptList />
      );
    } else if (selectTab === 'new') {
      return (
        <NewForm />
      );
    } else if (selectTab === 'language') {
      return (
        <DeleteLanguages />
      );
    } else {
      return (
        <section className='loader-container'>
          <Loader />
        </section>
      );
    }
  }
  return (
    <section className={`admin-page ${darkMode ? 'dark': ''}`}>
      <h3>Console Center</h3>
      <section className={`menu-container ${darkMode ? 'dark': ''}`}>
        <button
          id='new-tab'
          onClick={() => handleTabChange('new') }
          className='active-tab menu-tabs'
        >
          New
        </button>
        <button
          id='concept-tab'
          className={`menu-tabs ${darkMode ? 'dark': ''}`}
          onClick={() => handleTabChange('concept') }>Concept
        </button>
        <button
          id='edit-topics-tab'
          className={`menu-tabs ${darkMode ? 'dark': ''}`}
          onClick={() => handleTabChange('edit-topics') }>Edit Topics
        </button>
        <button
          id='edit-concepts-tab'
          onClick={() => handleTabChange('edit-concepts') }
          className={`menu-tabs ${darkMode ? 'dark': ''}`}
        >
          Edit Concepts
        </button>
        <button
          id='language-tab'
          onClick={() => handleTabChange('language') }
          className={`menu-tabs ${darkMode ? 'dark': ''}`}
        >
          Languages
        </button>
      </section>
      {renderTab()}
    </section>
  )
}
