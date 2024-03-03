import { useState } from 'react'
import styles from './Slider.module.css'
import slider1 from '../../assets/images/slider/slide-1.jpg'
import slider2 from '../../assets/images/slider/slider-2.jpg'
import slider3 from '../../assets/images/slider/slide-3.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % images.length
    )
  }

  const handlePrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + images.length) % images.length
    )
  }

  const images = [slider1, slider2, slider3]

  return (
    <div className={styles.slider}>
      <button
        className={styles.sliderButtonPrev}
        onClick={handlePrevSlide}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <img
        className={styles.sliderImage}
        src={images[currentIndex]}
        alt="Slider Image"
      />
      <button
        className={styles.sliderButtonNext}
        onClick={handleNextSlide}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  )
}

export default Slider
