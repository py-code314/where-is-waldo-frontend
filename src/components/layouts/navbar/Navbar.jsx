/* -------------------- Styles -------------------- */
import styles from './Navbar.module.css'
/* -------------------- Icons -------------------- */
import menuIcon from '../../../assets/icons/icon-menu.svg'
import closeIcon from '../../../assets/icons/icon-close-1.svg'
/* -------------------- Hooks -------------------- */
import { useCallback, useContext } from 'react'
/* -------------------- Context -------------------- */
import { NavbarContext } from '../../../contexts/navbar/NavbarContext'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import Button from '../../core/button/Button'

/* Component for navigation links */
const Navbar = () => {
  const {navbarRef, isMenuOpen, setIsMenuOpen} = useContext(NavbarContext)

  /* Use 'useCallback' to prevent re-renders of the component */
  // Open and close menu on button click and press of 'Enter' and 'Space bar' buttons
  const handleClick = useCallback(() => {
    setIsMenuOpen((prev) => !prev) // Toggle state
  }, [setIsMenuOpen])

  // Close menu on pressing 'Esc' button
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    },
    [setIsMenuOpen, isMenuOpen]
  )

  return (
    <>
      {/* No need for 'onKeyDown' event handler to open menu because browser fires 'click' event when 'Enter' or 'Space bar' buttons are pressed while 'toggle menu' button is focused. Also, no need to check for 'e.key' as browser generates 'click' event only for those two keys */}
      {/* Add 'onKeyDown' for 'Esc' key as pressing it doesn't fire 'click' event  */}
      <div ref={navbarRef} className={styles.navbarContainer}>
        <Button
          className="menuToggleBtn"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          ariaLabel="Main navigation menu"
          ariaExpanded={isMenuOpen}>
          {isMenuOpen ? (
            <img
              className={styles.closeIcon}
              src={closeIcon}
              alt=""
              width={40}
              height={40}
              aria-hidden="true"
            />
          ) : (
            <img
              className={styles.menuIcon}
              src={menuIcon}
              alt=""
              width={40}
              height={40}
              aria-hidden="true"
            />
          )}
        </Button>
        {/* Add 'open' class when the 'toggle menu' button is clicked */}
        <nav
          className={`${styles.navbar}  ${isMenuOpen ? styles.open : styles.hidden}`}
          aria-label="Main navigation menu">
          {/* Navigation links */}
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              {/* Home link  */}
              <Link className={styles.link} to={`/home`} onClick={handleClick}>
                Where&apos;s Wally
              </Link>
            </li>
            {/* Inactive links  */}
            {/* // TODO: Make this a link  */}
            <li className={styles.navItem}>
              <span className={styles.placeholderLink}>Leaderboard</span>
            </li>
            <li className={styles.navItem}>
              <span className={styles.placeholderLink}>How to Play</span>
            </li>
            <li className={styles.navItem}>
              <span className={styles.placeholderLink}>Characters</span>
            </li>
            <li className={styles.navItem}>
              <span className={styles.placeholderLink}>Levels</span>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Navbar
