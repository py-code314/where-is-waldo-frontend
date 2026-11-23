/* -------------------- Styles -------------------- */
import styles from './CharactersList.module.css'
/* -------------------- Icons -------------------- */
import checkmarkIcon from '../../../assets/icons/icon-checkmark.svg'
/* -------------------- Hooks -------------------- */
import { useContext,  } from 'react'
/* -------------------- Context -------------------- */
// import { StopwatchContext } from '../../../contexts/game-scene/StopwatchContext'
import { ResultContext } from '../../../contexts/game-scene/ResultContext'

const CharactersList = ({ characters }) => {
  // Data
  const sceneCharacters = characters.map((character) => character.character)

  // Context
  const { result } = useContext(ResultContext)
  const { foundCharacters,  } = result
  const length = foundCharacters.length

  return (
    <>
      {/* Character head shots  */}
      <div className={styles.charactersContainer}>
        <div className={styles.trackerContainer}>
          <p className={styles.heading}>
            <span className={styles.mobileHidden}>Find</span> characters
          </p>
          <p className={styles.counter}>{length}/4 Found</p>
        </div>

        {/* Loop through characters list  */}
        <ul className={styles.characters}>
          {sceneCharacters.map((character) => (
            <li className={styles.character} key={character.id}>
              <div className={styles.characterImgContainer}>
                <img
                  className={styles.characterImg}
                  src={character.avatarUrl}
                  alt=""
                  width={50}
                  height={50}
                />
                {/* Loop through found characters array and add check marks  */}
                {foundCharacters.map(
                  (characterId) =>
                    characterId === character.id && (
                      <img
                        key={character.id}
                        className={styles.checkmark}
                        src={checkmarkIcon}
                        alt=""
                        width={20}
                        height={20}
                      />
                    ),
                )}
              </div>
              <span className={styles.characterName}>{character.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default CharactersList
