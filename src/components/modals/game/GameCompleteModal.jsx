/* ---------------------- Styles ---------------------------------- */
import styles from './GameCompleteModal.module.css'
/* ---------------------- Icons ---------------------------------- */
import closeIcon from '../../../assets/icons/icon-close-1.svg'
import successIcon from '../../../assets/icons/icon-success.svg'
/* ---------------------- Hooks ------------------------------ */
import { useContext } from 'react'
/* ---------------------- Context ------------------------------ */
import { ModalContext } from '../../../contexts/modal/ModalContext'
import { DurationContext } from '../../../contexts/stopwatch/DurationContext'
/* ---------------------- Components ------------------------------ */
import Button from '../../core/button/Button'
/* ---------------------- Functions ------------------------------ */
import { formatTime } from '../../../utils/index.js'

const GameCompleteModal = ({ modalRef }) => {
  const { setShowModal } = useContext(ModalContext)
  const { duration } = useContext(DurationContext)
  
  const formattedTime = formatTime(duration)

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <dialog className={styles.modal} ref={modalRef}>
        {/* Close button */}
        <Button
          className="closeBtn"
          title="Close modal"
          onClick={handleCloseModal}>
          <img
            className={styles.closeIcon}
            src={closeIcon}
            alt=""
            width={20}
            height={20}
          />
        </Button>

        <img src={successIcon} alt="" width={40} height={40} />
        <p>All Characters Found!</p>
        <p>Completion Time:</p>
        <time dateTime="">{formattedTime}</time>
      </dialog>
    </>
  )
}

export default GameCompleteModal
