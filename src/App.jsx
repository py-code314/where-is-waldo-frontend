/* -------------------- Styles -------------------- */
import styles from './App.module.css'
/* -------------------- Components -------------------- */
import { Outlet } from 'react-router'
import Header from './components/layouts/header/Header'
import Footer from './components/layouts/footer/Footer'

function App() {
  return (
    <>
      <div className={styles.app}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default App
