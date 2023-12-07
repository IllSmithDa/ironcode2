'use client';
import React, {useState} from 'react'
import { dummyData } from '../../data/dummytest'
import './PrintText.scss'

interface Language {
  language: string,
  checked: boolean,
  text: string,
  concept: string
}

export default function JavaScript() {
  const [languages, setLanguages] = useState(dummyData.map((data) => {
    return {
      language: data.language,
      concept: data.concept,
      text: data.text,
      checked: true,
    }
  }
))
const updateLanguages = (updateedData: Language[]) => {
  setLanguages([...updateedData])
}
  const renderData = languages.map((data) => (
    <>
      {
        data.checked ? 
        <article className='card' key={data.language}>
        <h4>{data.language}</h4>
        <pre>{data.text}</pre>
      </article>:
      <></>
      }
    </>
  ))

  return (
    <main className='code-page'>
      <section className='code-container'>
        <h3>Printing Text in Various Languages</h3>
        <section
          className='item-container'
        >
          {renderData}
        </section>         
      </section>
    </main>
  )
}
