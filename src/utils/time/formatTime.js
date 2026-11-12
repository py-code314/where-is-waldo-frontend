
/* Format duration from seconds to show on the page */
export const formatTime = (time) => {
  const seconds = time % 60
  const formattedSeconds = seconds.toString().padStart(2, '0')
  const minutes = Math.floor(time / 60) % 60
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const hours =
    Math.floor(time / 3600) === 0 ? '' : `${Math.floor(time / 3600)}:`
  const formattedTime = `${hours}${formattedMinutes}:${formattedSeconds}`

  return formattedTime
}
