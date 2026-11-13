/* ---------------------- Styles ---------------------------------- */
import styles from './GameCompleteModal.module.css'
/* ---------------------- Icons ---------------------------------- */
import closeIcon from '../../../assets/icons/icon-close.svg'
import successIcon from '../../../assets/icons/icon-success.svg'
import errorIcon from '../../../assets/icons/icon-error-1.svg'
import trophyIcon from '../../../assets/icons/icon-trophy.svg'
/* ---------------------- Hooks ------------------------------ */
import { useContext, useRef, useState } from 'react'
/* ---------------------- Context ------------------------------ */
import { ModalContext } from '../../../contexts/modal/ModalContext'
import { DurationContext } from '../../../contexts/stopwatch/DurationContext'
/* ---------------------- Components ------------------------------ */
import { Link } from 'react-router'
import Button from '../../core/button/Button'
/* ---------------------- Functions ------------------------------ */
import { formatTime } from '../../../utils/index.js'

const GameCompleteModal = ({ modalRef }) => {
  const { setShowModal } = useContext(ModalContext)
  const { duration } = useContext(DurationContext)
  const formattedTime = formatTime(duration)
  // TODO: add datetime value

  const nameInputRef = useRef(null)

  // State variables
  const [formData, setformData] = useState({ name: '' })
  const [validFormData, setValidFormData] = useState({ name: null })
  const [errorMsgs, setErrorMsgs] = useState({ name: '' })

  const handleCloseModal = () => {
    console.log('change modal status')
    setShowModal(false)
  }

  const handleNameChange = () => {}
  const handleFormSubmit = () => {}

  return (
    <>
      <dialog className={styles.modal} ref={modalRef}>
        <div className={styles.contentContainer}>
          {/* Close button */}
          <Button
            className="closeBtn"
            title="Close modal"
            onClick={handleCloseModal}>
            <img
              className={styles.closeIcon}
              src={closeIcon}
              alt=""
              width={22}
              height={22}
            />
          </Button>
          <div className={styles.content}>
            <div className={styles.subContent}>
              <img className={styles.successIcon} src={successIcon} alt="" width={50} height={50} />
              <p className={styles.successMsg}>All Characters Found!</p>
            </div>
            <div className={styles.time}>
              <p className={styles.timeText}>Completion Time:</p>
              <time className={styles.duration} dateTime="">{formattedTime}</time>
            </div>
            <div className={styles.subContent}>
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
              {/* Link to top scores  */}
              <Link className={styles.scoresLink}><img className={styles.trophyIcon} src={trophyIcon} alt="" width={20} height={20} />Top Scores</Link>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default GameCompleteModal
