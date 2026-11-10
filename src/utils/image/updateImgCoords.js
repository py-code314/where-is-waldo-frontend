/* Get new coordinates with each mouse move */
export const getUpdatedImgCoords = (
  event,
  gameBoardRef,
  imgContainerRef,
  imgContainerPosition,
  startRef,
) => {
  // Get wrapper's width and height
  const gameBoard = gameBoardRef.current
  const gameBoardWidth = gameBoard.clientWidth
  const gameBoardHeight = gameBoard.clientHeight

  const gameBoardRect = gameBoardRef.current.getBoundingClientRect()

  // Get image's width and height
  const imgContainer = imgContainerRef.current
  const imgContainerWidth = imgContainer.width
  const imgContainerHeight = imgContainer.height

  // Get scaled imgContainer's width and height
  const currentScale = imgContainerPosition.scale
  const scaledImgContainerWidth = imgContainerWidth * currentScale
  const scaledImgContainerHeight = imgContainerHeight * currentScale

  // Set boundaries for panning the imgContainer
  const maxX = 0
  const maxY = 0
  const minX = gameBoardWidth - scaledImgContainerWidth
  const minY = gameBoardHeight - scaledImgContainerHeight

  // Update cursor position continuously relative to wrapper while moving the mouse
  const currentX = event.clientX - gameBoardRect.left
  const currentY = event.clientY - gameBoardRect.top

  // Net difference between previous offset position and current cursor position
  let newX = currentX - startRef.current.x
  let newY = currentY - startRef.current.y

  // Update newX and newY if they go out of boundaries
  if (newX > maxX) {
    newX = maxX
  } else if (newX < minX) {
    newX = minX
  }
  if (newY > maxY) {
    newY = maxY
  } else if (newY < minY) {
    newY = minY
  }

  return [newX, newY]
}
