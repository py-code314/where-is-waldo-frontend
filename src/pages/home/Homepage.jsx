/* -------------------- Styles -------------------- */
import styles from './Homepage.module.css'
/* -------------------- Components -------------------- */
import { Outlet } from 'react-router'

/* Component to display homepage */
const Homepage = () => {
  return (
    <>
      <div className={styles.home}>
        <div className={styles.main}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Homepage
