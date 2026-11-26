/* -------------------- Styles -------------------- */
import styles from './Dropdown.module.css'
/* -------------------- Hooks -------------------- */
import { useCallback, useContext } from 'react'
/* -------------------- Context -------------------- */
import { SceneDataContext } from '../../../contexts/game-scene/SceneDataContext'
import { ResultContext } from '../../../contexts/game-scene/ResultContext'
/* -------------------- Components -------------------- */
import Button from '../button/Button'

/* Display character options list for the player to select */
const Dropdown = ({
  imgClick,
  dropdownPosition,
  dropdownRef,
  handleCharacterClick,
  imgContainerPosition,
}) => {
  // Context
  const { sceneCharacters } = useContext(SceneDataContext)
  const { result } = useContext(ResultContext)
  const { foundCharacters } = result

  /* Using arrow functions in JSX props leads to unnecessary re-renders */
  const handleClick = useCallback(
    (e) => {
      const id = e.target.dataset.id
      handleCharacterClick(id)
    },
    [handleCharacterClick]
  )

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
            /* Disable character button to prevent selecting the same character after the match */
            <li key={character.id}>
              <Button
                id={character.id}
                dataId={character.id}
                className="optionBtn"
                onClick={handleClick}
                disabled={foundCharacters.includes(character.id)}>
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
