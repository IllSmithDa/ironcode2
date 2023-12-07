'use client';
import { axiosFetch } from '@/axios';
import useConceptTopics from '@/hooks/conceptTopicHooks';
import { ConceptTopic } from '@/types';
import React, { useEffect, useState, useRef, useImperativeHandle } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faWrench } from '@fortawesome/free-solid-svg-icons/faWrench';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import './Admin.scss';
import Modal from '../../components/Modal/Modal';
import DeleteTopics from './DeleteTopics';

export default function EditTopics() {
  const [topics] = useConceptTopics();
  const [currentTopic, setCurrentTopic] = useState<ConceptTopic>();
  const [editList, setEditList] = useState<ConceptTopic []>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [editName, setEditName] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [err, setErr] = useState<string>();

  useEffect(() => {
    if (topics.length) {
      setEditList(topics as ConceptTopic []);
    }
  }, [topics])

  const updateModalState = (state: boolean) => {
    setDelModalOpen(state);
  }
  const updateEditList = (list: ConceptTopic[]) => {
    setEditList([...list])
  }

  const editTopic = async () => {
    try {
      if (editName === '' || editName === null || editName === undefined) {
        setErr('Error: Name cannot be blank!');
        return;
      }
      const updatedTopics = (topics as ConceptTopic []).map((topic) => {
        if (topic.id === currentTopic?.id) {
          return {
            ...topic,
            name: editName,
            description: editDescription,
          };
        } else {
          return topic
        }
      });
      setEditList([...updatedTopics]);
      const data = {
        name: editName,
        description: editDescription,
        topicId: currentTopic?.id,
      }
      const url = `/api/concept/update-topic`;
      await axiosFetch.put(url, data);
      setErr('');
      setEditModalOpen(false);
    }catch(err) {
      setErr('Error: cannot connect to server. Contact adminstrator for additional support.')
    }
  }
  
  const renderTopics = (editList as ConceptTopic []).map((topic) => (
    <section className='card-item' key={topic.id}>
      <FontAwesomeIcon icon={faTrashCan} onClick={() =>  {
        setDelModalOpen(true);
        setCurrentTopic(topic)
      }}/>
      <FontAwesomeIcon icon={faWrench} onClick={() =>  {
        setEditModalOpen(true);
        setCurrentTopic(topic)
        setEditName(topic.name);
        setEditDescription(topic.description);
      }}/>
      <h4>{topic.name}</h4>
      <p>{topic.description}</p>
    </section>
  ))

  return (
    <section className='edit-topics-cont form-container'>
      <ul>
        {renderTopics}
      </ul>
      <Modal isOpen={editModalOpen}>
        <section className='topic-delete-modal'>
          <FontAwesomeIcon icon={faClose} onClick={() => {
            setEditModalOpen(false);
            setErr('');
          }} />
          <h4>Edit topic: {currentTopic?.name} </h4>
          <section className='form-group'>
            <label>Edit Name (optional)</label>
            <input
              value={editName}
              type='text'
              onChange={(e) => setEditName(e.target.value)}
              placeholder={`Edit Name of ${currentTopic?.name}`}
            />
          </section>
          <section className='form-group'>
            <label>Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder={`Edit Description of ${currentTopic?.name}`}
              />   
          </section>
          {
            err ? 
            <p className='error-txt'>{err}</p>:
            <></>
          }
          <section className='btn-group'>
            <button
              onClick={() => {
                setEditModalOpen(false)
                setErr('');
              }} 
              className='std-button std-button-short'
            >
              Cancel
            </button>
            <button onClick={() => editTopic()} className='std-button std-button-short'>
              Submit
            </button>
          </section>
        </section>
      </Modal>
      <DeleteTopics
        selectedTopic={currentTopic as ConceptTopic}
        modalOpen={delModalOpen}
        setModalState={updateModalState}
        updateEditList={updateEditList}
      />
    </section>
  )
}
