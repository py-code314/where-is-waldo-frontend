/* ---------------------- Styles ---------------------------------- */
import styles from './GameCompleteModal.module.css'
/* ---------------------- Icons ---------------------------------- */
import closeIcon from '../../../assets/icons/icon-close-1.svg'
import successIcon from '../../../assets/icons/icon-success.svg'
import errorIcon from '../../../assets/icons/icon-error-1.svg'
/* ---------------------- Hooks ------------------------------ */
import { useContext, useRef, useState } from 'react'
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

  const nameInputRef = useRef(null)

  // State variables
  const [formData, setformData] = useState({ name: '' })
  const [validFormData, setValidFormData] = useState({ name: null })
  const [errorMsgs, setErrorMsgs] = useState({ name: '' })

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleNameChange = () => {}
  const handleFormSubmit = () => {}

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

        <form className={styles.form} noValidate onSubmit={handleFormSubmit}>
          {/* Name input */}
          <div className={styles.formControl}>
            <label htmlFor="name" className={styles.formLabel}>
              Enter your name
            </label>

            <input
              type="name"
              name="name"
              id="name"
              placeholder="Wally"
              className={styles.formInput}
              required
              value={formData.name}
              onChange={handleNameChange}
              ref={nameInputRef}
            />

            {validFormData.name === false && (
              <div className={styles.formError}>
                <img
                  className={styles.formErrorIcon}
                  aria-hidden="true"
                  src={errorIcon}
                  alt=""
                  width={16}
                  height={16}
                />
                <p
                  className={styles.formErrorMsg}
                  aria-live="polite"
                  id="invalid-name">
                  {errorMsgs.name}
                </p>
              </div>
            )}
          </div>

          {/* Submit button */}
          <Button className="saveBtn" title="Save" type="submit">
            Save to Leaderboard
          </Button>
        </form>
      </dialog>
    </>
  )
}

export default GameCompleteModal
