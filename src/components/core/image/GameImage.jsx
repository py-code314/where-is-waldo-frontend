/* ------------------------- Styles ------------------------------- */
import styles from './GameImage.module.css'
/* ------------------------- Images ------------------------------- */
// import foodCourtImage from '../../../assets/images/puzzles/scene-food-court.webp'
// import spaceStationImage from '../../../assets/images/puzzles/scene-space-station.webp'
import skiingImage from '../../../assets/images/puzzles/skiing-scene.webp'

const GameImage = ({
  imgRef,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleTouchEnd,
  handleImageClick,
}) => {
  return (
    <>
      <img
        ref={imgRef}
        className={styles.gameImg}
        // src={foodCourtImage}
        // src={spaceStationImage}
        src={skiingImage}
        alt="A crowded ski resort on a snowy mountain with many skiers wearing colorful winter jackets."
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
