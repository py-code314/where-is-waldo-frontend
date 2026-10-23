/* -------------------- Styles -------------------- */
import styles from './Navbar.module.css'
/* -------------------- Icons -------------------- */
import menuIcon from '../../../assets/icons/icon-menu.svg'
/* -------------------- Hooks -------------------- */
import { useState } from 'react'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import Button from '../../core/button/Button'

/* Component for navigation links */
const Navbar = () => {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Opens and closes menu on button click and press of 'Enter' and 'Space bar' buttons
  const handleClick = () => {
    setIsMenuOpen((prev) => !prev) // Toggle state
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      <nav className={styles.navbar}>
        {/* No need for 'onKeyDown' event handler to open menu because browser fires 'click' event when 'Enter' or 'Space bar' buttons are pressed while 'toggle menu' button is focused. Also, no need to check for 'e.key' as browser generates 'click' event only for those two keys */}
        {/* Add 'onKeyDown' for 'Esc' key as pressing it doesn't fire 'click' event  */}
        <Button
          className="menuToggleBtn"
          title="Toggle menu"
          onClick={() => handleClick()}
          onKeyDown={(e) => handleKeyDown(e)}
          ariaLabel="Toggle navigation menu"
          ariaExpanded={isMenuOpen}>
          <img src={menuIcon} alt="" width={40} height={40} />
        </Button>

        {/* Navigation links */}
        {/* Add 'open' class when the 'toggle menu' button is clicked */}
        <ul
          className={`${styles.navList}  ${isMenuOpen ? styles.open : styles.menu}`}>
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
