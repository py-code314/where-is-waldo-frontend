/* ------------------------- Styles ------------------------------- */
import styles from './GameScene.module.css'
/* ------------------------- Hooks -------------------------------- */
import { useEffect, useState, useRef, useContext } from 'react'
/* -------------------- Context -------------------- */
import { ResultContext } from '../../../contexts/game-scene/ResultContext.jsx'
import { CharacterIdsContext } from '../../../contexts/characters/CharacterIdsContext.jsx'
/* ------------------------- Components --------------------------- */
import PopupMessage from '../../core/popup/PopupMessage'
import Dropdown from '../../core/dropdown/Dropdown'
import GameImage from '../../core/image/GameImage.jsx'
import Target from '../../core/target/Target.jsx'
/* ------------------------- Functions ---------------------------- */
import { isCharacterFound, getUpdatedImgCoords } from '../../../utils/index.js'

const GameScene = () => {
  const { setResult } = useContext(ResultContext)
  const { foundCharacterIds, setFoundCharacterIds } =
    useContext(CharacterIdsContext)

  /* ----------------------- State -------------------------------- */

  const [imgClick, setImgClick] = useState(false)
  const [isPanning, setIsPanning] = useState(false)
  // State to not display dropdown after panning the image
  const [isDragging, setIsDragging] = useState(false)
  // Track option click
  const [isOption, setIsOption] = useState(false)
  // Initial image container position and scale
  const [imgContainerPosition, setImgContainerPosition] = useState({
    x: 0,
    y: 0,
    scale: 1,
  })
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
  const imgContainerRef = useRef(null)
  const gameBoardRef = useRef(null)
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
      const newScale = Math.max(
        1,
        Math.min(imgContainerPosition.scale + delta, 4),
      )

      // Growth or shrink factor
      const ratio = 1 - newScale / imgContainerPosition.scale

      /* Enables cursor centered zooming rather than zooming at the
       top left corner (0, 0) */
      let newImgContainerPositionX =
        imgContainerPosition.x + (e.clientX - imgContainerPosition.x) * ratio
      let newImgContainerPositionY =
        imgContainerPosition.y + (e.clientY - imgContainerPosition.y) * ratio

      // Get wrapper's width and height
      const gameBoard = gameBoardRef.current
      const gameBoardWidth = gameBoard.clientWidth
      const gameBoardHeight = gameBoard.clientHeight

      // Get image container's width and height
      const imgContainer = imgContainerRef.current.getBoundingClientRect()
      const imgContainerWidth = imgContainer.width
      const imgContainerHeight = imgContainer.height

      // Get scaled width and height
      const scaledImgContainerWidth = imgContainerWidth * newScale
      const scaledImgContainerHeight = imgContainerHeight * newScale

      /* Set boundaries to prevent gaps between the image container and
        wrapper at corners when zooming out */
      const maxX = 0
      const maxY = 0
      const minX = gameBoardWidth - scaledImgContainerWidth
      const minY = gameBoardHeight - scaledImgContainerHeight

      // Update X and Y if they go out of boundaries
      if (newImgContainerPositionX > maxX) {
        newImgContainerPositionX = maxX
      } else if (newImgContainerPositionX < minX) {
        newImgContainerPositionX = minX
      }
      if (newImgContainerPositionY > maxY) {
        newImgContainerPositionY = maxY
      } else if (newImgContainerPositionY < minY) {
        newImgContainerPositionY = minY
      }

      setImgContainerPosition((prevImgContainerPosition) => ({
        ...prevImgContainerPosition,
        scale: newScale,
        x: newImgContainerPositionX,
        y: newImgContainerPositionY,
      }))
    }

    /* ----------------------- Touch screens ------------------------ */

    /* Don't put 'preventDefault()' inside the handler as it prevents
    'click' event from firing as it is needed for 'tap' gesture. And
    the 'click' event runs 'handleImageClick()' which displays dropdown */
    const handleTouchStart = (e) => {
      /* 'getBoundingClientRect()' method returns object containing the
      size and position of an element relative to the viewport */
      const imageWrapperRect = gameBoardRef.current.getBoundingClientRect()

      if (e.touches.length === 1) {
        // Single finger touch (panning)
        const touchOne = e.touches[0]

        // Current touch position relative to wrapper
        const currentX = touchOne.clientX - imageWrapperRect.left
        const currentY = touchOne.clientY - imageWrapperRect.top
        touchOneStartRef.current = {
          x: currentX - imgContainerPosition.x,
          y: currentY - imgContainerPosition.y,
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
          x: currentTouchOneX - imgContainerPosition.x,
          y: currentTouchOneY - imgContainerPosition.y,
        }

        const currentTouchTwoX = touchTwo.clientX - imageWrapperRect.left
        const currentTouchTwoY = touchTwo.clientY - imageWrapperRect.top
        touchTwoStartRef.current = {
          x: currentTouchTwoX - imgContainerPosition.x,
          y: currentTouchTwoY - imgContainerPosition.y,
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
        if (imgContainerPosition.scale <= 1 || !isPanning) return

        // Assign them to variables to call the function 'getUpdatedImgCoords'
        const event = touchOne
        const startRef = touchOneStartRef

        // Get up-to-date image coordinates with each move
        const [newX, newY] = getUpdatedImgCoords(
          event,
          gameBoardRef,
          imgContainerRef,
          imgContainerPosition,
          startRef,
        )

        setImgContainerPosition((prevImgContainerPosition) => ({
          ...prevImgContainerPosition,
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
          const imageWrapperRect = gameBoardRef.current.getBoundingClientRect()

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
            const imageWrapper = gameBoardRef.current
            const imageWrapperWidth = imageWrapper.clientWidth
            const imageWrapperHeight = imageWrapper.clientHeight

            // Get image's width and height
            const image = imgContainerRef.current
            const imageWidth = image.width
            const imageHeight = image.height

            /* Zoom upper limit is 6x and lower limit is 1x. Image
              doesn't zoom-out less than the original 1x size */
            const newScale = Math.max(
              1,
              Math.min(imgContainerPosition.scale + delta, 6),
            )

            // Growth or shrink factor
            const ratio = 1 - newScale / imgContainerPosition.scale

            // Calculate new coordinates
            let newImgContainerPositionX =
              imgContainerPosition.x +
              (centerX - imgContainerPosition.x) * ratio
            let newImgContainerPositionY =
              imgContainerPosition.y +
              (centerY - imgContainerPosition.y) * ratio

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
            if (newImgContainerPositionX > maxX) {
              newImgContainerPositionX = maxX
            } else if (newImgContainerPositionX < minX) {
              newImgContainerPositionX = minX
            }
            if (newImgContainerPositionY > maxY) {
              newImgContainerPositionY = maxY
            } else if (newImgContainerPositionY < minY) {
              newImgContainerPositionY = minY
            }

            // Use functional updates
            setImgContainerPosition((prevImgContainerPosition) => ({
              ...prevImgContainerPosition,
              scale: newScale,
              x: newImgContainerPositionX,
              y: newImgContainerPositionY,
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
  }, [isPanning, imgContainerPosition, imgClickCoords])

  /* ------------------------- Desktop ---------------------------- */

  /* Handlers for panning the image */
  const handleMouseDown = (e) => {
    // Prevent default drag and drop
    e.preventDefault()

    /* 'getBoundingClientRect()' method returns object containing the
     size and position of an element relative to the viewport */
    const gameBoardRect = gameBoardRef.current.getBoundingClientRect()

    // Current click coordinates relative to wrapper
    const currentX = e.clientX - gameBoardRect.left
    const currentY = e.clientY - gameBoardRect.top

    /* Store starting click position relative to the previous offset
      position either because of zoom or drag. This prevents image
      jumping back to the starting position (0, 0) on subsequent clicks
      (mouse downs) */
    dragStartRef.current = {
      x: currentX - imgContainerPosition.x,
      y: currentY - imgContainerPosition.y,
    }

    setIsPanning(true)
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    // Prevent default drag and drop
    e.preventDefault()

    // Prevent dragging if image isn't zoomed-in
    if (imgContainerPosition.scale <= 1 || !isPanning) return

    // If LMB is not held, the pan can't be active
    if (e.buttons % 2 === 0) {
      setIsPanning(false)
      return
    }

    // Assign them to variables to call the function 'getUpdatedImgCoords'
    const event = e
    const startRef = dragStartRef

    // Get up-to-date image coordinates with each mouse move
    let [newX, newY] = getUpdatedImgCoords(
      event,
      gameBoardRef,
      imgContainerRef,
      imgContainerPosition,
      startRef,
    )

    const gameBoard = gameBoardRef.current
    const gameBoardWidth = gameBoard.clientWidth
    const gameBoardHeight = gameBoard.clientHeight

    const imgContainerRect = imgContainerRef.current.getBoundingClientRect()
    const imgContainerWidth = imgContainerRect.width
    const imgContainerHeight = imgContainerRect.height

    /* Set boundaries to prevent gaps between the imgContainer and
        wrapper at corners when zooming out */
    const maxX = 0
    const maxY = 0
    const minX = gameBoardWidth - imgContainerWidth
    const minY = gameBoardHeight - imgContainerHeight

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

    setImgContainerPosition((prevImgContainerPosition) => ({
      ...prevImgContainerPosition,
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

      const imageWrapperRect = gameBoardRef.current.getBoundingClientRect()

      // Current touch position relative to wrapper after touch
      const currentX = touchOne.clientX - imageWrapperRect.left
      const currentY = touchOne.clientY - imageWrapperRect.top
      touchOneStartRef.current = {
        x: currentX - imgContainerPosition.x,
        y: currentY - imgContainerPosition.y,
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
    const gameBoardRect = gameBoardRef.current.getBoundingClientRect()
    /* Using 'imgRect' variable instead of 'imgContainerRect' for
    convenience as their values are same */
    const imgRect = e.target.getBoundingClientRect()

    // Get click positions relative to browser
    const clientX = e.clientX
    const clientY = e.clientY

    /* -------------------- Click coordinates --------------------- */

    /* Get click co-ordinates relative to image to find characters at
     any zoom level */
    const imgClickX = clientX - imgRect.left
    const imgClickY = clientY - imgRect.top

    /* Normalize to percentage of width and height instead of absolute 
     values for different screen widths which also works for zoom */
    const xPercent = (imgClickX / imgRect.width) * 100
    const yPercent = (imgClickY / imgRect.height) * 100

    /* -------------------- Dropdown ------------------------------ */

    /* Get click co-ordinates relative to wrapper to place dropdown
     at the click position */
    const clickX = clientX - gameBoardRect.left
    const clickY = clientY - gameBoardRect.top

    const dropdownWidth = dropdown.clientWidth
    const dropdownHeight = dropdown.clientHeight

    /* Calculate the remaining width and height of wrapper
    from click position */
    const widthDiff = gameBoardRect.right - clientX
    const heightDiff = gameBoardRect.bottom - clientY

    // Flip dropdown based on how much width/bottom left
    let dropdownX = clickX
    if (widthDiff < dropdownWidth) {
      dropdownX = clickX - dropdownWidth
    }

    let dropdownY = clickY
    if (heightDiff < dropdownHeight) {
      dropdownY = clickY - dropdownHeight
    }

    /* Get raw pixels which can be used to calculate the position at
    render time */
    const unscaledX =
      (dropdownX - imgContainerPosition.x) / imgContainerPosition.scale
    const unscaledY =
      (dropdownY - imgContainerPosition.y) / imgContainerPosition.scale

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
        x: xPercent,
        y: yPercent,
      }))

      /* Save unscaled values to recalculate position on every click
      because it is outside of image container */
      setDropdownPosition((prevDropdownPosition) => ({
        ...prevDropdownPosition,
        x: unscaledX,
        y: unscaledY,
      }))

      // Target anchors to click position
      setTargetPosition((prevTargetPosition) => ({
        ...prevTargetPosition,
        x: xPercent,
        y: yPercent,
      }))
    }

    setImgClick(!imgClick)
  }

  /* Show success or fail message after player chooses a character */
  const handleOptionClick = (e) => {
    // Get character name and it's location status
    const { isMatch, characterId, name } = isCharacterFound(e, imgClickCoords)

    // Get values
    const image = imgContainerRef.current
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
        <div className={styles.gameBoard} ref={gameBoardRef}>
          <div
            className={styles.imgContainer}
            ref={imgContainerRef}
            style={{
              transformOrigin: '0 0',
              transform: `translate(${imgContainerPosition.x}px, ${imgContainerPosition.y}px) scale(${imgContainerPosition.scale})`,
            }}>
            {/* Game image  */}
            <GameImage
              imgRef={imgRef}
              handleMouseDown={handleMouseDown}
              handleMouseMove={handleMouseMove}
              handleMouseUp={handleMouseUp}
              handleTouchEnd={handleTouchEnd}
              handleImageClick={handleImageClick}
            />

            {/* Target animation  */}
            <Target
              imgClick={imgClick}
              targetPosition={targetPosition}
              targetRef={targetRef}
              imgContainerPosition={imgContainerPosition}
            />

            {/* Popup message  */}
            <PopupMessage
              isOption={isOption}
              popupPosition={popupPosition}
              popupRef={popupRef}
            />
          </div>
        </div>

        {/* Place dropdown out of hidden container to make it overflow  */}
        <Dropdown
          imgContainerRef={imgContainerRef}
          imgClick={imgClick}
          dropdownPosition={dropdownPosition}
          dropdownRef={dropdownRef}
          handleOptionClick={handleOptionClick}
          imgContainerPosition={imgContainerPosition}
        />
      </div>
    </>
  )
}

export default GameScene
