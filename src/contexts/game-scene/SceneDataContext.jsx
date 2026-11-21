import { createContext } from 'react'

/* Context for accessing scene data */
export const SceneDataContext = createContext({
  sceneId: 0,
  imageUrl: '',
  imageAlt: '',
  sceneCharacters: () => {}

})
