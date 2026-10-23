/* -------------------- Styles -------------------- */
import styles from './LevelSelection.module.css'
/* -------------------- Components -------------------- */
import ScenePreview from '../../core/scene/ScenePreview'

/* Display images with different levels */
const LevelSelection = () => {
  return (
    <>
      <section className={styles.levels}>
        <h2 className={styles.sectionTitle}>Choose Your Where's Waldo Level</h2>
        <p className={styles.description}>
          Pick a scene and start your Where's Waldo game challenge. Each level
          has a unique puzzle, different difficulty, and hidden characters
          waiting to be found.
        </p>

        {/* Cards list  */}
        <ul className={styles.cards}>
          <ScenePreview />
          <ScenePreview />
          <ScenePreview />
        </ul>
      </section>
    </>
  )
}

export default LevelSelection
