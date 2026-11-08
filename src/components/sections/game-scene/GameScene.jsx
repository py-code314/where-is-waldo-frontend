/* ------------------------- Styles ------------------------------- */
import styles from './GameScene.module.css'
/* ------------------------- Hooks -------------------------------- */
import { useEffect, useState, useRef } from 'react'
/* ------------------------- Components --------------------------- */
import PopupMessage from '../../core/popup/PopupMessage'
import Dropdown from '../../core/dropdown/Dropdown'
import GameImage from '../../core/image/GameImage.jsx'
import Target from '../../core/target/Target.jsx'
/* ------------------------- Functions ---------------------------- */
import { isCharacterFound, getUpdatedImgCoords } from '../../../utils/index.js'

const GameScene = ({
  result,
  setResult,
  foundCharacterIds,
  setFoundCharacterIds,
}) => {
  // TODO: Create context for result
  /* ----------------------- State -------------------------------- */

  const [imgClick, setImgClick] = useState(false)
  const [isPanning, setIsPanning] = useState(false)
  // State to not display dropdown after panning the image
  const [isDragging, setIsDragging] = useState(false)
  // Track option click
  const [isOption, setIsOption] = useState(false)
  // Initial image position and scale
  const [imgPosition, setImgPosition] = useState({ x: 0, y: 0, scale: 1 })
  // Track image click coordinates
  const [imgClickCoords, setImgClickCoords] = useState({ x: 0, y: 0 })
  // Place dropdown, target, and popup off screen
  const [dropdownPosition, setDropdownPosition] = useState({
    x: -9999,
    y: -9999,
  })
  const [targetPosition, setTargetPosition] = useState({
    x: -9999,
    y: -9999,
  })
  const [popupPosition, setPopupPosition] = useState({ x: -9999, y: -9999 })

  /* ----------------------- Refs --------------------------------- */
  const imgRef = useRef(null)
  const imgWrapperRef = useRef(null)
  const dropdownRef = useRef(null)
  const targetRef = useRef(null)
  const popupRef = useRef(null)

  /* Use refs to prevent unnecessary re-renders */

  /* ----------------------- Desktop ------------------------------ */
  // Use a ref to store the starting drag coordinates persistently
  const dragStartRef = useRef({ x: 0, y: 0 })

  /* ---------------------- Touch screens ------------------------- */
  // For two finger pinch to zoom feature
  const touchOneStartRef = useRef({ x: 0, y: 0 })
  const touchTwoStartRef = useRef({ x: 0, y: 0 })
  /* There should be a minimum distance between the two points for
   zoom to start */
  const prevDifferenceRef = useRef(-1)

  // useEffect for 'mousewheel' event to manually attach event listener
  useEffect(() => {
    const gameImage = imgRef.current
    if (!gameImage) return

    /* ----------------------- Desktop ---------------------------- */

    /* Rotate mouse wheel to zoom */
    const handleMouseWheel = (e) => {
      // Prevent scrolling of webpage
      e.preventDefault()

      // Calculate new variables with every 'wheel' event
      // Multiply 'deltaY' with -0.01 to zoom in small increments
      const delta = e.deltaY * -0.01

      // Limit zoom between 1x and 4x
      const newScale = Math.max(1, Math.min(imgPosition.scale + delta, 4))

      // Growth or shrink factor
      const ratio = 1 - newScale / imgPosition.scale

      /* Enables cursor centered zooming rather than zooming at the
       top left corner (0, 0) */
      let newImgPositionX = imgPosition.x + (e.clientX - imgPosition.x) * ratio
      let newImgPositionY = imgPosition.y + (e.clientY - imgPosition.y) * ratio

      // Get wrapper's width and height
      const imageWrapper = imgWrapperRef.current
      const imageWrapperWidth = imageWrapper.clientWidth
      const imageWrapperHeight = imageWrapper.clientHeight

      // Get image's width and height
      const image = imgRef.current
      const imageWidth = image.width
      const imageHeight = image.height

      // Get scaled image's width and height
      const scaledImgWidth = imageWidth * newScale
      const scaledImgHeight = imageHeight * newScale

      /* Set boundaries to prevent gaps between the image and
        wrapper at corners when zooming out */
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
      // Update image click coordinates with each scaling up or down
      setImgClickCoords((prevImgClickCoords) => ({
        ...prevImgClickCoords,
        x: prevImgClickCoords.x + newImgPositionX,
        y: prevImgClickCoords.y + newImgPositionY,
      }))
    }

    /* ----------------------- Touch screens ------------------------ */

    /* Don't put 'preventDefault()' inside the handler as it prevents
    'click' event from firing as it is needed for 'tap' gesture. And
    the 'click' event runs 'handleImageClick()' which displays dropdown */
    const handleTouchStart = (e) => {
      /* 'getBoundingClientRect()' method returns object containing the
      size and position of an element relative to the viewport */
      const imageWrapperRect = imgWrapperRef.current.getBoundingClientRect()

      if (e.touches.length === 1) {
        // Single finger touch (panning)
        const touchOne = e.touches[0]

        // Current touch position relative to wrapper
        const currentX = touchOne.clientX - imageWrapperRect.left
        const currentY = touchOne.clientY - imageWrapperRect.top
        touchOneStartRef.current = {
          x: currentX - imgPosition.x,
          y: currentY - imgPosition.y,
        }

        setIsPanning(true)

        // Reset value to default with each touch to start anew
        prevDifferenceRef.current = null
      } else if (e.touches.length === 2) {
        // Two finger touch (zoom to pinch)
        setIsPanning(false)

        const touchOne = e.touches[0]
        const touchTwo = e.touches[1]

        // Save initial touch coordinates
        const currentTouchOneX = touchOne.clientX - imageWrapperRect.left
        const currentTouchOneY = touchOne.clientY - imageWrapperRect.top
        touchOneStartRef.current = {
          x: currentTouchOneX - imgPosition.x,
          y: currentTouchOneY - imgPosition.y,
        }

        const currentTouchTwoX = touchTwo.clientX - imageWrapperRect.left
        const currentTouchTwoY = touchTwo.clientY - imageWrapperRect.top
        touchTwoStartRef.current = {
          x: currentTouchTwoX - imgPosition.x,
          y: currentTouchTwoY - imgPosition.y,
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
      // Prevent ghost image (dragging)
      // Prevent default page zooming behavior of browser (pinch to zoom)
      /* This also prevents 'click' event from firing and in turn 
      prevents display of dropdown after panning the image */
      e.preventDefault()
      // Image panning with one finger touch
      if (e.touches.length === 1) {
        const touchOne = e.touches[0]

        // Prevent dragging if image isn't zoomed-in
        if (imgPosition.scale <= 1 || !isPanning) return

        // Assign them to variables to call the function 'getUpdatedImgCoords'
        const event = touchOne
        const startRef = touchOneStartRef

        // Get up-to-date image coordinates with each move
        const [newX, newY] = getUpdatedImgCoords(
          event,
          imgWrapperRef,
          imgRef,
          imgPosition,
          startRef,
        )

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
          const imageWrapperRect = imgWrapperRef.current.getBoundingClientRect()

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
            const imageWrapper = imgWrapperRef.current
            const imageWrapperWidth = imageWrapper.clientWidth
            const imageWrapperHeight = imageWrapper.clientHeight

            // Get image's width and height
            const image = imgRef.current
            const imageWidth = image.width
            const imageHeight = image.height

            /* Zoom upper limit is 6x and lower limit is 1x. Image
              doesn't zoom-out less than the original 1x size */
            const newScale = Math.max(1, Math.min(imgPosition.scale + delta, 6))

            // Growth or shrink factor
            const ratio = 1 - newScale / imgPosition.scale

            // Calculate new coordinates
            let newImgPositionX =
              imgPosition.x + (centerX - imgPosition.x) * ratio
            let newImgPositionY =
              imgPosition.y + (centerY - imgPosition.y) * ratio

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

            // Use functional updates
            setImgPosition((prevImgPosition) => ({
              ...prevImgPosition,
              scale: newScale,
              x: newImgPositionX,
              y: newImgPositionY,
            }))
          }
        }

        // Cache the distance for the next move event
        prevDifferenceRef.current = currentDifference
      }
    }

    // Limit functionality to the image
    /* Default 'passive: true' ignores 'e.preventDefault()' for
    'wheel' event and raises the error "Unable to preventdefault 
    inside passive event listener invocation". To prevent the error
     and prevent scrolling add  'passive: false' */
    gameImage.addEventListener('wheel', handleMouseWheel, { passive: false })
    gameImage.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    })
    gameImage.addEventListener('touchmove', handleTouchMove, { passive: false })

    // Clean up
    return () => {
      gameImage.removeEventListener('wheel', handleMouseWheel)
      gameImage.removeEventListener('touchstart', handleTouchStart)
      gameImage.removeEventListener('touchmove', handleTouchMove)
    }
  }, [isPanning, imgPosition])

  /* ------------------------- Desktop ---------------------------- */

  /* Handlers for panning the image */
  const handleMouseDown = (e) => {
    // Prevent default drag and drop
    e.preventDefault()

    /* 'getBoundingClientRect()' method returns object containing the
     size and position of an element relative to the viewport */
    const imageWrapperRect = imgWrapperRef.current.getBoundingClientRect()

    // Current click coordinates relative to wrapper after mouse down
    const currentX = e.clientX - imageWrapperRect.left
    const currentY = e.clientY - imageWrapperRect.top

    /* Store starting click position relative to the previous offset
      position either because of zoom or drag. This prevents image
      jumping back to the starting position (0, 0) on subsequent clicks
      (mouse downs) */
    dragStartRef.current = {
      x: currentX - imgPosition.x,
      y: currentY - imgPosition.y,
    }

    setIsPanning(true)
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    // Prevent default drag and drop
    e.preventDefault()

    // Prevent dragging if image isn't zoomed-in
    if (imgPosition.scale <= 1 || !isPanning) return

    // If LMB is not held, the pan can't be active
    if (e.buttons % 2 === 0) {
      setIsPanning(false)
      return
    }

    // Assign them to variables to call the function 'getUpdatedImgCoords'
    const event = e
    const startRef = dragStartRef

    // Get up-to-date image coordinates with each mouse move
    const [newX, newY] = getUpdatedImgCoords(
      event,
      imgWrapperRef,
      imgRef,
      imgPosition,
      startRef,
    )

    setImgPosition((prevImgPosition) => ({
      ...prevImgPosition,
      x: newX,
      y: newY,
    }))
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    if (!isPanning) return
    setIsPanning(false)
  }

  /* --------------------- Touch screens -------------------------- */

  const handleTouchEnd = (e) => {
    /* Single finger is off the touch screen after panning is
      concluded or all fingers are off the screen */
    if (e.touches.length === 0) {
      setIsPanning(false)
      prevDifferenceRef.current = null
    } else if (e.touches.length === 1) {
      /* Initiate single finger touch panning after player finished
        pinch to zoom and lifted one finger off the screen */
      // Reset value after two finger pinch gesture concludes
      prevDifferenceRef.current = null

      const touchOne = e.touches[0]

      const imageWrapperRect = imgWrapperRef.current.getBoundingClientRect()

      // Current touch position relative to wrapper after touch
      const currentX = touchOne.clientX - imageWrapperRect.left
      const currentY = touchOne.clientY - imageWrapperRect.top
      touchOneStartRef.current = {
        x: currentX - imgPosition.x,
        y: currentY - imgPosition.y,
      }

      setIsPanning(true)
    }
  }

  /* Save click coordinates for character validation and to display
    dropdown */
  const handleImageClick = (e) => {
    // Don't show dropdown after panning the image
    if (isDragging) return

    // Get elements and their values
    const dropdown = dropdownRef.current
    const dropdownStyles = window.getComputedStyle(dropdown)
    const target = targetRef.current
    const imageWrapperRect = imgWrapperRef.current.getBoundingClientRect()
    const imageRect = imgRef.current.getBoundingClientRect()

    // Get click positions relative to browser
    const clientX = e.clientX
    const clientY = e.clientY

    /* -------------------- Click coordinates --------------------- */

    /* Get click co-ordinates relative to image to find characters at
     any zoom level */
    const imgClickX = clientX - imageRect.left
    const imgClickY = clientY - imageRect.top

    /* Normalize to percentage of width and height instead of absolute 
     values for different screen widths */
    // Multiply by 10000 and divide by 100 to keep 2 decimal places
    const xCoord = Math.floor((imgClickX / imageRect.width) * 10000) / 100
    const yCoord = Math.floor((imgClickY / imageRect.height) * 10000) / 100

    /* -------------------- Dropdown ------------------------------ */

    // Initialize dropdown values
    let dropdownX = 0
    let dropdownY = 0

    /* Get click co-ordinates relative to wrapper to place dropdown
     at the click position */
    const wrapperClickX = clientX - imageWrapperRect.left
    const wrapperClickY = clientY - imageWrapperRect.top

    const dropdownWidth = dropdown.clientWidth
    const dropdownHeight = dropdown.clientHeight

    /* Calculate the remaining width and height of wrapper
    from click position */
    const widthDiff = imageWrapperRect.right - clientX
    const heightDiff = imageWrapperRect.bottom - clientY

    /* Dynamically calculate total horizontal and vertical margin of
     dropdown  */
    const totalMarginX =
      parseInt(dropdownStyles.marginLeft, 10) +
        parseInt(dropdownStyles.marginRight, 10) || 0
    const totalMarginY =
      parseInt(dropdownStyles.marginTop, 10) +
        parseInt(dropdownStyles.marginBottom, 10) || 0

    /* Place the dropdown box based on the click position.
    Dropdown should always appear inside the image wrapper */
    if (widthDiff > dropdownWidth) {
      dropdownX = wrapperClickX
    } else {
      dropdownX = wrapperClickX - dropdownWidth - totalMarginX
    }

    if (heightDiff > dropdownHeight) {
      dropdownY = wrapperClickY
    } else {
      dropdownY = wrapperClickY - dropdownHeight - totalMarginY
    }

    /* --------------------- Target ------------------------------- */

    // Initialize target values
    let targetX = 0
    let targetY = 0

    const targetWidth = target.clientWidth
    const targetHeight = target.clientHeight

    // Place target animation's center at click coordinates
    targetX = wrapperClickX - targetWidth / 2
    targetY = wrapperClickY - targetHeight / 2

    /* --------------------- Setter functions --------------------- */

    /* Reset dropdown position on every second click to prevent 
    scroll bars when screen width changes from wide to narrow */
    if (imgClick) {
      setDropdownPosition((prevDropdownPosition) => ({
        ...prevDropdownPosition,
        x: -9999,
        y: -9999,
      }))
      setTargetPosition((prevTargetPosition) => ({
        ...prevTargetPosition,
        x: -9999,
        y: -9999,
      }))
    } else {
      setImgClickCoords((prevImgClickCoords) => ({
        ...prevImgClickCoords,
        x: xCoord,
        y: yCoord,
      }))
      setDropdownPosition((prevDropdownPosition) => ({
        ...prevDropdownPosition,
        x: dropdownX,
        y: dropdownY,
      }))
      setTargetPosition((prevTargetPosition) => ({
        ...prevTargetPosition,
        x: targetX,
        y: targetY,
      }))
    }

    setImgClick(!imgClick)
  }

  /* Show success or fail message after player chooses a character */
  const handleOptionClick = (e) => {
    // Get character name and it's location status
    const { isMatch, characterId, name } = isCharacterFound(e, imgClickCoords)

    // Get values
    const image = imgRef.current
    const imgWidth = image.width
    const popup = popupRef.current
    const popupWidth = popup.clientWidth

    /* Place popup at the half width of image and then center it
    using 'translateX' */
    let popupX = imgWidth / 2 - popupWidth / 2
    let popupY = 0

    setResult((prevResult) => ({
      ...prevResult,
      isMatch,
      name,
    }))

    /* Add correct guess to an array only if doesn't has it */
    if (isMatch) {
      if (!foundCharacterIds.includes(characterId)) {
        setFoundCharacterIds((prevFoundCharacterIds) => [
          ...prevFoundCharacterIds,
          characterId,
        ])
      }
    }

    setPopupPosition((prevPopupPosition) => ({
      ...prevPopupPosition,
      x: popupX,
      y: popupY,
    }))

    /* Reset */
    setDropdownPosition((prevDropdownPosition) => ({
      ...prevDropdownPosition,
      x: -9999,
      y: -9999,
    }))
    setTargetPosition((prevTargetPosition) => ({
      ...prevTargetPosition,
      x: -9999,
      y: -9999,
    }))
    setImgClick(false)
    // Show popup message
    setIsOption(true)

    /* Hide popup message after 1 second */
    const resetPopup = () => {
      setIsOption(false)

      setPopupPosition((prevPopupPosition) => ({
        ...prevPopupPosition,
        x: -9999,
        y: -9999,
      }))
      setResult((prevResult) => ({
        ...prevResult,
        isMatch: null,
        name: '',
      }))
    }

    window.setTimeout(resetPopup, 1000)
  }

  return (
    <>
      <div className={styles.gameBoardContainer}>
        <div className={styles.gameBoard} ref={imgWrapperRef}>
          {/* Game image  */}
          <GameImage
            imgRef={imgRef}
            handleMouseDown={handleMouseDown}
            handleMouseMove={handleMouseMove}
            handleMouseUp={handleMouseUp}
            handleTouchEnd={handleTouchEnd}
            handleImageClick={handleImageClick}
            imgPosition={imgPosition}
          />

          {/* Dropdown  */}
          <Dropdown
            imgClick={imgClick}
            dropdownPosition={dropdownPosition}
            dropdownRef={dropdownRef}
            handleOptionClick={handleOptionClick}
          />

          {/* Target animation  */}
          <Target
            imgClick={imgClick}
            targetPosition={targetPosition}
            targetRef={targetRef}
          />

          {/* Popup message  */}
          <PopupMessage
            isOption={isOption}
            result={result}
            popupPosition={popupPosition}
            popupRef={popupRef}
          />
        </div>
      </div>
    </>
  )
}

export default GameScene
