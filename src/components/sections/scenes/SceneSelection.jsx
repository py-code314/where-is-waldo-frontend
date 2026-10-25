/* -------------------- Styles -------------------- */
import styles from './SceneSelection.module.css'
/* -------------------- Components -------------------- */
import ScenePreview from '../../core/scene/ScenePreview'
/* -------------------- Functions -------------------- */
import { scenesData } from '../../../data/scenesData'

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
          {scenesData.map((scene) => (
            <li key={scene.id} className={styles.card}>
              <ScenePreview cardData={scene} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default LevelSelection
