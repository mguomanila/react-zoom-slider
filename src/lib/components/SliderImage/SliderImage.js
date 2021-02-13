import React, {
  useState, useCallback, useRef, useEffect,
} from 'react'
import PropTypes from 'prop-types'
import FlowDown from './flowdown'
import FlowLeft from './flowleft'

/* css */
import './styles.css'

let cx = 0
let cy = 0
let lensCurrent = null
let imageCurrent = null
let resultCurrent = null

const SliderImage = ({
  data, width, showDescription, direction, flow,
}) => {
  const [index, setIndex] = useState(0)
  const selectedImage = data[index]
  const refImage = useRef()
  const refLens = useRef()
  const refResult = useRef()

  function getCursorPos(e, imageCurrent) {
    let x = 0
    let y = 0
    const getBoundingImage = imageCurrent.getBoundingClientRect()

    e = e || window.event
    x = e.pageX - getBoundingImage.left - window.pageXOffset
    y = e.pageY - getBoundingImage.top - y - window.pageYOffset

    return { x, y }
  }

  useEffect(() => {
    lensCurrent = refLens.current
    imageCurrent = refImage.current
    resultCurrent = refResult.current

    function moveLens(e, imageWidth, imageHeight, offsetWidthLens, offsetHeightLens) {
      e.preventDefault()
      let x = 0
      let y = 0

      const pos = getCursorPos(e, imageCurrent)
      x = pos.x - offsetWidthLens / 2
      y = pos.y - offsetHeightLens / 2

      if (x > imageWidth - offsetWidthLens) {
        x = imageWidth - offsetWidthLens
      }
      if (x < 0) {
        x = 0
      }
      if (y > imageHeight - offsetHeightLens) {
        y = imageHeight - offsetHeightLens
      }
      if (y < 0) {
        y = 0
      }

      lensCurrent.style.left = `${x}px`
      lensCurrent.style.top = `${y}px`
      resultCurrent.style.backgroundPosition = `-${x * cx}px -${y * cy}px`
    }
    if (imageCurrent !== null) {
      const imageWidth = imageCurrent.width
      const imageHeight = imageCurrent.height || (imageWidth - 120)
      const offsetWidthLens = lensCurrent.offsetWidth
      const offsetHeightLens = lensCurrent.offsetHeight

      cx = resultCurrent.offsetWidth / offsetWidthLens
      cy = resultCurrent.offsetHeight / offsetHeightLens
      resultCurrent.style.backgroundSize = `${imageWidth * cx}px ${imageHeight * cy}px`

      imageCurrent.addEventListener('mousemove', e => moveLens(e, imageWidth, imageHeight, offsetWidthLens, offsetHeightLens))
      lensCurrent.addEventListener('mousemove', e => moveLens(e, imageWidth, imageHeight, offsetWidthLens, offsetHeightLens))
    }

    return () => {
      imageCurrent.removeEventListener('mousemove', moveLens)
      lensCurrent.removeEventListener('mousemove', moveLens)
    }
  }, [data])

  const onPrevSlider = useCallback(() => {
    setIndex(prev => (prev - 1 + data.length) % data.length)
  }, [data])

  const onNextSlider = useCallback(() => {
    setIndex(prev => (prev + 1) % data.length)
  }, [data])
  
  const isFlowDown = flow === 'down'

  return (
    <div className="react-slider" style={{ width: width || 'auto' }}>
    {isFlowDown &&
      <FlowDown 
        ref={{refLens, refImage, refResult}}
        data={data}
        selectedImage={selectedImage}
        showDescription={showDescription}
        direction={direction}
        onPrevSlider={onPrevSlider}
        onNextSlider={onNextSlider}
        index={index}
        setIndex={setIndex}
      /> ||
      <FlowLeft
        ref={{refLens, refImage, refResult}}
        data={data}
        selectedImage={selectedImage}
        showDescription={showDescription}
        direction={direction}
        onPrevSlider={onPrevSlider}
        onNextSlider={onNextSlider}
        index={index}
        setIndex={setIndex}
      />}
    </div>
  )
}

SliderImage.propTypes = {
  /** data */
  data: PropTypes.array.isRequired,
  /** left | right */
  direction: PropTypes.string,
  /** down or left */
  flow: Proptypes.string,
  /** show description of image */
  showDescription: PropTypes.bool,
  /** set size slider image */
  width: PropTypes.string,
}

SliderImage.defaultProps = {
  flow: 'down',
  direction: 'right',
  showDescription: true,
  width: 'auto',
}

export default SliderImage
