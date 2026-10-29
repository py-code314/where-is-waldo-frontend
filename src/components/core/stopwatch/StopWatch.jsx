/* -------------------- Styles -------------------- */
import styles from './StopWatch.module.css'
/* -------------------- Icons -------------------- */
import stopwatchIcon from '../../../assets/icons/icon-stopwatch.svg'
/* -------------------- Hooks -------------------- */
import { useEffect, useState } from 'react'

const StopWatch = () => {
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
      {/* Show stopwatch  */}
      <div className={styles.stopwatch}>
        {/* Hide icon from screen readers */}
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
    </>
  )
}

export default StopWatch
