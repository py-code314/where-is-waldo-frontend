/* Format duration from seconds for 'dateTime' value */
/* Valid 'dateTime'  string format is 'PTnHnMnS' 
(P = Period, T = Time, n = number, H/M/S = Hours/Minutes/Seconds) */
export const formatDatetime = (time) => {
  let isoString = 'PT'

  const hours = Math.floor(time / 3600)
  if (hours > 0) isoString += `${hours}H`
  const minutes = Math.floor(time / 60) % 60
  if (minutes > 0) isoString += `${minutes}M`
  const seconds = time % 60
  if (seconds > 0 || (hours === 0 && minutes === 0)) isoString += `${seconds}S`

  return isoString
}
