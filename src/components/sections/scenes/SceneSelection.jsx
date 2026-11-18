/* -------------------- Styles -------------------- */
import styles from './SceneSelection.module.css'
/* -------------------- Loaders -------------------- */
import bouncingCircles from '../../../assets/loaders/bouncing-circles.svg'
/* -------------------- Hooks -------------------- */
import { useFetchData } from '../../../hooks/useFetchData'
/* -------------------- Components -------------------- */
import ScenePreview from '../../core/scene/ScenePreview'
import ErrorMessage from '../../core/error/ErrorMessage'

/* Display a list of scenes */
const LevelSelection = () => {
  // Configure API
  const baseURL = import.meta.env.VITE_REACT_APP_API_URL
  const apiEndpoint = `${baseURL}/scenes`

  // Get scenes data
  let { data, isLoading, error } = useFetchData(apiEndpoint)
  console.log('🚀 ~ LevelSelection ~ error:', error)
  // console.log("🚀 ~ LevelSelection ~ data:", data)

  return (
    <>
      <section className={styles.levels}>
        <h2 className={styles.sectionTitle}>Choose Your Where's Wally Level</h2>
        <p className={styles.description}>
          Pick a scene and start your Where's Wally game challenge. Each level
          has a unique puzzle, different difficulty, and hidden characters
          waiting to be found.
        </p>
        {/* Show loading spinner while fetching the data */}
        {isLoading && (
          <div className={styles.loader}>
            <img
              className={styles.bouncingCircles}
              src={bouncingCircles}
              alt=""
              width={70}
              height={70}
            />
          </div>
        )}

        {/* Show error message if data fetch fails */}
        {error && <ErrorMessage error={error} />}

        {/* Cards list  */}
        {data && (
          <ul className={styles.cards}>
            {data.scenes.map((scene) => (
              <li key={scene.id} className={styles.card}>
                <ScenePreview cardData={scene} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}

export default LevelSelection
