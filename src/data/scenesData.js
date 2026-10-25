/* -------------------- Images -------------------- */
import skiingImage from '../assets/images/previews/skiing.webp'
import spaceStationImage from '../assets/images/previews/space-station.webp'
import foodCourtImage from '../assets/images/previews/food-court.webp'
import wallyImage from '../assets/images/characters/wally.png'
import wendaImage from '../assets/images/characters/wenda.png'
import wizardImage from '../assets/images/characters/wizard.png'
import odlawImage from '../assets/images/characters/odlaw.png'

export const scenesData = [
  {
    id: crypto.randomUUID(),
    title: 'The Ski Slopes of Anarchy',
    description:
      'Hit the slopes! Amidst the snowy chaos, ski lifts, and runaway sleds, can you spot Waldo, Wenda, Odlaw, and the Wizard before they glide away?',
    image: skiingImage,
    difficulty: 'easy',
    characters: [wallyImage, wendaImage, wizardImage, odlawImage],
  },
  {
    id: crypto.randomUUID(),
    title: 'Space Colony Chaos',
    image: spaceStationImage,
    description:
      'Aliens, floating debris, and bustling space stations. Can you find Waldo, Wenda, Odlaw, and the Wizard wandering among the astronauts in this futuristic chaos?',
    difficulty: 'medium',
    characters: [wallyImage, wendaImage, wizardImage, odlawImage],
  },
  {
    id: crypto.randomUUID(),
    title: 'The Gobbling Gluttons',
    description:
      'A huge banquet where tables overflow with food and people crowd every corner. Waldo, Wenda, Odlaw, and the Wizard are all somewhere in the middle of this mess.',
    image: foodCourtImage,
    difficulty: 'hard',
    characters: [wallyImage, wendaImage, wizardImage, odlawImage],
  },
]
