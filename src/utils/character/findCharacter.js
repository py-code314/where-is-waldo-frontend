export const isCharacterFound = async (characterId, sceneId, clickCoords) => {
  // Configure API
  const baseURL = import.meta.env.VITE_REACT_APP_API_URL
  const verifyEndPoint = `${baseURL}/sessions/verify`

  // Get coordinates from state
  const xCoord = clickCoords.x
  const yCoord = clickCoords.y

  const clickData = {
    sceneId,
    characterId,
    x: xCoord,
    y: yCoord,
  }

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

    return data
  } catch (err) {
    console.error('Verification failed:', err)
  }
}
