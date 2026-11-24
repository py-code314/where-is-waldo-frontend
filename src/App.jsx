/* -------------------- Styles -------------------- */
import styles from './App.module.css'
/* -------------------- Hooks -------------------- */
import { useState, useEffect, useRef } from 'react'
/* -------------------- Context -------------------- */
import { ResultContext } from './contexts/game-scene/ResultContext'
/* -------------------- Components -------------------- */
import { Outlet } from 'react-router'
import Header from './components/layouts/header/Header'
import Footer from './components/layouts/footer/Footer'
import GameCompleteModal from './components/modals/game/GameCompleteModal'

function App() {
  /* Result gets updated after every character option click
  inside 'GameScene' */
  const [result, setResult] = useState({
    isMatch: false,
    characterId: 0,
    characterName: '',
    foundCharacters: [],
    isGameOver: false,
    duration: 0,
  })
  // console.log('🚀 ~ App ~ result:', result)
  const modalRef = useRef(null)

  // Show and close modal based on result from backend
  useEffect(() => {
    const modal = modalRef.current
    if (!modal) return

    if (result.isGameOver) {
      modal.showModal()
    } else {
      modal.close()
    }
  }, [result.isGameOver])

  return (
    <>
      <div className={styles.app}>
        <Header />

        <ResultContext value={{ result, setResult }}>
          <Outlet />
        </ResultContext>

        <Footer />
      </div>

      <ResultContext value={{ result }}>
        {/* Game over modal  */}
        <GameCompleteModal modalRef={modalRef} />
      </ResultContext>
    </>
  )
}

export default App
