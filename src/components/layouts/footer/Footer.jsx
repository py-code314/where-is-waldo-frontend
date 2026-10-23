/* -------------------- Styles -------------------- */
import styles from '../footer/Footer.module.css'

/* Component to show footer */
const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        {/* Footer list */}

        <ul className={styles.footerList}>
          <div className={styles.footerItems}>
            <li className={styles.footerItem}>Help</li>
            <li className={styles.footerItem}>FAQ</li>
          </div>
          <div className={styles.footerItems}>
            <li className={styles.footerItem}>About</li>
            <li className={styles.footerItem}>Contact</li>
          </div>
          <div className={styles.footerItems}>
            <li className={styles.footerItem}>Privacy</li>
            <li className={styles.footerItem}>Disclaimer</li>
          </div>
        </ul>

        {/* Divider  */}
        <hr />

        <p className={styles.copyright}>
          <span>&copy; 2026 whereiswaldo.com. </span>
          <span>All rights reserved.</span>
        </p>
      </footer>
    </>
  )
}

export default Footer
