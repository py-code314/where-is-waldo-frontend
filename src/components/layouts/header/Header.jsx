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

      <Link to={`/home`}>
        {/* Logo  */}
        <img src={wallyImg} alt="" width={70} height={50} />
        {/* Title */}
        <h1 className={styles.title}>
          <span>Where Is</span> Waldo
        </h1>
      </Link>
      <Navbar />
    </header>
  )
}

export default Header
