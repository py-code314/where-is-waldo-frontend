import { createContext } from 'react'

/* Context to get game completion time */
export const DurationContext = createContext({
  duration: 0,
  setDuration: () => {},
})
