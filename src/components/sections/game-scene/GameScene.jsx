/* -------------------- Styles -------------------- */
import styles from './GameScene.module.css'
/* -------------------- Images -------------------- */
import skiingImage from '../../../assets/images/puzzles/skiing-scene.webp'
/* -------------------- Hooks -------------------- */
import { useEffect, useState, useRef } from 'react'

const GameScene = () => {
  // State
  const [isClick, setIsClick] = useState(false)
  const [isPan, setIsPan] = useState(false)
  /* Initial image position and scale */
  const [position, setPosition] = useState({ x: 0, y: 0, scale: 1 })

  /* Use refs to prevent unnecessary re-renders */
   const imageRef = useRef(null)
   const containerRef = useRef(null)
  // Use a ref to store the starting drag coordinates persistently
  const dragStartRef = useRef({ x: 0, y: 0 })
  // console.log("🚀 ~ GameScene ~ dragStartRef:", dragStartRef)

  useEffect(() => {
    // console.log('use effect')
    const gameImage = imageRef.current
    if (!gameImage) return

    const handleWheel = (e) => {
      // console.log('handle wheel')
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

    const handleMouseDown = (e) => {
      // console.log('mouse down')
      // Prevent default drag and drop
      e.preventDefault()

      // getBoundingClientRect() method returns object containing the size and position of an element relative to the viewport
      const rect = containerRef.current.getBoundingClientRect()
      // Current mouse position relative to container after mouse down
      const currentX = e.clientX - rect.left
      const currentY = e.clientY - rect.top
      /* Store starting click position relative to the previous 
      offset position either because of zoom or drag. This prevents image jumping back to the starting position (0, 0) */
      dragStartRef.current = {
        x: currentX - position.x,
        y: currentY - position.y,
      }

      setIsPan(true)
    }

    const handleMouseMove = (e) => {
      // Prevent default drag and drop
      e.preventDefault()

      // Prevent dragging if image isn't zoomed-in
      if (position.scale <= 1 || !isPan) return

      // If LMB is not held, the pan can't be active
      if (e.buttons % 2 === 0) {
        setIsPan(false)
        return
      }

      // Get container's width and height
      const container = containerRef.current
      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight

      // Get image's width and height
      const image = imageRef.current
      const imageWidth = image.width
      const imageHeight = image.height

      // Get scaled image's width and height
      const currentScale = position.scale
      const scaledImgWidth = imageWidth * currentScale
      const scaledImgHeight = imageHeight * currentScale

      // Set boundaries for panning the image
      const maxX = 0
      const maxY = 0
      const minX = containerWidth - scaledImgWidth
      const minY = containerHeight - scaledImgHeight

      const rect = containerRef.current.getBoundingClientRect()

      // Current mouse position relative to container while moving the mouse
      const currentX = e.clientX - rect.left
      const currentY = e.clientY - rect.top

      // Net difference between previous offset position and current mouse position
      let newX = currentX - dragStartRef.current.x
      let newY = currentY - dragStartRef.current.y

      // Update newX and newY if they go out of boundaries
      if (newX > maxX) {
        newX = maxX
      } else if (newX < minX) {
        newX = minX
      }
      if (newY > maxY) {
        newY = maxY
      } else if (newY < minY) {
        newY = minY
      }

      setPosition((prevPosition) => ({
        ...prevPosition,
        x: newX,
        y: newY,
      }))
    }

    const handleMouseUp = () => {
      // console.log('mouse up')
      if (!isPan) return
      setIsPan(false)
    }

    /* Default 'passive: true' ignores 'e.preventDefault()' for
    'wheel' event and raises the error "Unable to preventdefault inside passive event listener invocation". To prevent the error and prevent scrolling add  'passive: false' */
    // Limit zooming to the image
    gameImage.addEventListener('wheel', handleWheel, { passive: false })

    gameImage.addEventListener('mousedown', handleMouseDown)
    gameImage.addEventListener('mousemove', handleMouseMove)
    gameImage.addEventListener('mouseup', handleMouseUp)

    // Clean up
    return () => {
      gameImage.removeEventListener('wheel', handleWheel)

      gameImage.removeEventListener('mousedown', handleMouseDown)
      gameImage.removeEventListener('mousemove', handleMouseMove)
      gameImage.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isPan, position])

  const handleClick = () => {
    setIsClick(!isClick)
  }
  return (
    <>
      <div className={styles.gameBoard} ref={containerRef}>
        <img
          ref={imageRef}
          className={styles.gameImg}
          src={skiingImage}
          alt="A crowded ski resort on a snowy mountain with many skiers wearing colorful winter jackets."
          onClick={handleClick}
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
