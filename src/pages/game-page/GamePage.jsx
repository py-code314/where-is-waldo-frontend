/* -------------------- Styles -------------------- */
import styles from './GamePage.module.css'
/* -------------------- Loaders -------------------- */
import bouncingCircles from '../../assets/loaders/bouncing-circles.svg'
/* ------------------------- Hooks -------------------------------- */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useFetchData } from '../../hooks/useFetchData'
/* -------------------- Context -------------------- */
import { SceneDataContext } from '../../contexts/game-scene/SceneDataContext'
/* -------------------- Components -------------------- */
import GameHeader from '../../components/sections/game-header/GameHeader'
import GameScene from '../../components/sections/game-scene/GameScene'
import CharactersList from '../../components/core/characters/CharactersList'
import Loader from '../../components/core/loader/Loader'
import ErrorMessage from '../../components/core/error/ErrorMessage'
/* -------------------- Data -------------------- */
import { ERROR_MESSAGES } from '../../data/errorMessages'

const GamePage = () => {
  let { sceneId } = useParams()
  sceneId = Number(sceneId)

  // Configure API
  const baseURL = import.meta.env.VITE_REACT_APP_API_URL
  const apiEndpoint = `${baseURL}/scenes/${sceneId}`
  const sessionEndpoint = `${baseURL}/sessions`

  // Get scene data
  const { data, isLoading, error } = useFetchData(apiEndpoint)

  // State
  const [sessionData, setSessionData] = useState(null)
  const [isActive, setIsActive] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Send scene id to backend
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch(sessionEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sceneId }),
        })
        // console.log('🚀 ~ fetchSessionData ~ response:', response)

        const data = await response.json()
        // console.log('🚀 ~ fetchSessionData ~ data:', data)
        if (!response.ok) {
          const backendMsg =
            Array.isArray(data?.errors) && data.errors.length > 0
              ? data.errors[0].msg
              : data?.errorCode
          // console.log('🚀 ~ fetchSessionData ~ backendMsg:', backendMsg)
          // User friendly error message
          let errorMsg =
            ERROR_MESSAGES[backendMsg] ||
            'An unexpected error occurred. Please try again.'

          setErrorMsg(errorMsg)

          return
        }

        setSessionData(data.sessionData)
        if (data.sessionData.status === 'ACTIVE') {
          setIsActive(true)
        }
      } catch (err) {
        console.error(err)

        setErrorMsg('Something went wrong. Please try again.')
      }
      // finally {
      // }
    }
    fetchSessionData()
  }, [sceneId, sessionEndpoint])

  // Show loading spinner while fetching the data
  if (isLoading)
    return (
      <div className={styles.gamePage}>
        <Loader
          className="loader"
          imgClassName="bouncingCircles"
          src={bouncingCircles}
          width={70}
          height={70}
        />
      </div>
    )

  // Show error message upon failure to fetch the data
  if (error)
    return (
      <div className={styles.gamePage}>
        <ErrorMessage error={error} />
      </div>
    )

  // Data
  const { scene } = data
  // console.log("🚀 ~ GamePage ~ scene:", scene)
  const { title, difficulty, imageUrl, imageAlt, characters } = scene
  const sceneCharacters = characters.map((character) => character.character)
  const characterNames = sceneCharacters.map(
    (sceneCharacter) => sceneCharacter.name,
  )
  const sessionId = sessionData?.id

  return (
    <>
      <div className={styles.gamePage}>
        <GameHeader
          title={title}
          characterNames={characterNames}
          difficulty={difficulty}
        />

        {/* Character head shots  */}
        <CharactersList characters={characters} />

        {errorMsg && (
          <div className={styles.errorBanner}>
            <p className={styles.errorMsg}>{errorMsg}</p>
          </div>
        )}

        <SceneDataContext
          value={{ sceneId, imageUrl, imageAlt, sceneCharacters }}>
          {/* Game image  */}
          <GameScene
            isActive={isActive}
            setIsActive={setIsActive}
            setErrorMsg={setErrorMsg}
            sessionId={sessionId}
          />
        </SceneDataContext>
      </div>
    </>
  )
}

export default GamePage
