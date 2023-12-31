'use client';
import { axiosFetch } from '@/axios';
import useConceptTopics from '@/hooks/conceptTopicHooks';
import { ConceptItem, ConceptTopic, Language } from '@/types';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import './Admin.scss';
import Modal from '../../components/Modal/Modal';

export default function DeleteLanguages() {
  const [err, setErr] = useState<string>('');
  const [selected, setSelected] = useState<Language>();
  const [modalOpen, setModalOpen] = useState(false);
  const [languages, setLanguages] = useState<Language []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = `/api/language/all-languages`;

  useEffect(() => {
    // https://blog.logrocket.com/3-ways-implement-infinite-scroll-react/
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosFetch.get(url)
        if (res.status === 200) {
          // console.log(res.data);
          setLanguages([...res.data.data])
        }
      } catch (err) {
        setErr('Error: Could not connect to database. Contact an administrator for additional support.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url]);
  const delLanguage = (language: Language) =>{
    const updatedLanguages = languages.filter((entry) => entry.id !== language.id);
    setLanguages([...updatedLanguages]);
  }

  const deleteTopic = async () => {
    try {
      delLanguage(selected as Language);
      const url = `/api/language/delete-id/${selected?.id}`;
      await axiosFetch.delete(url);
      setModalOpen(false);
    }catch(err) {
      setErr('Error: Could not delete topic')
    }
  }
  const renderLanguages = (languages as Language []).map((entry) => (
    <section className='card-item' key={entry.id}>
      <FontAwesomeIcon icon={faTrashCan} onClick={() =>  {
        setModalOpen(true);
        setSelected(entry)
      }}/>
      <h4>{entry.name}</h4>
      <p>{entry.description}</p>
    </section>
  ))

  return (
    <section className='del-topics-cont'>
      <section className='form-container'>
        {renderLanguages}
      </section>
      <Modal isOpen={modalOpen}>
        <section className='topic-delete-modal'>
          <FontAwesomeIcon icon={faClose} onClick={() => setModalOpen(false)} />
          <h4>Do you want to delete this language: {selected?.name}</h4>
          {
            err ? 
            <p className='error-txt'>{err}</p>:
            <></>
          }
          <section className='btn-group'>
            <button onClick={() => setModalOpen(false)} className='std-button std-button-short'>
              No
            </button>
            <button onClick={() => deleteTopic()} className='std-button std-button-short'>
              Yes
            </button>
          </section>
        </section>
      </Modal>
    </section>
  )
}
