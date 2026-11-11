/* -------------------- Styles -------------------- */
import styles from './CharactersList.module.css'
/* -------------------- Icons -------------------- */
import checkmarkIcon from '../../../assets/icons/icon-checkmark.svg'
/* -------------------- Hooks -------------------- */
import { useContext, useEffect } from 'react'
/* -------------------- Context -------------------- */
import { CharacterIdsContext } from '../../../contexts/characters/CharacterIdsContext'
import { StopwatchContext } from '../../../contexts/game-scene/StopwatchContext'
import { ModalContext } from '../../../contexts/modal/ModalContext'
/* -------------------- Data -------------------- */
import { charactersData } from '../../../data/charactersData'

const CharactersList = () => {
  const {setGameOver} = useContext(StopwatchContext)
  const { foundCharacterIds } = useContext(CharacterIdsContext)
  const length = foundCharacterIds.length
  const {setShowModal} = useContext(ModalContext)

  // Stop clock and show modal if all characters are found
  useEffect(() => {
    if (length === 1) {
      setGameOver(true)
      setShowModal(true)
    }
  }, [length, setGameOver, setShowModal])

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
          {charactersData.map((character) => (
            <li className={styles.character} key={character.id}>
              <div className={styles.characterImgContainer}>
                <img
                  className={styles.characterImg}
                  src={character.imgUrl}
                  alt=""
                  width={50}
                  height={50}
                />
                {/* Loop through found characters array and add check marks  */}
                {foundCharacterIds.map(
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
