/* -------------------- Data -------------------- */
import { ERROR_MESSAGES } from '../../data/errorMessages'

export const validateOptionClick = async (
  characterId,
  sceneId,
  clickCoords,
  setErrorMsg,
  setIsActive,
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
    x: xCoord,
    y: yCoord,
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
    console.log('🚀 ~ fetchValidationData ~ data:', data)

    if (!response.ok) {
      const isInvalidClickData =
        Array.isArray(data?.errors) && data.errors.length > 0
      const backendMsg = isInvalidClickData ? 'Bad Input' : data?.errorCode
      console.log('🚀 ~ isCharacterFound ~ backendMsg:', backendMsg)

      // User friendly error message
      let errorMsg =
        ERROR_MESSAGES[backendMsg] ||
        'An unexpected error occurred. Please try again.'

      setErrorMsg(errorMsg)

      if (!isInvalidClickData) {
        setIsActive(false)
      }

      return
    }

    return data
  } catch (err) {
    console.error('Verification failed:', err)
  }
}
