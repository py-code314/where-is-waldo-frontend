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
  const imageWrapperRef = useRef(null)
  /* Desktop */
  // Use a ref to store the starting drag coordinates persistently
  const dragStartRef = useRef({ x: 0, y: 0 })
  /* Touch screens */
  const touchOneStartRef = useRef({ x: 0, y: 0 })
  const touchTwoStartRef = useRef({ x: 0, y: 0 })
  /* There should be a minimum distance between the two points
  for zoom to start */
  const prevDifferenceRef = useRef(-1)

  useEffect(() => {
    // console.log('use effect')
    const gameImage = imageRef.current
    if (!gameImage) return

    /* Rotate mouse wheel to zoom */
    const handleMouseWheel = (e) => {
      // console.log('handle wheel')
      // Prevent scrolling of webpage
      e.preventDefault()

      // Use functional updates
      setPosition((prevPosition) => {
        /* Calculate new variables with every 'wheel' event */

        // Multiply 'deltaY' with -0.01 to zoom in small increments
        const delta = e.deltaY * -0.01
        // console.log('🚀 ~ handleMouseWheel ~ e.deltaY:', e.deltaY)
        // console.log('🚀 ~ handleMouseWheel ~ delta:', delta)

        /* Max zoom out is 4x and min zoom-in is 1x. 
        Image doesn't zoom in less than the original rendered size which is 1x */
        const newScale = Math.max(1, Math.min(prevPosition.scale + delta, 4))
        // console.log("🚀 ~ handleMouseWheel ~ newScale:", newScale)

        /* Enables cursor centered zooming rather than zooming at the top left corner (0, 0) */

        // Growth or shrink factor
        const ratio = 1 - newScale / prevPosition.scale
        // console.log('🚀 ~ handleMouseWheel ~ ratio:', ratio)

        const newPositionX =
          prevPosition.x + (e.clientX - prevPosition.x) * ratio
        // console.log('🚀 ~ handleMouseWheel ~ newPositionX:', newPositionX)
        const newPositionY =
          prevPosition.y + (e.clientY - prevPosition.y) * ratio
        // console.log('🚀 ~ handleMouseWheel ~ newPositionY:', newPositionY)

        // TODO: Snap the image back to 0, 0 when scale is 1

        return {
          scale: newScale,
          x: newPositionX,
          y: newPositionY,
        }
      })
    }

    /* Handlers for hold and drag to pan the image */
    const handleMouseDown = (e) => {
      // console.log('mouse down')
      // Prevent default drag and drop
      e.preventDefault()

      // getBoundingClientRect() method returns object containing the size and position of an element relative to the viewport
      const imageWrapperRect = imageWrapperRef.current.getBoundingClientRect()
      // Current mouse position relative to container after mouse down
      const currentX = e.clientX - imageWrapperRect.left
      const currentY = e.clientY - imageWrapperRect.top
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
      const imageWrapper = imageWrapperRef.current
      const imageWrapperWidth = imageWrapper.clientWidth
      const imageWrapperHeight = imageWrapper.clientHeight

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
      const minX = imageWrapperWidth - scaledImgWidth
      const minY = imageWrapperHeight - scaledImgHeight

      const imageWrapperRect = imageWrapperRef.current.getBoundingClientRect()

      // Current mouse position relative to container while moving the mouse
      const currentX = e.clientX - imageWrapperRect.left
      const currentY = e.clientY - imageWrapperRect.top

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

    /* Touch screens */
    const handleTouchStart = (e) => {
      // Prevent default page zooming behavior of browser
      e.preventDefault()

      /* getBoundingClientRect() method returns object containing the
       size and position of an element relative to the viewport */
      const imageWrapperRect = imageWrapperRef.current.getBoundingClientRect()

      if (e.touches.length === 1) {
        // Single finger touch (panning)
        const touchOne = e.touches[0]
        // Current touch position relative to container after touch
        const currentX = touchOne.clientX - imageWrapperRect.left
        const currentY = touchOne.clientY - imageWrapperRect.top
        touchOneStartRef.current = {
          x: currentX - position.x,
          y: currentY - position.y,
        }

        setIsPan(true)
        // Reset value after two finger pinch gesture concludes
        prevDifferenceRef.current = null
      } else if (e.touches.length === 2) {
        // Two finger touch (zoom to pinch)
        setIsPan(false)

        const touchOne = e.touches[0]
        const touchTwo = e.touches[1]

        const currentFirstX = touchOne.clientX - imageWrapperRect.left
        const currentFirstY = touchOne.clientY - imageWrapperRect.top
        touchOneStartRef.current = {
          x: currentFirstX - position.x,
          y: currentFirstY - position.y,
        }

        const currentSecondX = touchTwo.clientX - imageWrapperRect.left
        const currentSecondY = touchTwo.clientY - imageWrapperRect.top
        touchTwoStartRef.current = {
          x: currentSecondX - position.x,
          y: currentSecondY - position.y,
        }

        // Update previous difference value for multi-step pinch to zoom
        const initialDifference = Math.hypot(
          touchOne.clientX - touchTwo.clientX,
          touchOne.clientY - touchTwo.clientY,
        )
        prevDifferenceRef.current = initialDifference
      }
    }

    const handleTouchMove = (e) => {
      /* Image panning with one finger touch */
      if (e.touches.length === 1) {
        // Prevent ghost image
        e.preventDefault()

        const touchOne = e.touches[0]

        // Prevent dragging if image isn't zoomed-in
        if (position.scale <= 1 || !isPan) return

        // Get wrapper's width and height
        const imageWrapper = imageWrapperRef.current
        const imageWrapperWidth = imageWrapper.clientWidth
        const imageWrapperHeight = imageWrapper.clientHeight

        // Get image's width and height
        const image = imageRef.current
        const imageWidth = image.width
        const imageHeight = image.height

        // Get scaled image's width and height
        const currentScale = position.scale
        const scaledImgWidth = imageWidth * currentScale
        const scaledImgHeight = imageHeight * currentScale

        const imageWrapperRect = imageWrapperRef.current.getBoundingClientRect()

        // Current mouse position relative to container while moving the mouse
        const currentX = touchOne.clientX - imageWrapperRect.left
        const currentY = touchOne.clientY - imageWrapperRect.top

        // Net difference between previous offset position and current mouse position
        let newX = currentX - touchOneStartRef.current.x
        let newY = currentY - touchOneStartRef.current.y

        // Set boundaries for panning the image
        const maxX = 0
        const maxY = 0
        const minX = imageWrapperWidth - scaledImgWidth
        const minY = imageWrapperHeight - scaledImgHeight

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

      /* Pinch to move gesture */
      if (e.touches.length === 2) {
        const touchOne = e.touches[0]
        const touchTwo = e.touches[1]

        const currentDifference = Math.hypot(
          touchOne.clientX - touchTwo.clientX,
          touchOne.clientY - touchTwo.clientY,
        )

        const prevDifference = prevDifferenceRef.current

        if (prevDifference && prevDifference > 0) {
          const imageWrapperRect =
            imageWrapperRef.current.getBoundingClientRect()

          // Center points relative to image wrapper
          const centerX =
            (touchOne.clientX + touchTwo.clientX) / 2 - imageWrapperRect.left
          const centerY =
            (touchOne.clientY + touchTwo.clientY) / 2 - imageWrapperRect.top

          // Zoom factor depends on distance between two finger touches
          const deltaDistance = currentDifference - prevDifference
          const delta = deltaDistance * 0.05

          if (deltaDistance !== 0) {
            // Get wrapper's width and height
            const imageWrapper = imageWrapperRef.current
            const imageWrapperWidth = imageWrapper.clientWidth
            const imageWrapperHeight = imageWrapper.clientHeight

            // Get image's width and height
            const image = imageRef.current
            const imageWidth = image.width
            const imageHeight = image.height

            // Use functional updates
            setPosition((prevPosition) => {
              /* Zoom upper limit is 6x and lower limit is 1x. Image
               doesn't zoom-out less than the original rendered size which is 1x */
              const newScale = Math.max(
                1,
                Math.min(prevPosition.scale + delta, 6),
              )

              // Growth or shrink factor
              const ratio = 1 - newScale / prevPosition.scale

              let newPositionX =
                prevPosition.x + (centerX - prevPosition.x) * ratio
              let newPositionY =
                prevPosition.y + (centerY - prevPosition.y) * ratio

              // Get scaled image's width and height
              const scaledImgWidth = imageWidth * newScale
              const scaledImgHeight = imageHeight * newScale

              /* Set boundaries to prevent gaps between the image and
              wrapper when zooming out */
              const maxX = 0
              const maxY = 0
              const minX = imageWrapperWidth - scaledImgWidth
              const minY = imageWrapperHeight - scaledImgHeight

              // Update newX and newY if they go out of boundaries
              if (newPositionX > maxX) {
                newPositionX = maxX
              } else if (newPositionX < minX) {
                newPositionX = minX
              }
              if (newPositionY > maxY) {
                newPositionY = maxY
              } else if (newPositionY < minY) {
                newPositionY = minY
              }

              return {
                scale: newScale,
                x: newPositionX,
                y: newPositionY,
              }
            })
          }
        }

        // Cache the distance for the next move event
        prevDifferenceRef.current = currentDifference
      }
    }

    const handleTouchEnd = (e) => {
      /* Single finger is off the touch screen after panning is
       concluded or all fingers are off the screen */
      if (e.touches.length === 0) {
        setIsPan(false)
        prevDifferenceRef.current = null
      } else if (e.touches.length === 1) {
        /* Initiate single finger touch panning after player finished
        pinch to zoom and lifted only one finger off the screen */
        // Reset value after two finger pinch gesture concludes
        prevDifferenceRef.current = null
        
        const touchOne = e.touches[0]

        const imageWrapperRect = imageWrapperRef.current.getBoundingClientRect()

        // Current touch position relative to container after touch
        const currentX = touchOne.clientX - imageWrapperRect.left
        const currentY = touchOne.clientY - imageWrapperRect.top
        touchOneStartRef.current = {
          x: currentX - position.x,
          y: currentY - position.y,
        }

        setIsPan(true)
      }
    }

    /* Default 'passive: true' ignores 'e.preventDefault()' for
    'wheel' event and raises the error "Unable to preventdefault inside passive event listener invocation". To prevent the error and prevent scrolling add  'passive: false' */
    // Limit zooming to the image
    /* For desktop */
    gameImage.addEventListener('wheel', handleMouseWheel, { passive: false })
    gameImage.addEventListener('mousedown', handleMouseDown)
    gameImage.addEventListener('mousemove', handleMouseMove)
    gameImage.addEventListener('mouseup', handleMouseUp)

    // For touch screens
    gameImage.addEventListener('touchstart', handleTouchStart)
    gameImage.addEventListener('touchmove', handleTouchMove)
    gameImage.addEventListener('touchend', handleTouchEnd)

    // Clean up
    return () => {
      gameImage.removeEventListener('wheel', handleMouseWheel)
      gameImage.removeEventListener('mousedown', handleMouseDown)
      gameImage.removeEventListener('mousemove', handleMouseMove)
      gameImage.removeEventListener('mouseup', handleMouseUp)

      gameImage.removeEventListener('touchstart', handleTouchStart)
      gameImage.removeEventListener('touchmove', handleTouchMove)
      gameImage.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isPan, position])

  const handleClick = () => {
    setIsClick(!isClick)
  }
  return (
    <>
      <div className={styles.gameBoard} ref={imageWrapperRef}>
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
