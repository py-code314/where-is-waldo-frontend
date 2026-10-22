/* -------------------- Styles -------------------- */
import styles from './Header.module.css'
/* -------------------- Images -------------------- */
import wallyImg from '../../../assets/images/wally-waving.png'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import Navbar from '../navbar/Navbar'

/* Component for header */
const Header = () => {
  return (
    <header className={styles.header}>
      <title>Where's Waldo</title>

      <Link to={`/home`} className={styles.link}>
        {/* Logo  */}
        <img src={wallyImg} alt="" width={70} height={50} />
        {/* Title */}
        <h1 className={styles.title}>
          <span className={styles.titlePrefix}>where is</span> <span className={styles.titleMain}>Waldo</span>
          {/* <span className={styles.titlePrefix}>Where Is</span> <span className={styles.titleMain}>Waldo</span> */}
        </h1>
      </Link>

      <Navbar />
    </header>
  )
}

export default Header
