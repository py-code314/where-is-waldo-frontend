/* Get new coordinates with each mouse move */
export const getUpdatedImgCoords = (
  event,
  imgWrapperRef,
  imgRef,
  imgPosition,
  startRef,
) => {
  // Get wrapper's width and height
  const imageWrapper = imgWrapperRef.current
  const imageWrapperWidth = imageWrapper.clientWidth
  const imageWrapperHeight = imageWrapper.clientHeight

  const imageWrapperRect = imgWrapperRef.current.getBoundingClientRect()

  // Get image's width and height
  const image = imgRef.current
  const imageWidth = image.width
  const imageHeight = image.height

  // Get scaled image's width and height
  const currentScale = imgPosition.scale
  const scaledImgWidth = imageWidth * currentScale
  const scaledImgHeight = imageHeight * currentScale

  // Set boundaries for panning the image
  const maxX = 0
  const maxY = 0
  const minX = imageWrapperWidth - scaledImgWidth
  const minY = imageWrapperHeight - scaledImgHeight

  // Update cursor position continuously relative to wrapper while moving the mouse
  const currentX = event.clientX - imageWrapperRect.left
  const currentY = event.clientY - imageWrapperRect.top

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
