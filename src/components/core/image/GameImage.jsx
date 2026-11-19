/* ------------------------- Styles ------------------------------- */
import styles from './GameImage.module.css'

const GameImage = ({
  imgRef,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleTouchEnd,
  handleImageClick,
  imageUrl,
  imageAlt,
}) => {
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
