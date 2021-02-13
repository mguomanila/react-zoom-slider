import React, {forwardRef } from 'react'
import Styled from 'styled-components'

const Slider1 = Styled.ul`
  display: flex;
  flex-flow: row wrap;
  margin: 20px 0 0;
  justify-content: flex-start;
  flex-direction: column !important;
  float: left;
`

const Slider2 = Styled.div`
  float: right;
  width: 80%;
`

const FlowLeft = forwardRef((props, ref) => {
  const {data, selectedImage, showDescription, direction, onPrevSlider, onNextSlider, index, setIndex} = props
  const {refLens, refImage, refResult} = ref
  
  return (
    <>
      <Slider1 className="react-slider__ul">
        {data.map((item, idx) => (
          <li key={idx} className={idx === index ? 'active' : ''} onClick={() => setIndex(idx)}>
            <img src={item.image} alt={item.text} />
          </li>
        ))}
      </Slider1>
      <Slider2 className="react-slider__container">
        <div className="react-slider__areaZoom">
          <div className="react-slider__lens" ref={refLens} />
          <div className="react-slider__picture">
            <img src={selectedImage.image} alt={selectedImage.text} ref={refImage} />
          </div>
          <div
            ref={refResult}
            className="react-slider__imgZoom"
            style={{
              backgroundImage: `url(${selectedImage.image})`,
              left: `${direction === 'left' && '-107%'}`,
            }}
          />
        </div>
        <button type="button" className="react-slider__btnPrev" onClick={onPrevSlider} />
        <button type="button" className="react-slider__btnNext" onClick={onNextSlider} />
        {showDescription && (
          <div className="react-slider__description">
            {selectedImage.text}
          </div>
        )}
      </Slider2>
    </>
  )
})

export default FlowLeft
