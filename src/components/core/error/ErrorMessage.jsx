/* -------------------- Styles -------------------- */
import styles from './ErrorMessage.module.css'
/* -------------------- Icons -------------------- */
import errorIcon from '../../../assets/icons/icon-error-6.svg'
import backIcon from '../../../assets/icons/icon-back.svg'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'

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
        {/* Back to Home link  */}
        <Link className={styles.homeLink} to={'/home'} aria-label="Go to home">
          <img
            className={styles.backIcon}
            src={backIcon}
            alt=""
            width={20}
            height={20}
            aria-hidden="true"
          />
          Back to Home
        </Link>
      </div>
    </>
  )
}

export default ErrorMessage
