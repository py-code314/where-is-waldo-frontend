/* -------------------- Styles -------------------- */
import styles from './SceneSelection.module.css'
/* -------------------- Loaders -------------------- */
import bouncingCircles from '../../../assets/loaders/bouncing-circles.svg'
/* -------------------- Hooks -------------------- */
import { useFetchData } from '../../../hooks/useFetchData'
/* -------------------- Components -------------------- */
import ScenePreview from '../../core/scene/ScenePreview'
import Loader from '../../core/loader/Loader'
import ErrorMessage from '../../core/error/ErrorMessage'

/* Display a list of scenes */
const LevelSelection = () => {
  // Configure API
  const baseURL = import.meta.env.VITE_REACT_APP_API_URL
  const apiEndpoint = `${baseURL}/scenes`

  // Get scenes data
  let { data, isLoading, error } = useFetchData(apiEndpoint)
  // data.scenes = []

  return (
    <>
      <section className={styles.levels}>
        <h2 className={styles.sectionTitle}>Choose Your Where&apos;s Wally Level</h2>
        <p className={styles.description}>
          Pick a scene and start your Where&apos;s Wally game challenge. Each level
          has a unique puzzle, different difficulty, and hidden characters
          waiting to be found.
        </p>
        {/* Show loading spinner while fetching the data */}
        {isLoading && (
          <Loader
            className="loader"
            imgClassName="bouncingCircles"
            src={bouncingCircles}
            width={70}
            height={70}
          />
        )}

        {/* Show error message if data fetch fails */}
        {error && <ErrorMessage error={error} />}

        {/* Cards list  */}
        <div className={styles.cardsContainer}>
          {data && data.scenes.length > 0 ? (
            <ul className={styles.cards}>
              {data.scenes.map((scene) => (
                <li key={scene.id} className={styles.card}>
                  <ScenePreview cardData={scene} />
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.note}>
              <span>❗</span> It looks like there are no games available to play
              yet. Try again later.
            </p>
          )}
        </div>
      </section>
    </>
  )
}

export default LevelSelection
