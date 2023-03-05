/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import stylesModalWr from './Modal.module.css'

function ModalInner({ children, closeHandler }) {
  useEffect(() => {
    const closeModalByEscape = (e) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    }
    document.addEventListener('keydown', closeModalByEscape)

    return () => {
      document.removeEventListener('keydown', closeModalByEscape)
    }
  }, [])

  return (
    <div className={stylesModalWr.modalstyle}>
      {children}
    </div>
  )
}
export function Modal({ isOpen, closeHandler, children }) {
  if (!isOpen) return null

  const closeModalByClickWrapper = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  return createPortal(
    <div className={stylesModalWr.modalWr} onClick={closeModalByClickWrapper}>
      <ModalInner closeHandler={closeHandler}>
        {children}
      </ModalInner>
    </div>,
    document.getElementById('modal-root'),
  )
}
