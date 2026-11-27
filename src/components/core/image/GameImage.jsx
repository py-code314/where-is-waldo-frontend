/* ------------------------

 Might add keyboard support for game play later. Adding inline disable comments for now to suppress the warnings/errors 
 
------------------------ */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

/* ------------------------- Styles ------------------------------- */
import styles from './GameImage.module.css'
/* ------------------------- Hooks ------------------------------- */
import { useCallback, useContext } from 'react'
/* ------------------------- Context ------------------------------- */
import { SceneDataContext } from '../../../contexts/game-scene/SceneDataContext'
import { GameSessionContext } from '../../../contexts/game-session/GameSessionContext'

const GameImage = ({
  imgRef,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleTouchEnd,
  handleImageClick,
}) => {
  // Context
  const { imageUrl, imageAlt } = useContext(SceneDataContext)
  const { setHasImgError } = useContext(GameSessionContext)

  const handleError = useCallback(() => {
    setHasImgError(true)
  }, [setHasImgError])

  return (
    <>
      {/* 'onError' fires when image fails to load  */}
      {/* Don't use arrow functions in props  to prevent unnecessary re-renders */}
      <img
        ref={imgRef}
        className={styles.gameImg}
        src={imageUrl}
        alt={imageAlt}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
        onClick={handleImageClick}
        onError={handleError}
      />
    </>
  )
}

export default GameImage
