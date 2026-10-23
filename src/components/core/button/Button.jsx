/* -------------------- Styles -------------------- */
import styles from './Button.module.css'

/* Reusable button component */
const Button = ({
  type = 'button',
  id = '',
  className = '',
  title = '',
  onClick,
  onKeyDown,
  ariaLabel,
  ariaExpanded,
  disabled = false,
  children,
}) => {
  // Give every button a default class 'btn'
  const combinedClassName = `${styles.btn} ${styles[className]}`.trim()

  return (
    <button
      type={type}
      id={id}
      className={combinedClassName}
      title={title}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
