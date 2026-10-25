/* -------------------- Styles -------------------- */
import styles from './GameScene.module.css'
/* -------------------- Icons -------------------- */
import homeIcon from '../../assets/icons/icon-home-1.svg'
import stopwatchIcon from '../../assets/icons/icon-stopwatch.svg'
/* -------------------- Images -------------------- */
import wallyImage from '../../assets/images/characters/wally.png'
import wendaImage from '../../assets/images/characters/wenda.png'
import wizardImage from '../../assets/images/characters/wizard.png'
import odlawImage from '../../assets/images/characters/odlaw.png'
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
        {/* Back to Home link  */}
        <div>
          <Link>
            <img src={homeIcon} alt="" width={30} height={30} />
            <span>Home</span>
          </Link>
          <div>
            {/* Title and todo  */}
            <div>
              <h2>The Ski Slopes of Anarchy</h2>
              <p>Find Waldo, Wenda, Odlaw, and Wizard to solve the puzzle.</p>
            </div>
            <div>
              <p>Difficulty</p>
              <p>
                <strong>Easy</strong>
              </p>
            </div>
            <div>
              {/* Show stopwatch  */}
              <img src={stopwatchIcon} alt="" width={30} height={30} />
              <p>Time</p>
              <p>
                <strong>
                  {hours}:{minutes.toString().padStart(2, '0')}:
                  {seconds.toString().padStart(2, '0')}
                </strong>
              </p>
            </div>
          </div>
          <button onClick={watchStop}>Game over</button>
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
      </div>
    </>
  )
}

export default GameScene
