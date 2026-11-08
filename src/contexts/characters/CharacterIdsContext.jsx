import { createContext } from 'react'

/* Context for tracking successful guesses */
export const CharacterIdsContext = createContext({
  result: [],
  setResult: [],
})
