/* -------------------- Styles -------------------- */
import styles from './GameScene.module.css'
/* -------------------- Images -------------------- */
import skiingImage from '../../../assets/images/puzzles/skiing-scene.webp'
/* -------------------- Hooks -------------------- */
import {  useState } from 'react'

const GameScene = () => {
  const [isClick, setIsClick] = useState(false)
  
  const handleClick = () => {
    setIsClick(!isClick)
  }
  return (
    <>
      <div className={styles.gameBoard}>
        <img
          className={styles.gameImg}
          src={skiingImage}
          alt="A crowded ski resort on a snowy mountain with many skiers wearing colorful winter jackets."
          onClick={() => handleClick()}
        />

        <ul
          className={`${styles.charactersList} ${isClick ? styles.open : styles.hidden}`}>
          <li className={`${styles.listItem} ${styles.select}`}>
            Who is this?
          </li>
          <li className={`${styles.listItem} ${styles.option}`}>Waldo</li>
          <li className={`${styles.listItem} ${styles.option}`}>Wanda</li>
          <li className={`${styles.listItem} ${styles.option}`}>Wizard</li>
          <li className={`${styles.listItem} ${styles.option}`}>Odlaw</li>
        </ul>
      </div>
    </>
  )
}

export default GameScene
