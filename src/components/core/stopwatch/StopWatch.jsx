/* -------------------- Styles -------------------- */
import styles from './StopWatch.module.css'
/* -------------------- Icons -------------------- */
import stopwatchIcon from '../../../assets/icons/icon-stopwatch.svg'
/* -------------------- Hooks -------------------- */
import { useContext, useEffect, useState, useRef } from 'react'
/* -------------------- Context -------------------- */
import { StopwatchContext } from '../../../contexts/game-scene/StopwatchContext'
import { DurationContext } from '../../../contexts/stopwatch/DurationContext'
/* -------------------- Functions -------------------- */
import { formatTime } from '../../../utils/index.js'


const StopWatch = () => {
  const { gameOver } = useContext(StopwatchContext)
  const { setDuration } = useContext(DurationContext)

  const [time, setTime] = useState(0)
  const timeRef = useRef(0)

  useEffect(() => {
    if (gameOver) {
      setDuration(timeRef.current)
      return
    }

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
  }, [gameOver, setTime, setDuration])


  const formattedTime = formatTime(time)

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
            <time dateTime="">
              <strong>{formattedTime}</strong>
            </time>
          </p>
        </div>
      </div>
    </>
  )
}

export default StopWatch
