import { useState, useEffect } from 'react'

export const useFetchData = (url) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Abort controller
    const controller = new AbortController()
    const { signal } = controller

    // Fetch data
    const fetchData = async () => {
      setIsLoading(true)
      setError(false)
      try {
        const response = await fetch(url, { signal })
        /* Catch 301, 400, 404, 403, 500, etc */
        if (!response.ok) {
          const error = new Error(`HTTP error: Status ${response.status}`)
          error.status = response.status

          throw error
        }

        const data = await response.json()

        setData(data)
        setIsLoading(false)
        setError(false)
      } catch (err) {
        // Network errors, DNS errors and invalid URLs are caught by 'catch' block
        console.error('Error:', err)
        // Stop fetching if aborted
        if (err.name === 'AbortError') {
          console.log('Fetch request cancelled successfully')
          return
        }

        setError(err)
        setIsLoading(false)
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    return () => controller.abort()
  }, [url])

  return { isLoading, data, error }
}
