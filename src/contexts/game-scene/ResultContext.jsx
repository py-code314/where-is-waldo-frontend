import { createContext } from 'react'

/* Context for result after played selected an option */
export const ResultContext = createContext({
  result: () => {},
  setResult: () => {},
})
