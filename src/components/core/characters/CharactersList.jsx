/* -------------------- Styles -------------------- */
import styles from './CharactersList.module.css'
/* -------------------- Icons -------------------- */
import checkmarkIcon from '../../../assets/icons/icon-checkmark.svg'
/* -------------------- Data -------------------- */
import { charactersData } from '../../../data/charactersData'

const CharactersList = () => {
  return (
    <>
      {/* Character head shots  */}
      <div className={styles.charactersContainer}>
        <div className={styles.trackerContainer}>
          <p className={styles.heading}>
            <span className={styles.mobileHidden}>Find</span> characters
          </p>
          <p className={styles.counter}>0/4 Found</p>
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
                <img
                  className={styles.checkmarkIcon}
                  src={checkmarkIcon}
                  alt=""
                  width={20}
                  height={20}
                />
                <span className={styles.characterName}>{character.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default CharactersList
