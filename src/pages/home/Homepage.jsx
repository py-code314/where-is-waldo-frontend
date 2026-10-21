/* -------------------- Styles -------------------- */
import styles from './Homepage.module.css'
/* -------------------- Components -------------------- */
import { Outlet } from 'react-router'
import Header from '../../components/layouts/header/Header'
// import Footer from '../../components/layouts/footer/Footer'

/* Component to display homepage */
const Homepage = () => {
  return (
    <>
      <div className={styles.home}>
        <Header />
        <Outlet />
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default Homepage
