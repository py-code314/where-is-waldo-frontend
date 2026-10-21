/* -------------------- Styles -------------------- */
import './App.module.css'
/* -------------------- Components -------------------- */
import { Outlet } from 'react-router'
import Header from './components/layouts/header/Header'
import Footer from './components/layouts/footer/Footer'

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
