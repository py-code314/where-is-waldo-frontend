/* -------------------- Styles -------------------- */
import styles from './Dropdown.module.css'
/* -------------------- Hooks -------------------- */
import { useContext } from 'react'
/* -------------------- Context -------------------- */
// import { CharacterIdsContext } from '../../../contexts/characters/CharacterIdsContext'
import { SceneDataContext } from '../../../contexts/game-scene/SceneDataContext'
/* -------------------- Components -------------------- */
import Button from '../button/Button'

/* Display character options list for the player to select */
const Dropdown = ({
  imgClick,
  dropdownPosition,
  dropdownRef,
  handleOptionClick,
  imgContainerPosition,
}) => {
  // const { foundCharacterIds } = useContext(CharacterIdsContext)
  const { sceneCharacters } = useContext(SceneDataContext)
  
  // TODO: Disable buttons after the match

  return (
    <>
      <ul
        className={`${styles.dropdown} ${imgClick ? styles.dropdownOpen : ''}`}
        style={{
          position: 'absolute',
          // Calculate dropdown position based on image container's scale and position
          left: `${dropdownPosition.x * imgContainerPosition.scale + imgContainerPosition.x}px`,
          top: `${dropdownPosition.y * imgContainerPosition.scale + imgContainerPosition.y}px`,
          transformOrigin: 'top left',
        }}
        ref={dropdownRef}>
        <li className={styles.select}>Who is this?</li>
        {sceneCharacters.map((character) => {
          return (
            <li key={character.id}>
              <Button
                id={character.id}
                className="optionBtn"
                onClick={() => handleOptionClick(character.id)}
                disabled={sceneCharacters.includes(character.id)}>
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
