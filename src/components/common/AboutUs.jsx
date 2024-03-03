import styles from './AboutUs.module.css'
import Slider from './Slider'
import OurValueTextContent from './OurValueTextContent '
function AboutUs() {
  return (
    <section className={styles.aboutUs}>
      <div className={styles.container}>
        <div className={styles.aboutUsContent}>
          <OurValueTextContent />
        </div>

        <div className={styles.aboutUsSlider}>
          <Slider />
        </div>
      </div>
    </section>
  )
}

export default AboutUs
