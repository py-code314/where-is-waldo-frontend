/* -------------------- Styles -------------------- */
import styles from './ErrorMessage.module.css'
/* -------------------- Icons -------------------- */
import errorIcon from '../../../assets/icons/icon-error-6.svg'

/* Component to display error message when fetching data fails */
const ErrorMessage = ({ error }) => {
  return (
    <>
      <div className={styles.error}>
        <div className={styles.errorContainer}>
          <div className={styles.imgWrapper}>
            <img
              className={styles.errorIcon}
              src={errorIcon}
              alt=""
              width={70}
              height={70}
            />
          </div>
          {/* Show error info */}
          <div>
            <p className={styles.errorStatus}>{error.status}</p>
            <p className={styles.errorTitle}>{error.title}</p>
          </div>
        </div>
        <p className={styles.errorMsg}>{error.message}</p>
      </div>
    </>
  )
}

export default ErrorMessage
