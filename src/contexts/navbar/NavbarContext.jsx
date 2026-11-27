import { createContext } from 'react'

/* Context for navbar and menu */
export const NavbarContext = createContext({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  navbarRef: null
})
