import { createContext } from 'react'

/* Context for active game session */
export const GameSessionContext = createContext({
  isActive: false,
  setIsActive: () => {}

})
