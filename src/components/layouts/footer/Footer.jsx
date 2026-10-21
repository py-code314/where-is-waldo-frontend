/* -------------------- Styles -------------------- */
import styles from '../footer/Footer.module.css'

/* Component to show footer */
const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        {/* Footer list */}
        <ul className={styles.footerList}>
          <li className={styles.footerItem}>Help</li>
          <li className={styles.footerItem}>FAQ</li>
          <li className={styles.footerItem}>About</li>
          <li className={styles.footerItem}>Contact</li>
          <li className={styles.footerItem}>Privacy</li>
          <li className={styles.footerItem}>Disclaimer</li>
        </ul>
        <hr />
        <p>&copy; 2026 WhereIsWaldo.com. All rights reserved.</p>
      </footer>
      
      
    </>
  )
}

export default Footer
