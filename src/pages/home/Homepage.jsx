/* -------------------- Styles -------------------- */
import styles from './Homepage.module.css'
/* -------------------- Components -------------------- */
import { Outlet } from 'react-router'

/* Component to display homepage */
const Homepage = () => {
  return (
    <>
      <div className={styles.home}>
        {/* <Header /> */}
        <Outlet />
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default Homepage
