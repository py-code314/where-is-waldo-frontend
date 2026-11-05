/* -------------------- Styles -------------------- */
import styles from './GameScene.module.css'
/* -------------------- Images -------------------- */
import skiingImage from '../../../assets/images/puzzles/skiing-scene.webp'
/* -------------------- Data -------------------- */
// import { charactersData } from '../../../data/charactersData'
/* -------------------- Hooks -------------------- */
import { useEffect, useState, useRef } from 'react'
/* -------------------- Components -------------------- */
import Button from '../../core/button/Button'
/* -------------------- Functions -------------------- */
import { isCharacterFound } from '../../../utils/character/findCharacter'

const GameScene = () => {
  /* State */
  const [imgClick, setImgClick] = useState(false)
  const [isPan, setIsPan] = useState(false)
  // Track option click result
  const [result, setResult] = useState({ isCharacter: null, name: '' })
  // Track option click
  const [isOption, setIsOption] = useState(false)
  // Initial image position and scale
  const [imgPosition, setImgPosition] = useState({ x: 0, y: 0, scale: 1 })
  // Mouse click coordinates
  const [clickCoords, setClickCoords] = useState({ x: 0, y: 0 })
  // Dropdown box position
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 })
  // Popup message position
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
  // const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0, isBottom: false })

  const imageRef = useRef(null)
  const imageWrapperRef = useRef(null)
  const dropdownRef = useRef(null)
  const popupRef = useRef(null)
  /* Use refs to prevent unnecessary re-renders */
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
    const gameImage = imageRef.current
    if (!gameImage) return

    /* Rotate mouse wheel to zoom */
    const handleMouseWheel = (e) => {
      // Prevent scrolling of webpage
      e.preventDefault()

      /* Calculate new variables with every 'wheel' event */
      // Multiply 'deltaY' with -0.01 to zoom in small increments
      const delta = e.deltaY * -0.01

      /* Limit zoom between 1x and 4x */
      const newScale = Math.max(1, Math.min(imgPosition.scale + delta, 4))

      // Growth or shrink factor
      const ratio = 1 - newScale / imgPosition.scale

      /* Enables cursor centered zooming rather than zooming at the top left corner (0, 0) */
      let newImgPositionX = imgPosition.x + (e.clientX - imgPosition.x) * ratio
      let newImgPositionY = imgPosition.y + (e.clientY - imgPosition.y) * ratio

      // Get wrapper's width and height
      const imageWrapper = imageWrapperRef.current
      const imageWrapperWidth = imageWrapper.clientWidth
      const imageWrapperHeight = imageWrapper.clientHeight

      // Get image's width and height
      const image = imageRef.current
      const imageWidth = image.width
      const imageHeight = image.height

      // Get scaled image's width and height
      const scaledImgWidth = imageWidth * newScale
      const scaledImgHeight = imageHeight * newScale

      /* Set boundaries to prevent gaps between the image and
        wrapper when zooming out at corners */
      const maxX = 0
      const maxY = 0
      const minX = imageWrapperWidth - scaledImgWidth
      const minY = imageWrapperHeight - scaledImgHeight

      // Update newX and newY if they go out of boundaries
      if (newImgPositionX > maxX) {
        newImgPositionX = maxX
      } else if (newImgPositionX < minX) {
        newImgPositionX = minX
      }
      if (newImgPositionY > maxY) {
        newImgPositionY = maxY
      } else if (newImgPositionY < minY) {
        newImgPositionY = minY
      }

      // Use functional updates
      setImgPosition((prevImgPosition) => ({
        ...prevImgPosition,
        scale: newScale,
        x: newImgPositionX,
        y: newImgPositionY,
      }))
      setClickCoords((prevClickCoords) => ({
        ...prevClickCoords,
        x: prevClickCoords.x + newImgPositionX,
        y: prevClickCoords.y + newImgPositionY,
      }))
    }

    // const handleMouseWheel = (e) => {
    //   // Prevent scrolling of webpage
    //   e.preventDefault()

    //   // Use functional updates
    //   setImgPosition((prevImgPosition) => {
    //     /* Calculate new variables with every 'wheel' event */
    //     // Multiply 'deltaY' with -0.01 to zoom in small increments
    //     const delta = e.deltaY * -0.01

    //     /* Limit zoom between 1x and 4x */
    //     const newScale = Math.max(1, Math.min(prevImgPosition.scale + delta, 4))

    //     // Growth or shrink factor
    //     const ratio = 1 - newScale / prevImgPosition.scale

    //     /* Enables cursor centered zooming rather than zooming at the top left corner (0, 0) */
    //     let newImgPositionX =
    //       prevImgPosition.x + (e.clientX - prevImgPosition.x) * ratio
    //     let newImgPositionY =
    //       prevImgPosition.y + (e.clientY - prevImgPosition.y) * ratio

    //     // Get wrapper's width and height
    //     const imageWrapper = imageWrapperRef.current
    //     const imageWrapperWidth = imageWrapper.clientWidth
    //     const imageWrapperHeight = imageWrapper.clientHeight

    //     // Get image's width and height
    //     const image = imageRef.current
    //     const imageWidth = image.width
    //     const imageHeight = image.height

    //     // Get scaled image's width and height
    //     const scaledImgWidth = imageWidth * newScale
    //     const scaledImgHeight = imageHeight * newScale

    //     /* Set boundaries to prevent gaps between the image and
    //     wrapper when zooming out at corners */
    //     const maxX = 0
    //     const maxY = 0
    //     const minX = imageWrapperWidth - scaledImgWidth
    //     const minY = imageWrapperHeight - scaledImgHeight

    //     // Update newX and newY if they go out of boundaries
    //     if (newImgPositionX > maxX) {
    //       newImgPositionX = maxX
    //     } else if (newImgPositionX < minX) {
    //       newImgPositionX = minX
    //     }
    //     if (newImgPositionY > maxY) {
    //       newImgPositionY = maxY
    //     } else if (newImgPositionY < minY) {
    //       newImgPositionY = minY
    //     }

    //     return {
    //       scale: newScale,
    //       x: newImgPositionX,
    //       y: newImgPositionY,
    //     }
    //   })
    // }

    /* Handlers for hold and drag to pan the image */
    const handleMouseDown = (e) => {
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
        x: currentX - imgPosition.x,
        y: currentY - imgPosition.y,
      }

      setIsPan(true)
    }

    const handleMouseMove = (e) => {
      // Prevent default drag and drop
      e.preventDefault()

      // Prevent dragging if image isn't zoomed-in
      if (imgPosition.scale <= 1 || !isPan) return

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
      const currentScale = imgPosition.scale
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

      setImgPosition((prevImgPosition) => ({
        ...prevImgPosition,
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
          x: currentX - imgPosition.x,
          y: currentY - imgPosition.y,
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
          x: currentFirstX - imgPosition.x,
          y: currentFirstY - imgPosition.y,
        }

        const currentSecondX = touchTwo.clientX - imageWrapperRect.left
        const currentSecondY = touchTwo.clientY - imageWrapperRect.top
        touchTwoStartRef.current = {
          x: currentSecondX - imgPosition.x,
          y: currentSecondY - imgPosition.y,
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
        if (imgPosition.scale <= 1 || !isPan) return

        // Get wrapper's width and height
        const imageWrapper = imageWrapperRef.current
        const imageWrapperWidth = imageWrapper.clientWidth
        const imageWrapperHeight = imageWrapper.clientHeight

        // Get image's width and height
        const image = imageRef.current
        const imageWidth = image.width
        const imageHeight = image.height

        // Get scaled image's width and height
        const currentScale = imgPosition.scale
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

        setImgPosition((prevImgPosition) => ({
          ...prevImgPosition,
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
            setImgPosition((prevImgPosition) => {
              /* Zoom upper limit is 6x and lower limit is 1x. Image
               doesn't zoom-out less than the original rendered size which is 1x */
              const newScale = Math.max(
                1,
                Math.min(prevImgPosition.scale + delta, 6),
              )

              // Growth or shrink factor
              const ratio = 1 - newScale / prevImgPosition.scale

              let newImgPositionX =
                prevImgPosition.x + (centerX - prevImgPosition.x) * ratio
              let newImgPositionY =
                prevImgPosition.y + (centerY - prevImgPosition.y) * ratio

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
              if (newImgPositionX > maxX) {
                newImgPositionX = maxX
              } else if (newImgPositionX < minX) {
                newImgPositionX = minX
              }
              if (newImgPositionY > maxY) {
                newImgPositionY = maxY
              } else if (newImgPositionY < minY) {
                newImgPositionY = minY
              }

              return {
                scale: newScale,
                x: newImgPositionX,
                y: newImgPositionY,
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
          x: currentX - imgPosition.x,
          y: currentY - imgPosition.y,
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
  }, [isPan, imgPosition])

  const handleImageClick = (e) => {
    // Get elements and their values
    const dropdown = dropdownRef.current
    const dropdownStyles = window.getComputedStyle(dropdown)
    const imageWrapperRect = imageWrapperRef.current.getBoundingClientRect()

    // Initialize dropdown values
    let dropdownX = 0
    let dropdownY = 0

    const dropdownWidth = dropdown.clientWidth
    const dropdownHeight = dropdown.clientHeight

    // Get click positions relative to browser
    const clientX = e.clientX
    const clientY = e.clientY

    // Get click co-ordinates relative to wrapper
    const clickX = clientX - imageWrapperRect.left
    const clickY = clientY - imageWrapperRect.top

    const image = imageRef.current

    /* Normalize to percentage of width and height instead of absolute 
     values for different screen widths */
    // Multiply by 10000 and divide by 100 to keep 2 decimal places
    const xCoord = Math.floor((clickX / image.width) * 10000) / 100
    const yCoord = Math.floor((clickY / image.height) * 10000) / 100

    /* Calculate the remaining width and height of wrapper
    from click position */
    const widthDiff = imageWrapperRect.right - clientX
    const heightDiff = imageWrapperRect.bottom - clientY

    /* Dynamically calculate total horizontal and vertical margin of dropdown  */
    const totalMarginX =
      parseInt(dropdownStyles.marginLeft, 10) +
        parseInt(dropdownStyles.marginRight, 10) || 0
    const totalMarginY =
      parseInt(dropdownStyles.marginTop, 10) +
        parseInt(dropdownStyles.marginBottom, 10) || 0

    /* Place the dropdown box based on the click position.
    Dropdown should always appear inside the image wrapper */
    if (widthDiff > dropdownWidth) {
      dropdownX = clickX
    } else {
      dropdownX = clickX - dropdownWidth - totalMarginX
    }

    if (heightDiff > dropdownHeight) {
      dropdownY = clickY
    } else {
      dropdownY = clickY - dropdownHeight - totalMarginY
    }

    /* Reset dropdown position on every second click to prevent scroll bars when screen width changes from wide to narrow */
    if (imgClick) {
      setDropdownPosition(() => ({
        ...dropdownPosition,
        x: 0,
        y: 0,
      }))
    } else {
      setDropdownPosition(() => ({
        ...dropdownPosition,
        x: dropdownX,
        y: dropdownY,
      }))
      setClickCoords(() => ({
        ...clickCoords,
        x: xCoord,
        y: yCoord,
      }))
    }

    setImgClick(!imgClick)
  }

  const handleOptionClick = (e) => {
    // Get character name and it's location status
    const { isCharacter, name } = isCharacterFound(e, clickCoords)

    // Get image width
    const image = imageRef.current
    const imgWidth = image.width

    /* Place popup at the half width of image and then center it
    using 'translateX' */
    let popupX = imgWidth / 2
    let popupY = 0

    setResult((prevResult) => ({
      ...prevResult,
      isCharacter,
      name,
    }))
    setPopupPosition((prevPopupPosition) => ({
      ...prevPopupPosition,
      x: popupX,
      y: popupY,
    }))
    setDropdownPosition(() => ({
      ...dropdownPosition,
      x: 0,
      y: 0,
    }))
    setImgClick(false)
    // Show popup message
    setIsOption(true)

    // const resetPopup = () => {
    //   setIsOption(false)

    //   setPopupPosition((prevPopupPosition) => ({
    //     ...prevPopupPosition,
    //     x: 0,
    //     y: 0,
    //   }))
    //   setResult((prevResult) => ({
    //     ...prevResult,
    //     isCharacter: null,
    //     name: '',
    //   }))
    // }

    // window.setTimeout(resetPopup, 1000)
  }

  return (
    <>
      <div className={styles.gameBoardContainer}>
        <div className={styles.gameBoard} ref={imageWrapperRef}>
          <img
            ref={imageRef}
            className={styles.gameImg}
            src={skiingImage}
            alt="A crowded ski resort on a snowy mountain with many skiers wearing colorful winter jackets."
            onClick={handleImageClick}
            style={{
              transformOrigin: '0 0',
              transform: `translate(${imgPosition.x}px, ${imgPosition.y}px) scale(${imgPosition.scale})`,
            }}
          />
          <ul
            className={`${styles.dropdown} ${imgClick ? styles.dropdownOpen : ''}`}
            style={{
              position: 'absolute',
              left: `${dropdownPosition.x}px`,
              top: `${dropdownPosition.y}px`,
            }}
            ref={dropdownRef}>
            <li className={styles.select}>Who is this?</li>
            <li>
              <Button className="optionBtn" onClick={handleOptionClick}>
                Wally
              </Button>
            </li>
            <li>
              <Button className="optionBtn" onClick={handleOptionClick}>
                Wenda
              </Button>
            </li>
            <li>
              <Button className="optionBtn" onClick={handleOptionClick}>
                Wizard
              </Button>
            </li>
            <li>
              <Button className="optionBtn" onClick={handleOptionClick}>
                Odlaw
              </Button>
            </li>
          </ul>

          {/* Popup with success or failure message  */}
          <div
            className={`${styles.popup} ${isOption ? styles.popupOpen : ''} ${result.isCharacter === true ? styles.yay : result.isCharacter === false ? styles.nope : ''}`}
            style={{
              position: 'absolute',
              left: `${popupPosition.x}px`,
              top: `${popupPosition.y}px`,
              transform: 'translateX(-50%)',
            }}
            ref={popupRef}>
            {result.isCharacter === true ? (
              <p className={styles.message}>You found {result.name}! </p>
            ) : result.isCharacter === false ? (
              <p className={styles.message}> {result.name} is not there</p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default GameScene
