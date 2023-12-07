import React, { useState } from 'react'
import './Modal.scss';
export default function Modal({
  children,
  isOpen,
}: {
  children: React.ReactNode,
  isOpen: boolean,
}) {
  return (
    <>
      {
        isOpen ? 
        <section className='modal-container'>{children}</section>:
        <></>
      }
      {
        isOpen ? 
        <div className='silent-modal silent-modal-dark'></div>:
        <></>
      }
    </>
  )
}
