/* Format duration from seconds for page display */
export const formatDuration = (time) => {
  const seconds = time % 60
  const formattedSeconds = seconds.toString().padStart(2, '0')
  const minutes = Math.floor(time / 60) % 60
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const hours = Math.floor(time / 3600)
  const formattedHours = hours > 0 ? `${hours}:` : ''

  const formattedDuration = `${formattedHours}${formattedMinutes}:${formattedSeconds}`

  return formattedDuration
}
