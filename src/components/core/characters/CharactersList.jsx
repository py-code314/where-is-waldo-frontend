/* -------------------- Styles -------------------- */
import styles from './CharactersList.module.css'
/* -------------------- Images -------------------- */
import wallyImage from '../../../assets/images/characters/wally.png'
import wendaImage from '../../../assets/images/characters/wenda.png'
import wizardImage from '../../../assets/images/characters/wizard.png'
import odlawImage from '../../../assets/images/characters/odlaw.png'
/* -------------------- Icons -------------------- */
import checkmarkIcon from '../../../assets/icons/icon-checkmark.svg'

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
        <div className={styles.characters}>
          <div className={styles.character}>
            <div className={styles.characterImgContainer}>
              <img
                className={styles.characterImg}
                src={wallyImage}
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
            </div>
            <span className={styles.characterName}>Waldo</span>
          </div>
          <div className={styles.character}>
            <div className={styles.characterImgContainer}>
              <img
                className={styles.characterImg}
                src={wendaImage}
                alt=""
                width={50}
                height={50}
              />
            </div>
            <span className={styles.characterName}>Wenda</span>
          </div>
          <div className={styles.character}>
            <div className={styles.characterImgContainer}>
              <img
                className={styles.characterImg}
                src={wizardImage}
                alt=""
                width={50}
                height={50}
              />
            </div>
            <span className={styles.characterName}>Wizard</span>
          </div>
          <div className={styles.character}>
            <div className={styles.characterImgContainer}>
              <img
                className={styles.characterImg}
                src={odlawImage}
                alt=""
                width={50}
                height={50}
              />
            </div>
            <span className={styles.characterName}>Odlaw</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default CharactersList
