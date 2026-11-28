/* -------------------- Styles -------------------- */
import styles from './GameHeader.module.css'
/* -------------------- Icons -------------------- */
import homeIcon from '../../../assets/icons/icon-home.svg'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import StopWatch from '../../../components/core/stopwatch/StopWatch'

const GameHeader = ({ title, characterNames, difficulty }) => {
  /* Intl.ListFormat is a native API which generates a string 
  from an array of strings. Baseline is widely available */
  const names = new Intl.ListFormat('en-GB', {
    style: 'long',
    type: 'conjunction',
  }).format(characterNames)
  const instructions = `Find ${names} to solve the puzzle.`

  return (
    <>
      <div className={styles.gameHeader}>
        {/* Back to Home link  */}
        <Link className={styles.homeLink} to={'/home'} aria-label="Go to home">
          <img
            className={styles.homeIcon}
            src={homeIcon}
            alt=""
            width={30}
            height={30}
            aria-hidden="true"
          />
          <span className={styles.linkText}>Home</span>
        </Link>

        {/* Top bar with all Header info  */}
        <div className={styles.gameInfo}>
          {/* Title and instructions  */}
          {/* Add ids for 'aria-labelledby' */}
          <div className={styles.sceneInfo}>
            <h2 id="title" className={styles.title}>
              {title}
            </h2>
            <p id="instructions" className={styles.instructions}>
              {instructions}
            </p>
          </div>
          <div className={styles.gameStats}>
            <div className={styles.difficulty}>
              <p className={styles.label}>Difficulty</p>
              <p className={styles.level}>
                <strong>{difficulty}</strong>
              </p>
            </div>

            <StopWatch />
          </div>
        </div>
      </div>
    </>
  )
}

export default GameHeader
