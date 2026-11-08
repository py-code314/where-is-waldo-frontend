/* -------------------- Images -------------------- */
import wallyImage from '../assets/images/characters/wally.png'
import wendaImage from '../assets/images/characters/wenda.png'
import wizardImage from '../assets/images/characters/wizard.png'
import odlawImage from '../assets/images/characters/odlaw.png'

/* Save bounding box co-ordinates for each character */
export const charactersData = [
  {
    id: 1,
    name: 'Wally',
    imgUrl: wallyImage,
    minX: 84.4,
    maxX: 86.16,
    minY: 71.15,
    maxY: 77.43,
  },
  {
    id: 2,
    name: 'Wenda',
    imgUrl: wendaImage,
    minX: 48.49,
    maxX: 49.28,
    minY: 40.59,
    maxY: 43.46,
  },
  {
    id: 3,
    name: 'Wizard',
    imgUrl: wizardImage,
    minX: 6.41,
    maxX: 7.43,
    minY: 74.22,
    maxY: 77.66,
  },
  {
    id: 4,
    name: 'Odlaw',
    imgUrl: odlawImage,
    minX: 31.36,
    maxX: 32.11,
    minY: 62.88,
    maxY: 64.6,
  },
]
