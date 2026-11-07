/* -------------------- Data -------------------- */
import { charactersData } from '../../data/charactersData'

export const isCharacterFound = (e, clickCoords) => {
  let isMatch = false
  let name = ''
  const characterName = e.target.textContent

  // Get coordinates from state
  const xCoord = clickCoords.x
  const yCoord = clickCoords.y

  // Loop through each character and check for matching coordinates
  charactersData.forEach((character) => {
    if (character.name.toLowerCase() === characterName.toLowerCase()) {
      name = characterName
      if (
        xCoord >= character.minX &&
        xCoord <= character.maxX &&
        yCoord >= character.minY &&
        yCoord <= character.maxY
      ) {
        isMatch = true
      }
    }
  })

  return { isMatch, name }
}
