/* ------------------------- Styles ------------------------------- */
import styles from './Target.module.css'

const Target = ({ imgClick, targetPosition, targetRef, imgContainerPosition }) => {
  return (
    <>
      <span
        className={`${styles.target} ${imgClick ? styles.targetOpen : ''}`}
        style={{
          position: 'absolute',
          // Calculate target position in line with image scaling
          left: `${targetPosition.x * imgContainerPosition.scale + imgContainerPosition.x}px`,
          top: `${targetPosition.y * imgContainerPosition.scale + imgContainerPosition.y}px`,
          // Place target in the middle of click position
          transform: `translate(-50%, -50%)`,
        }}
        ref={targetRef}></span>
    </>
  )
}

export default Target
