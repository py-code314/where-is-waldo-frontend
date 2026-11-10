/* ------------------------- Styles ------------------------------- */
import styles from './Target.module.css'

const Target = ({ imgClick, targetPosition, targetRef, imgContainerPosition }) => {
  return (
    <>
      <span
        className={`${styles.target} ${imgClick ? styles.targetOpen : ''}`}
        style={{
          position: 'absolute',
          left: `${targetPosition.x}%`,
          top: `${targetPosition.y}%`,
          // Place target in the middle of click position
          transform: `translate(-50%, -50%) scale(${1 / imgContainerPosition.scale})`,
        }}
        ref={targetRef}></span>
    </>
  )
}

export default Target
