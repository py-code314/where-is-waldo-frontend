/* -------------------- Styles -------------------- */
import styles from './GamePage.module.css'
/* -------------------- Loaders -------------------- */
import fillTheBox from '../../assets/loaders/fill-the-box.svg'
/* ------------------------- Hooks -------------------------------- */
import { useState } from 'react'
import { useParams } from 'react-router'
import { useFetchData } from '../../hooks/useFetchData'
/* -------------------- Context -------------------- */
import { ResultContext } from '../../contexts/game-scene/ResultContext'
import { CharacterIdsContext } from '../../contexts/characters/CharacterIdsContext'
import { StopwatchContext } from '../../contexts/game-scene/StopwatchContext'
/* -------------------- Components -------------------- */
import GameHeader from '../../components/sections/game-header/GameHeader'
import GameScene from '../../components/sections/game-scene/GameScene'
import CharactersList from '../../components/core/characters/CharactersList'
import ErrorMessage from '../../components/core/error/ErrorMessage'

const GamePage = () => {
  const { sceneId } = useParams()

  // Configure API
  const baseURL = import.meta.env.VITE_REACT_APP_API_URL
  const apiEndpoint = `${baseURL}/scenes/${sceneId}`

  // Get scene data
  const { data, isLoading, error } = useFetchData(apiEndpoint)

  // State
  const [result, setResult] = useState({ isMatch: false, name: '' })
  const [foundCharacterIds, setFoundCharacterIds] = useState([])
  const [gameOver, setGameOver] = useState(false)

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.gamePage}>
        <div className={styles.loader}>
          <img
            className={styles.fillTheBox}
            src={fillTheBox}
            alt=""
            width={70}
            height={70}
          />
        </div>
      </div>
    )

  // Show error message upon failure to fetch the data
  if (error)
    return (
      <div className={styles.gamePage}>
        <ErrorMessage error={error} />
      </div>
    )

  const { scene } = data
  console.log('🚀 ~ GamePage ~ scene:', scene)

  return (
    <>
      <div className={styles.gamePage}>
        <StopwatchContext value={{ gameOver, setGameOver }}>
          <GameHeader />
        </StopwatchContext>

        <CharacterIdsContext
          value={{
            foundCharacterIds,
            setFoundCharacterIds,
          }}>
          <StopwatchContext value={{ gameOver, setGameOver }}>
            {/* Character head shots  */}
            <CharactersList />
          </StopwatchContext>

          <ResultContext value={{ result, setResult }}>
            {/* Game image  */}
            <GameScene />
          </ResultContext>
        </CharacterIdsContext>
      </div>
    </>
  )
}

export default GamePage
