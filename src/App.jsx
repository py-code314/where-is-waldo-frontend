/* -------------------- Styles -------------------- */
import styles from './App.module.css'
/* -------------------- Hooks -------------------- */
import { useState, useEffect, useRef } from 'react'
/* -------------------- Context -------------------- */
import { ModalContext } from './contexts/modal/ModalContext'
/* -------------------- Components -------------------- */
import { Outlet } from 'react-router'
import Header from './components/layouts/header/Header'
import Footer from './components/layouts/footer/Footer'
import GameCompleteModal from './components/modals/game/GameCompleteModal'

function App() {
  const [showModal, setShowModal] = useState(false)
  // console.log('🚀 ~ App ~ showModal:', showModal)
  const modalRef = useRef(null)

  // Show and close modal
  useEffect(() => {
    const modal = modalRef.current
    if (!modal) return

    if (showModal) {
      modal.showModal()
    } else {
      modal.close()
    }
  }, [showModal])
  return (
    <>
      <div className={styles.app}>
        <Header />

        <ModalContext value={{ setShowModal }}>
          {' '}
          <Outlet />
        </ModalContext>

        <Footer />
      </div>

      <ModalContext value={{ setShowModal }}>
        {/* Game over modal  */}
        <GameCompleteModal modalRef={modalRef} />
      </ModalContext>
    </>
  )
}

export default App
