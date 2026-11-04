/* -------------------- Data -------------------- */
import { charactersData } from '../../data/charactersData'

export const isCharacterFound = (e, clickCoords) => {
  let isCharacter = false
  let name = ''
  const characterName = e.target.textContent

  // Get coordinates from state
  const xCoord = clickCoords.x
  const yCoord = clickCoords.y

  // Loop through each character and check for matching coordinates
  charactersData.forEach((character) => {
    const nameArray = Object.keys(character)

    if (nameArray[0].toLowerCase() === characterName.toLowerCase()) {
      name = characterName
      if (
        xCoord >= character[nameArray[0]].minX &&
        xCoord <= character[nameArray[0]].maxX &&
        yCoord >= character[nameArray[0]].minY &&
        yCoord <= character[nameArray[0]].maxY
      ) {
        isCharacter = true
      }
    }
  })

  return { isCharacter, name }
}
