/* -------------------- Styles -------------------- */
import styles from './DefaultMainLayout.module.css'
/* -------------------- Components -------------------- */
import Hero from '../../sections/hero/Hero'

/* Content to show upon initial page load */
const DefaultMainLayout = () => {
  return (
    <>
      <div className={styles.defaultLayout}>
        <Hero />
      </div>
    </>
  )
}

export default DefaultMainLayout
