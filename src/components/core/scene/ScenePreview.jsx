/* -------------------- Styles -------------------- */
import styles from './ScenePreview.module.css'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'

/* Display previews of each scene */
const ScenePreview = ({ cardData }) => {
  // Data
  const { title, description, previewUrl, previewAlt, difficulty, characters } =
    cardData
  const sceneCharacters = characters.map((character) => character.character)

  return (
    <>
      <Link className={styles.link} to={`/scenes/${cardData.id}`}>
        <div className={styles.card}>
          {/* Image preview  */}
          <div className={styles.imageContainer}>
            <img className={styles.image} src={previewUrl} alt={previewAlt} />
            {/* Change bg color based on difficulty level */}
            <span
              className={`${styles.difficulty} ${difficulty === 'EASY' ? styles.green : difficulty === 'MEDIUM' ? styles.blue : styles.red}`}>
              {difficulty}
            </span>
          </div>
          <div className={styles.cardContent}>
            {/* Short summary of the scene  */}
            <div className={styles.textContent}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{description}</p>
            </div>
            {/* Head shots of characters  */}
            <div className={styles.characters}>
              {sceneCharacters.map((sceneCharacter) => (
                <img
                  key={sceneCharacter.id}
                  className={styles.sceneCharacter}
                  src={sceneCharacter.avatarUrl}
                  alt=""
                  width={30}
                  height={30}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default ScenePreview
