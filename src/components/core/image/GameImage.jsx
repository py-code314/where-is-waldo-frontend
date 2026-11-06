/* ------------------------- Styles ------------------------------- */
import styles from './GameImage.module.css'
/* ------------------------- Images ------------------------------- */
import skiingImage from '../../../assets/images/puzzles/skiing-scene.webp'

const GameImage = ({
  imgRef,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleTouchEnd,
  handleImageClick,
  imgPosition,
}) => {
  return (
    <>
      <img
        ref={imgRef}
        className={styles.gameImg}
        src={skiingImage}
        alt="A crowded ski resort on a snowy mountain with many skiers wearing colorful winter jackets."
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
        onClick={handleImageClick}
        style={{
          transformOrigin: '0 0',
          transform: `translate(${imgPosition.x}px, ${imgPosition.y}px) scale(${imgPosition.scale})`,
        }}
      />
    </>
  )
}

export default GameImage
