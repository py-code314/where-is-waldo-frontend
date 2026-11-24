/* -------------------- Styles -------------------- */
import styles from './StopWatch.module.css'
/* -------------------- Icons -------------------- */
import stopwatchIcon from '../../../assets/icons/icon-stopwatch.svg'
/* -------------------- Hooks -------------------- */
import { useContext, useEffect, useState, useRef } from 'react'
/* -------------------- Context -------------------- */
import { ResultContext } from '../../../contexts/game-scene/ResultContext.jsx'
/* -------------------- Functions -------------------- */
import { formatDuration, formatDatetime } from '../../../utils/index.js'

const StopWatch = () => {
  const { result } = useContext(ResultContext)

  const [time, setTime] = useState(0)
  const timeRef = useRef(0)

  useEffect(() => {
    // Stop stopwatch if the game is over
    if (result.isGameOver) return

    // Start stopwatch
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime + 1

        // Update ref to prevent re-renders every second
        timeRef.current = newTime
        return newTime
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [setTime, result.isGameOver])

  // Format duration and dateTime
  const formattedDuration = formatDuration(time)
  const formattedDatetime = formatDatetime(time)

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
            <time dateTime={formattedDatetime}>
              <strong>{formattedDuration}</strong>
            </time>
          </p>
        </div>
      </div>
    </>
  )
}

export default StopWatch
