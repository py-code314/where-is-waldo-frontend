/* -------------------- Styles -------------------- */
import styles from './LevelSelection.module.css'

/* Display images with different levels */
const LevelSelection = () => {
  return (
    <>
      <section className={styles.levels}>
        <div className={styles.headerContainer}>
          <h2 className={styles.sectionTitle}>Choose Your Where's Waldo Level</h2>
          <p className={styles.description}>
            Pick a scene and start your Where's Waldo game challenge. Each level has a unique puzzle, different difficulty, and hidden characters waiting to be found.
          </p>
        </div>
      </section>
    </>
  )
}

export default LevelSelection
