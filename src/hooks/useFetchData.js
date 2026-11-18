import { useState, useEffect } from 'react'

export const useFetchData = (url) => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Abort controller
    const controller = new AbortController()
    const { signal } = controller

    // Fetch data
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(url, { signal })
        /* Catch 301, 400, 404, 403, 500, etc */
        if (!response.ok) {
          const errorData = await response.json()
          const error = new Error(
            errorData.errorMsg || `HTTP error: Status ${response.status}`,
          )
          error.status = response.status
          error.errorCode = errorData.errorCode
          error.title = errorData.errorTitle

          throw error
        }

        const data = await response.json()

        setData(data)
      } catch (err) {
        // Network errors, DNS errors and invalid URLs are caught by 'catch' block
        console.error(err)

        // Stop fetching if aborted
        if (err.name === 'AbortError') {
          console.log('Fetch request cancelled successfully')
          return
        }

        setError(err)
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
