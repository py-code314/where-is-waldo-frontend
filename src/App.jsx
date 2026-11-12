/* -------------------- Styles -------------------- */
import styles from './App.module.css'
/* -------------------- Hooks -------------------- */
import { useState, useEffect, useRef } from 'react'
/* -------------------- Context -------------------- */
import { ModalContext } from './contexts/modal/ModalContext'
import { DurationContext } from './contexts/stopwatch/DurationContext'
/* -------------------- Components -------------------- */
import { Outlet } from 'react-router'
import Header from './components/layouts/header/Header'
import Footer from './components/layouts/footer/Footer'
import GameCompleteModal from './components/modals/game/GameCompleteModal'

function App() {
  const [showModal, setShowModal] = useState(false)
  const [duration, setDuration] = useState(0)
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
          <DurationContext value={{ setDuration }}>
            <Outlet />
          </DurationContext>
        </ModalContext>

        <Footer />
      </div>

      <ModalContext value={{ setShowModal }}>
        <DurationContext value={{ duration }}>
          {/* Game over modal  */}
          <GameCompleteModal modalRef={modalRef} />
        </DurationContext>
      </ModalContext>
    </>
  )
}

export default App
