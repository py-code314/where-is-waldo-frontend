/* ------------------------- Styles ------------------------------- */
import styles from './GameImage.module.css'
/* ------------------------- Hooks ------------------------------- */
import { useContext } from 'react'
/* ------------------------- Context ------------------------------- */
import { SceneDataContext } from '../../../contexts/game-scene/SceneDataContext'

const GameImage = ({
  imgRef,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleTouchEnd,
  handleImageClick,
}) => {
  const { imageUrl, imageAlt } = useContext(SceneDataContext)

  return (
    <>
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
      />
    </>
  )
}

export default GameImage
