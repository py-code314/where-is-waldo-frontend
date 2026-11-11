/* ---------------------- Styles ---------------------------------- */
import styles from './GameCompleteModal.module.css'
/* ---------------------- Icons ---------------------------------- */
import closeIcon from '../../../assets/icons/icon-close-1.svg'
// import successIcon from '../../../assets/icons/icon-success.svg'
/* ---------------------- Hooks ------------------------------ */
import { useContext } from 'react'
/* ---------------------- Context ------------------------------ */
import { ModalContext } from '../../../contexts/modal/ModalContext'
/* ---------------------- Components ------------------------------ */
import Button from '../../core/button/Button'

const GameCompleteModal = ({ modalRef }) => {
  const { setShowModal } = useContext(ModalContext)

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
          <img className={styles.closeIcon} src={closeIcon} alt="" width={20} height={20} />
        </Button>
     
      </dialog>
    </>
  )
}

export default GameCompleteModal
