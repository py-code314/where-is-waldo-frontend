import { createContext } from 'react'

/* Context for stopping stopwatch */
export const StopwatchContext = createContext({
  gameOver: false,
  setGameOver: () => {},
})
