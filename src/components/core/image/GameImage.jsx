/* ------------------------- Styles ------------------------------- */
import styles from './GameImage.module.css'
/* ------------------------- Hooks ------------------------------- */
import { useContext } from 'react'
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
  const { imageUrl, imageAlt } = useContext(SceneDataContext)
  const {setHasImgError} = useContext(GameSessionContext)

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
        onError={() => setHasImgError(true)}
      />
    </>
  )
}

export default GameImage
