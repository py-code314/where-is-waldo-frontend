/* -------------------- Styles -------------------- */
import styles from './GamePage.module.css'
/* -------------------- Icons -------------------- */
import homeIcon from '../../assets/icons/icon-home-2.svg'
/* -------------------- Images -------------------- */
import wallyImage from '../../assets/images/characters/wally.png'
import wendaImage from '../../assets/images/characters/wenda.png'
import wizardImage from '../../assets/images/characters/wizard.png'
import odlawImage from '../../assets/images/characters/odlaw.png'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'
import GameScene from '../../components/sections/game-scene/GameScene'
import StopWatch from '../../components/core/stopwatch/StopWatch'

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
        <div className={styles.charactersContainer}>
          <div className={styles.trackerContainer}>
            <p className={styles.heading}>
              <span className={styles.mobileHidden}>Find</span> characters
            </p>
            <p className={styles.counter}>0/4 Found</p>
          </div>
          <div className={styles.characters}>
            <div className={styles.character}>
              <div className={styles.characterImgContainer}>
                <img
                  className={styles.characterImg}
                  src={wallyImage}
                  alt=""
                  width={50}
                  height={50}
                />
              </div>
              <span className={styles.characterName}>Waldo</span>
            </div>
            <div className={styles.character}>
              <div className={styles.characterImgContainer}>
                <img
                  className={styles.characterImg}
                  src={wendaImage}
                  alt=""
                  width={50}
                  height={50}
                />
              </div>
              <span className={styles.characterName}>Wenda</span>
            </div>
            <div className={styles.character}>
              <div className={styles.characterImgContainer}>
                <img
                  className={styles.characterImg}
                  src={wizardImage}
                  alt=""
                  width={50}
                  height={50}
                />
              </div>
              <span className={styles.characterName}>Wizard</span>
            </div>
            <div className={styles.character}>
              <div className={styles.characterImgContainer}>
                <img
                  className={styles.characterImg}
                  src={odlawImage}
                  alt=""
                  width={50}
                  height={50}
                />
              </div>
              <span className={styles.characterName}>Odlaw</span>
            </div>
          </div>
        </div>

        {/* Game image  */}
        <GameScene />
      </div>
    </>
  )
}

export default GamePage
