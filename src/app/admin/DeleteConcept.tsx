'use client';
import { axiosFetch } from '@/axios';
import useConceptTopics from '@/hooks/conceptTopicHooks';
import { ConceptItem, ConceptTopic } from '@/types';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import './Admin.scss';
import Modal from '../../components/Modal/Modal';

export default function DeleteConcept({
  selectedConcept,
  setModalState,
  delConceptItem,
  isModalOpen
}: {
  selectedConcept: ConceptItem,
  setModalState: (modalstate:boolean) => void,
  delConceptItem: (concept: ConceptItem) => void,
  isModalOpen: boolean
}) {
  const [err, setErr] = useState<string>('');

  const deleteTopic = async () => {
    try {
      delConceptItem(selectedConcept);
      const url = `/api/concept/delete-id/${selectedConcept?.id}`;
      await axiosFetch.delete(url);
      setModalState(false);
    }catch(err) {
      setErr('Error: Could not delete topic')
    }
  }
  

  return (
    <section className='del-topics-cont'>
      <Modal isOpen={isModalOpen}>
        <section className='topic-delete-modal'>
          <FontAwesomeIcon icon={faClose} onClick={() => setModalState(false)} />
          <h4>Do you want to delete this concept from {selectedConcept.language}: {selectedConcept?.concept_name}? </h4>
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
