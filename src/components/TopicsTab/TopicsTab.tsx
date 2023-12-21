'use client';
import React, { useEffect, useState } from 'react';
import './TopicsTab.scss';
import { ConceptItem, ConceptTopic } from '@/types';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import useConceptTopics from '@/hooks/conceptTopicHooks';
import { setConcepts } from '@/Redux/Features/ConceptItemSlice';
import { useTheme } from '@/themes/ThemeContext';

interface TopicsState {
  topicsData : {
    selectedTopic: string,
  }
}

export default function TopicsTab({
  languageId,
  defaultMode
}: {
  languageId: string,
  defaultMode ?: boolean,
}) {
  const [topics] = useConceptTopics();
  const [topicId, setTopicId] = useState<string>('');
  const { selectedTopic } = useSelector((res:TopicsState) => res.topicsData);
  const [darkMode, setDarkMode] = useState<boolean>();
  const dispatch = useDispatch();
  const {isDark} = useTheme();

  useEffect(() => {
    if (topics?.length) {
      dispatch(setConcepts(topics as ConceptTopic[]));
    }
    if (selectedTopic) {
      // console.log(selectedTopic);
      setTopicId(selectedTopic);
    }
    if (languageId) {
      setTopicId('');
    }
    if(isDark !== null) {
      setDarkMode(isDark);
    }
    if (defaultMode) {
      setTopicId('');
    }
  }, [selectedTopic, topics, dispatch, languageId, isDark, defaultMode])


  const renderData = (category: string) => {
    return (
      <>
      {
        (topics as ConceptTopic[]).filter(topic => topic.category === category).map((topic) => (
          <section key={topic.id}>
            {
              topic.id === topicId ?
              <Link
                key={`topic_${topic.id}`}
                href={`/topic/${topic.id}`}
                className={`active-tab ${darkMode ? 'dark': ''}`}
              >
                {topic.name}
              </Link>:
              <Link
                key={`topic_${topic.id}`}
                href={`/topic/${topic.id}`}
              >
                {topic.name}
              </Link>
            }
          </section>
        ))
      }
      </>
    )
  };

  return (
    <section
      id='topic-tab'
      className={`topics-container near-white ${darkMode ? 'dark': ''}`}
    >
      <h4>Basics</h4>
      {
        topics.length ? 
        <>
          {renderData('basic')}
        </>:
        <></>
      }
      <h4>Data Structure</h4>
      {
        topics.length ? 
        <>
          {renderData('data')}
        </>:
        <></>
      }
      <h4>Iterable</h4>
      {
        topics.length ? 
        <>
          {renderData('iterables')}
        </>:
        <></>
      }
      <h4>Classes</h4>
      {
        topics.length ? 
        <>
          {renderData('class')}
        </>:
        <></>
      }
      <h4>Regex</h4>
      {
        topics.length ? 
        <>
          {renderData('regex')}
        </>:
        <></>
      }
    </section>
  )
}
