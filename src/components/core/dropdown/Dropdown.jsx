/* -------------------- Styles -------------------- */
import styles from './Dropdown.module.css'
/* -------------------- Data -------------------- */
import { charactersData } from '../../../data/charactersData'
/* -------------------- Components -------------------- */
import Button from '../button/Button'

/* Display character options list for the player to select */
const Dropdown = ({
  imgClick,
  dropdownPosition,
  dropdownRef,
  handleOptionClick,
  foundCharacterIds,
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
        {charactersData.map((character) => {
          return (
            <li key={character.id}>
              <Button
                className="optionBtn"
                dataId={character.id}
                onClick={handleOptionClick}
                disabled={foundCharacterIds.includes(character.id)}>
                {character.name}
              </Button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Dropdown
