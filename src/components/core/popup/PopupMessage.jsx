/* -------------------- Styles -------------------- */
import styles from './PopupMessage.module.css'
/* -------------------- Hooks -------------------- */
import { useContext } from 'react'
/* -------------------- Context -------------------- */
import { ResultContext } from '../../../contexts/game-scene/ResultContext'

const PopupMessage = ({ isOption, popupPosition, popupRef }) => {
  const { result } = useContext(ResultContext)
  
  return (
    <>
      {/* Popup with success or failure message  */}
      <div
        className={`${styles.popup} ${isOption ? styles.popupOpen : ''} ${result.isMatch === true ? styles.yay : result.isMatch === false ? styles.nope : ''}`}
        style={{
          position: 'absolute',
          left: `${popupPosition.x}px`,
          top: `${popupPosition.y}px`,
        }}
        ref={popupRef}>
        {result.isMatch === true ? (
          <p className={styles.message}>You found {result.name}! </p>
        ) : result.isMatch === false ? (
          <p className={styles.message}> {result.name} is not there</p>
        ) : null}
      </div>
    </>
  )
}

export default PopupMessage
