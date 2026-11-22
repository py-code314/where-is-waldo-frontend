/* -------------------- Data -------------------- */
import { ERROR_MESSAGES } from '../../data/errorMessages'

export const validateOptionClick = async (
  characterId,
  sceneId,
  clickCoords,
  setErrorMsg,
  setIsActive,
  sessionId,
) => {
  // Configure API
  const baseURL = import.meta.env.VITE_REACT_APP_API_URL
  const verifyEndPoint = `${baseURL}/sessions/verify`

  // Get coordinates from state
  const xCoord = clickCoords.x
  const yCoord = clickCoords.y

  // const clickData = {
  //   sceneId: '',
  //   characterId: 'hello',
  //   x: -1.1,
  //   y: 'hello',
  // }
  const clickData = {
    sceneId,
    characterId,
    clickX: xCoord,
    clickY: yCoord,
    sessionId,
  }
  // console.log("🚀 ~ isCharacterFound ~ clickData:", clickData)

  try {
    const response = await fetch(verifyEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clickData),
    })
    // console.log('🚀 ~ fetchValidationData ~ response:', response)

    const data = await response.json()
    // console.log('🚀 ~ fetchValidationData ~ data:', data)

    if (!response.ok) {
      const isInvalidClickData =
        Array.isArray(data?.errors) && data.errors.length > 0
      const backendMsg = isInvalidClickData ? 'Bad Input' : data?.errorCode
      // console.log('🚀 ~ isCharacterFound ~ backendMsg:', backendMsg)

      // Show user friendly error message
      let errorMsg =
        ERROR_MESSAGES[backendMsg] ||
        'An unexpected error occurred. Please try again.'

      /* Show only error message if input backend validation
      fails. Don't stop game play, allow player to continue playing */
      setErrorMsg(errorMsg)

      /* Stop game play if there are any critical backend errors (disable clicks on the game image) */
      if (!isInvalidClickData) {
        setIsActive(false)
      }

      return
    }

    return data
  } catch (err) {
    console.error('Verification failed:', err)
    // TODO: show error message
  }
}
