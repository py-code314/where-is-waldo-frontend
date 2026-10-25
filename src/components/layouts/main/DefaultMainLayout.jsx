/* -------------------- Styles -------------------- */
import styles from './DefaultMainLayout.module.css'
/* -------------------- Components -------------------- */
import Hero from '../../sections/hero/Hero'
import SceneSelection from '../../sections/scenes/SceneSelection'

/* Content to show upon initial page load */
const DefaultMainLayout = () => {
  return (
    <>
      <div className={styles.defaultLayout}>
        <Hero />
        <SceneSelection/>
      </div>
    </>
  )
}

export default DefaultMainLayout
