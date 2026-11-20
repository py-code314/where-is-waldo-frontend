import { createContext } from 'react'

/* Context for accessing scene data */
export const SceneDataContext = createContext({
  imageUrl: '',
  imageAlt: '',
  sceneCharacters: () => {}

})
