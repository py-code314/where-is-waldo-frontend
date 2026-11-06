/* -------------------- Styles -------------------- */
import styles from './PopupMessage.module.css'

const PopupMessage = ({ isOption, result, popupPosition, popupRef }) => {
  return (
    <>
      {/* Popup with success or failure message  */}
      <div
        className={`${styles.popup} ${isOption ? styles.popupOpen : ''} ${result.isCharacter === true ? styles.yay : result.isCharacter === false ? styles.nope : ''}`}
        style={{
          position: 'absolute',
          left: `${popupPosition.x}px`,
          top: `${popupPosition.y}px`,
        }}
        ref={popupRef}>
        {result.isCharacter === true ? (
          <p className={styles.message}>You found {result.name}! </p>
        ) : result.isCharacter === false ? (
          <p className={styles.message}> {result.name} is not there</p>
        ) : null}
      </div>
    </>
  )
}

export default PopupMessage
