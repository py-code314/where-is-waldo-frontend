/* -------------------- Styles -------------------- */
import styles from './GameScene.module.css'
/* -------------------- Icons -------------------- */
import homeIcon from '../../assets/icons/icon-home-2.svg'
import stopwatchIcon from '../../assets/icons/icon-stopwatch.svg'
/* -------------------- Images -------------------- */
import wallyImage from '../../assets/images/characters/wally.png'
import wendaImage from '../../assets/images/characters/wenda.png'
import wizardImage from '../../assets/images/characters/wizard.png'
import odlawImage from '../../assets/images/characters/odlaw.png'
import skiingImage from '../../assets/images/puzzles/skiing-scene.webp'
/* -------------------- Hooks -------------------- */
import { useEffect, useState } from 'react'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'

const GameScene = () => {
  // State
  const [time, setTime] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    if (gameOver) return

    // Start stopwatch
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [gameOver])

  // Computed variables
  const seconds = time % 60
  const minutes = Math.floor(time / 60) % 60
  const hours = Math.floor(time / 3600)

  const watchStop = () => {
    // Stop stopwatch
    setGameOver(true)
  }

  return (
    <>
      <div className={styles.gameScene}>
        <div className={styles.game}>
          {/* Back to Home link  */}
          <Link className={styles.homeLink}>
            <div className={styles.imageContainer}>
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
          {/* Top bar with all game info  */}
          <div className={styles.gameInfo}>
            {/* Title and instructions  */}
            <div className={styles.sceneInfo}>
              <h2 className={styles.title}>The Ski Slopes of Anarchy</h2>
              <p className={styles.instructions}>
                Find Waldo, Wenda, Odlaw, and Wizard to solve the puzzle.
              </p>
            </div>
            <div className={styles.infoPanel}>
              <div className={styles.difficulty}>
                <p className={styles.label}>Difficulty</p>
                <p className={styles.level}>
                  <strong>Easy</strong>
                </p>
              </div>
              {/* Show stopwatch  */}
              <div className={styles.stopwatch}>
                <img
                  className={styles.stopwatchIcon}
                  src={stopwatchIcon}
                  alt=""
                  width={30}
                  height={30}
                  aria-hidden="true"
                />
                <div className={styles.timeDisplay}>
                  <p className={styles.label}>Time</p>
                  <p className={styles.time}>
                    <strong>
                      {hours}:{minutes.toString().padStart(2, '0')}:
                      {seconds.toString().padStart(2, '0')}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <button onClick={watchStop}>Game over</button> */}
        </div>

        {/* Character head shots  */}
        <div className={styles.characters}>
          <div>
            <div>
              <img src={wallyImage} alt="" width={50} height={50} />
            </div>
            <span>Waldo</span>
          </div>
          <div>
            <div>
              <img src={wendaImage} alt="" width={50} height={50} />
            </div>
            <span>Wenda</span>
          </div>
          <div>
            <div>
              <img src={wizardImage} alt="" width={50} height={50} />
            </div>
            <span>Wizard</span>
          </div>
          <div>
            <div>
              <img src={odlawImage} alt="" width={50} height={50} />
            </div>
            <span>Odlaw</span>
          </div>
        </div>

        {/* Puzzle image  */}
        <div>
          <img src={skiingImage} alt="" width={1200} />
        </div>
      </div>
    </>
  )
}

export default GameScene
