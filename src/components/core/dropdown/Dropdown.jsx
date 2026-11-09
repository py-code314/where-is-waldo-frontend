/* -------------------- Styles -------------------- */
import styles from './Dropdown.module.css'
/* -------------------- Hooks -------------------- */
import { useContext } from 'react'
/* -------------------- Context -------------------- */
import { CharacterIdsContext } from '../../../contexts/characters/CharacterIdsContext'
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
  imgPosition,
}) => {
  const { foundCharacterIds } = useContext(CharacterIdsContext)



  return (
    <>
      <ul
        className={`${styles.dropdown} ${imgClick ? styles.dropdownOpen : ''}`}
        // style={{
        //   position: 'absolute',
        //   left: `${dropdownPosition.x}%`,
        //   top: `${dropdownPosition.y}%`,
        //   transformOrigin: 'top left', // To prevent visual offset
        //   transform: `scale(${1 / imgPosition.scale})`,
        // }}
        style={{
          position: 'absolute',
          // Calculate dropdown position based on image scale and position
          left: `${dropdownPosition.x * imgPosition.scale + imgPosition.x}px`,
          top: `${dropdownPosition.y * imgPosition.scale + imgPosition.y}px`,
          transformOrigin: 'top left',
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
