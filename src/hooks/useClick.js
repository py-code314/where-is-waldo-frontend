import { useEffect } from 'react'

// Hook to handle clicks outside the component
export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (e) => {
      /* Do nothing if the element is null or click is inside
      the component */
      if (!ref.current || ref.current.contains(e.target)) {
        return
      }

      handler()
    }

    document.addEventListener('mousedown', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, handler])
}
