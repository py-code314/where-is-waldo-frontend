/* -------------------- Styles -------------------- */
import styles from './StopWatch.module.css'
/* -------------------- Icons -------------------- */
import stopwatchIcon from '../../../assets/icons/icon-stopwatch.svg'
/* -------------------- Hooks -------------------- */
import { useContext, useEffect, useState } from 'react'
/* -------------------- Context -------------------- */
import { StopwatchContext } from '../../../contexts/game-scene/StopwatchContext'

const StopWatch = () => {
  const { gameOver } = useContext(StopwatchContext)

  // State
  const [time, setTime] = useState(0)

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
