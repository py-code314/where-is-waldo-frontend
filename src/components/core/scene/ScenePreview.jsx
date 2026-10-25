/* -------------------- Styles -------------------- */
import styles from './ScenePreview.module.css'
/* -------------------- Components -------------------- */
import { Link } from 'react-router'

/* Display previews of each scene */
const ScenePreview = ({ cardData }) => {
  const { title, description, image, difficulty, characters } = cardData
  return (
    <>
      <Link className={styles.link}>
        <div className={styles.card}>
          {/* Image preview  */}
          <div className={styles.imageContainer}>
            <img className={styles.image} src={image} alt="" />
            {/* Change bg color based on difficulty level */}
            <span
              className={`${styles.difficulty} ${difficulty === 'easy' ? styles.green : difficulty === 'medium' ? styles.blue : styles.red}`}>
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
              {characters.map((character) => (
                <img
                  key={character}
                  className={styles.character}
                  src={character}
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
