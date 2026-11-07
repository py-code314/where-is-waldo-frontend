/* -------------------- Styles -------------------- */
import styles from './Dropdown.module.css'
/* -------------------- Components -------------------- */
import Button from '../button/Button'

/* Display character options list for the player to select */
const Dropdown = ({
  imgClick,
  dropdownPosition,
  dropdownRef,
  handleOptionClick,
}) => {
  return (
    <>
      <ul
        className={`${styles.dropdown} ${imgClick ? styles.dropdownOpen : ''}`}
        style={{
          position: 'absolute',
          left: `${dropdownPosition.x}px`,
          top: `${dropdownPosition.y}px`,
        }}
        ref={dropdownRef}>
        <li className={styles.select}>Who is this?</li>
        {/* // TODO: Disable button if the character is found  */}
        <li>
          <Button className="optionBtn" onClick={handleOptionClick}>
            Wally
          </Button>
        </li>
        <li>
          <Button className="optionBtn" onClick={handleOptionClick}>
            Wenda
          </Button>
        </li>
        <li>
          <Button className="optionBtn" onClick={handleOptionClick}>
            Wizard
          </Button>
        </li>
        <li>
          <Button className="optionBtn" onClick={handleOptionClick}>
            Odlaw
          </Button>
        </li>
      </ul>
    </>
  )
}

export default Dropdown
