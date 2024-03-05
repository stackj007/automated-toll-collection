import styles from './AboutUs.module.css'
import Slider from '../../common/Slider.jsx'
import OurValues from './OurValues.jsx'
import slider1 from '../../../assets/images/slider/slider1.jpg'
import slider2 from '../../../assets/images/slider/slider2.jpg'
import slider3 from '../../../assets/images/slider/slider3.jpg'

function AboutUs() {
  return (
    <section className={styles.aboutUs}>
      <div className={styles.container}>
        <div className={styles.aboutUsContent}>
          <OurValues />
        </div>

        <div className={styles.aboutUsSlider}>
          <Slider images={[slider1, slider2, slider3]} />
        </div>
      </div>
    </section>
  )
}

export default AboutUs
