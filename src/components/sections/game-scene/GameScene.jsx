/* -------------------- Styles -------------------- */
import styles from './GameScene.module.css'
/* -------------------- Images -------------------- */
import skiingImage from '../../../assets/images/puzzles/skiing-scene.webp'
/* -------------------- Hooks -------------------- */
import { useEffect, useState, useRef } from 'react'

const GameScene = () => {
  const [isClick, setIsClick] = useState(false)
  /* Use translation co-ordinates (x, y) to move the image
  position while zooming */
  const [position, setPosition] = useState({ x: 0, y: 0, scale: 1 })
  // Zooming happens only on the image, not the whole page
  const imageRef = useRef(null)

  useEffect(() => {
    const gameImage = imageRef.current
    if (!gameImage) return

    const handleWheel = (e) => {
      // Prevent scrolling of webpage
      e.preventDefault()

      // Use functional updates
      setPosition((prevPosition) => {
        /* Calculate new variables with every 'wheel' event */

        // Multiply 'deltaY' with -0.01 to zoom in small increments
        const delta = e.deltaY * -0.01

        /* Max zoom out is 4x and min zoom-in is 1x. 
        Image doesn't zoom in less than the original rendered size which is 1x */
        const newScale = Math.max(1, Math.min(prevPosition.scale + delta, 4))

        /* Enables cursor centered zooming rather than zooming at the top left corner (0, 0) */

        // Growth or shrink factor
        const ratio = 1 - newScale / prevPosition.scale

        const newPositionX =
          prevPosition.x + (e.clientX - prevPosition.x) * ratio
        const newPositionY =
          prevPosition.y + (e.clientY - prevPosition.y) * ratio

        return {
          scale: newScale,
          x: newPositionX,
          y: newPositionY,
        }
      })
    }

    /* Default 'passive: true' ignores 'e.preventDefault()' for
    'wheel' event and raises the error "Unable to preventdefault inside passive event listener invocation". To prevent the error and prevent scrolling add  'passive: false' */
    gameImage.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      gameImage.removeEventListener('wheel', handleWheel)
    }
  }, [])

  const handleClick = () => {
    setIsClick(!isClick)
  }
  return (
    <>
      <div className={styles.gameBoard}>
        <img
          ref={imageRef}
          className={styles.gameImg}
          src={skiingImage}
          alt="A crowded ski resort on a snowy mountain with many skiers wearing colorful winter jackets."
          onClick={() => handleClick()}
          style={{
            transformOrigin: '0 0',
            transform: `translate(${position.x}px, ${position.y}px) scale(${position.scale})`,
          }}
        />

        <ul
          className={`${styles.charactersList} ${isClick ? styles.open : styles.hidden}`}>
          <li className={`${styles.listItem} ${styles.select}`}>
            Who is this?
          </li>
          <li className={`${styles.listItem} ${styles.option}`}>Waldo</li>
          <li className={`${styles.listItem} ${styles.option}`}>Wanda</li>
          <li className={`${styles.listItem} ${styles.option}`}>Wizard</li>
          <li className={`${styles.listItem} ${styles.option}`}>Odlaw</li>
        </ul>
      </div>
    </>
  )
}

export default GameScene
