/* -------------------- Styles -------------------- */
import styles from './SceneSelection.module.css'
/* -------------------- Loaders -------------------- */
import bouncingCircles from '../../../assets/loaders/bouncing-circles.svg'
/* -------------------- Components -------------------- */
import ScenePreview from '../../core/scene/ScenePreview'
/* -------------------- Hooks -------------------- */
import { useFetchData } from '../../../hooks/useFetchData'

/* Display a list of scenes */
const LevelSelection = () => {
  // Configure API
  const baseURL = import.meta.env.VITE_REACT_APP_API_URL
  const apiEndpoint = `${baseURL}/scenes`

  // Get scenes data
  const { data, isLoading, error } = useFetchData(apiEndpoint)
  // console.log("🚀 ~ LevelSelection ~ data:", data)

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <section className={styles.levels}>
        <h2 className={styles.sectionTitle}>Choose Your Where's Wally Level</h2>
        <p className={styles.description}>
          Pick a scene and start your Where's Wally game challenge. Each level
          has a unique puzzle, different difficulty, and hidden characters
          waiting to be found.
        </p>
        <div className={styles.loader}>
          <img
            className={styles.bouncingCircles}
            src={bouncingCircles}
            alt=""
            width={70}
            height={70}
          />
        </div>
      </section>
    )

  // Show error message if data fetch fails
  if (error)
    return (
      <section className={styles.levels}>
        <h2 className={styles.sectionTitle}>Choose Your Where's Wally Level</h2>
        <p className={styles.description}>
          Pick a scene and start your Where's Wally game challenge. Each level
          has a unique puzzle, different difficulty, and hidden characters
          waiting to be found.
        </p>
        <p>{error}</p>
        {/* <ErrorMessage error={error} /> */}
      </section>
    )
  return (
    <>
      <section className={styles.levels}>
        <h2 className={styles.sectionTitle}>Choose Your Where's Wally Level</h2>
        <p className={styles.description}>
          Pick a scene and start your Where's Wally game challenge. Each level
          has a unique puzzle, different difficulty, and hidden characters
          waiting to be found.
        </p>

        {/* Cards list  */}
        <ul className={styles.cards}>
          {data &&
            data.scenes.map((scene) => (
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
