import React, {forwardRef } from 'react'


const Flowdown = forwardRef((props, ref) => {
  const {data, selectedImage, showDescription, direction, onPrevSlider, onNextSlider, index, setIndex} = props
  const {refLens, refImage, refResult} = ref
  
  return (
  <>
    <div className="react-slider__container">
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
    </div>
    <ul className="react-slider__ul">
      {data.map((item, idx) => (
        <li key={idx} className={idx === index ? 'active' : ''} onClick={() => setIndex(idx)}>
          <img src={item.image} alt={item.text} />
        </li>
      ))}
    </ul>
  </>
  )
})

export default Flowdown
