import { useState } from 'react'
import styles from './Slider.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

function Slider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className={styles.slider}>
      <button className={styles.sliderButtonPrev} onClick={handlePrevSlide}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <img className={styles.sliderImage} src={images[currentIndex]} alt="Slider Image" />
      <button className={styles.sliderButtonNext} onClick={handleNextSlide}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  )
}

export default Slider
