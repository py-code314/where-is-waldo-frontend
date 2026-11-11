import { createContext } from 'react'

/* Context to show game over modal */
export const ModalContext = createContext({
  showModal: false,
  setShowModal: () => {},
})
