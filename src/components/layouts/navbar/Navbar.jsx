/* -------------------- Styles -------------------- */
import styles from './Navbar.module.css'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'

/* Component for navigation links */
const Navbar = () => {
  return (
    <>
      <nav className={styles.navbar}>
        {/* Navigation links */}
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            {/* Home link  */}
            <Link className={styles.link} to={`/home`}>
              Where's Waldo
            </Link>
          </li>
          {/* Inactive links  */}
          <li className={styles.navItem}>
            <span className={styles.placeholderLink}>Levels</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.placeholderLink}>Leaderboard</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.placeholderLink}>How to Play</span>
          </li>
          <li className={styles.navItem}>
            <span className={styles.placeholderLink}>Characters</span>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
