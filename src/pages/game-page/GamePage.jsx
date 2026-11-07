/* -------------------- Styles -------------------- */
import styles from './GamePage.module.css'
/* -------------------- Icons -------------------- */
import homeIcon from '../../assets/icons/icon-home-2.svg'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import GameScene from '../../components/sections/game-scene/GameScene'
import StopWatch from '../../components/core/stopwatch/StopWatch'
import CharactersList from '../../components/core/characters/CharactersList'

const GamePage = () => {
  return (
    <>
      <div className={styles.gamePage}>
        <div className={styles.gameHeader}>
          {/* Back to Home link  */}
          <Link
            className={styles.homeLink}
            to={'/home'}
            aria-label="Go to home">
            <div className={styles.homeIconContainer}>
              <img
                src={homeIcon}
                alt=""
                width={30}
                height={30}
                aria-hidden="true"
              />
            </div>
            <span className={styles.homeText}>Home</span>
          </Link>

          {/* Top bar with all Header info  */}
          <div className={styles.gameInfo}>
            {/* Title and instructions  */}
            <div className={styles.sceneInfo}>
              <h2 className={styles.title}>The Ski Slopes of Anarchy</h2>
              <p className={styles.instructions}>
                Find Waldo, Wenda, Odlaw, and Wizard to solve the puzzle.
              </p>
            </div>
            <div className={styles.gameStats}>
              <div className={styles.difficulty}>
                <p className={styles.label}>Difficulty</p>
                <p className={styles.level}>
                  <strong>Easy</strong>
                </p>
              </div>

              {/* Show stopwatch  */}
              <StopWatch />
            </div>
          </div>
        </div>

        {/* Character head shots  */}
        <CharactersList />

        {/* Game image  */}
        <GameScene />
      </div>
    </>
  )
}

export default GamePage
