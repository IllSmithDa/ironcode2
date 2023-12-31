'use client';
import { axiosFetch } from '@/axios';
import useConceptTopics from '@/hooks/conceptTopicHooks';
import { ConceptTopic } from '@/types';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import './Admin.scss';
import Modal from '../../components/Modal/Modal';

export default function DeleteTopics({
  selectedTopic,
  modalOpen,
  setModalState,
  updateEditList,
}: {
  selectedTopic: ConceptTopic,
  modalOpen: boolean,
  setModalState: (modalstate:boolean) => void,
  updateEditList: (newList: ConceptTopic[]) => void,
}) {
  const [topics] = useConceptTopics();
  const [err, setErr] = useState<string>('');

  const deleteTopic = async () => {
    try {
      const updatedTopics = (topics as ConceptTopic []).filter((topic) => topic.id !== selectedTopic?.id);
      updateEditList([...updatedTopics]);
      const url = `/api/concept/delete-topic/${selectedTopic?.id}`;
      await axiosFetch.delete(url);
      setModalState(false);
    }catch(err) {
      setErr('Error: Could not delete topic')
    }
  }
  

  return (
    <section className='del-topics-cont'>
      <Modal isOpen={modalOpen}>
        <section className='topic-delete-modal'>
          <FontAwesomeIcon icon={faClose} onClick={() => setModalState(false)} />
          <h4>Do you want to delete this topic: {selectedTopic?.name}? </h4>
          {
            err ? 
            <p className='error-txt'>{err}</p>:
            <></>
          }
          <section className='btn-group'>
            <button onClick={() => setModalState(false)} className='std-button std-button-short'>
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
