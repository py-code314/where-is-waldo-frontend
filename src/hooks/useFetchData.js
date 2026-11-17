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
          const error = new Error(`HTTP error: Status ${response.status}`)
          error.status = response.status

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

// import { useState, useEffect } from 'react'

// // 1. Optional helper function for delay
// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// export const useFetchData = (url, minDelay = 1000) => {
//   const [isLoading, setIsLoading] = useState(true)
//   const [data, setData] = useState(null)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const controller = new AbortController()
//     const { signal } = controller

//     const fetchData = async () => {
//       setIsLoading(true)
//       setError(null)

//       try {
//         // 2. Run the fetch request and the minimum delay timer side-by-side
//         const [response] = await Promise.all([
//           fetch(url, { signal }),
//           wait(minDelay), // Ensures loading state lasts at least as long as minDelay
//         ])

//         if (!response.ok) {
//           const error = new Error(`HTTP error: Status ${response.status}`)
//           error.status = response.status
//           throw error
//         }

//         const result = await response.json()
//         setData(result)
//       } catch (err) {
//         if (err.name === 'AbortError') {
//           console.log('Fetch request cancelled successfully')
//           return
//         }

//         console.error('Error:', err)
//         setError(err)
//         setData(null)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchData()

//     return () => controller.abort()
//   }, [url, minDelay])

//   return { isLoading, data, error }
// }
