/* ------------------------- Styles ------------------------------- */
import styles from './Target.module.css'

const Target = ({ imgClick, targetPosition, targetRef }) => {
  return (
    <>
      <span
        className={`${styles.target} ${imgClick ? styles.targetOpen : ''}`}
        style={{
          position: 'absolute',
          left: `${targetPosition.x}px`,
          top: `${targetPosition.y}px`,
        }}
        ref={targetRef}></span>
    </>
  )
}

export default Target
