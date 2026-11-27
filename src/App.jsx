/* -------------------- Styles -------------------- */
import styles from './App.module.css'
/* -------------------- Hooks -------------------- */
import { useState, useEffect, useRef } from 'react'
import { useOnClickOutside } from './hooks/useClick'
/* -------------------- Context -------------------- */
import { ResultContext } from './contexts/game-scene/ResultContext'
import { NavbarContext } from './contexts/navbar/NavbarContext'
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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // console.log('🚀 ~ App ~ result:', result)
  // Ref
  const navbarRef = useRef(null)
  const modalRef = useRef(null)

  // Close menu if clicked outside of Navbar
  useOnClickOutside(navbarRef, () => setIsMenuOpen(false))

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
        <NavbarContext value={{ navbarRef, isMenuOpen, setIsMenuOpen }}>
          <Header />
        </NavbarContext>

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
