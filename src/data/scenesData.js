/* -------------------- Images -------------------- */
import skiingImage from '../assets/images/previews/skiing.webp'
import wallyImage from '../assets/images/characters/wally.png'
import wendaImage from '../assets/images/characters/wenda.png'
import wizardImage from '../assets/images/characters/wizard.png'
import odlawImage from '../assets/images/characters/odlaw.png'


export const scenesData = [
  {
    id: crypto.randomUUID,
    title: 'The Ski Slopes of Anarchy',
    imageUrl: skiingImage,
    difficulty: 'Easy',
    characters: [wallyImage, wendaImage, wizardImage, odlawImage],
  },
]
