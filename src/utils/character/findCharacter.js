/* -------------------- Data -------------------- */
import { charactersData } from '../../data/charactersData'

export const isCharacterFound = (e, clickCoords) => {
  let isMatch = false
  let characterId = null
  let name = ''

  // Get id from clicked button
  const id = parseInt(e.target.dataset.id)

  // Get coordinates from state
  const xCoord = clickCoords.x
  const yCoord = clickCoords.y

  // Loop through each character and check for matching coordinates
  charactersData.forEach((character) => {
    if (character.id === id) {
      name = character.name
      if (
        xCoord >= character.minX &&
        xCoord <= character.maxX &&
        yCoord >= character.minY &&
        yCoord <= character.maxY
      ) {
        isMatch = true
        characterId = character.id
      }
    }
  })

  // Return character id and name
  return { isMatch, characterId, name }
}
