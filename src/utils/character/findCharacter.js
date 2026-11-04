/* -------------------- Data -------------------- */
import { charactersData } from '../../data/charactersData'

export const isCharacterFound = (e, clickCoords) => {
  let result = ''
  const characterName = e.target.textContent.toLowerCase()

  // Get coordinates from state
  const xCoord = clickCoords.x
  const yCoord = clickCoords.y

  // Loop through each character and check for matching coordinates
  charactersData.forEach((character) => {
    const name = Object.keys(character)

    if (name[0].toLowerCase() === characterName) {
      if (
        xCoord >= character[name].minX &&
        xCoord <= character[name].maxX &&
        yCoord >= character[name].minY &&
        yCoord <= character[name].maxY
      ) {
        result = `You found ${name}!`
      } else {
        result = 'Not here'
      }
    }
  })

  return result
}
