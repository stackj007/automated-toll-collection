import styles from './AboutUs.module.css'
import slider1 from '../../assets/images/slider/slide-1.jpg'
import slider2 from '../../assets/images/slider/slider-2.jpg'
import slider3 from '../../assets/images/slider/slide-3.jpg'
import { IonIcon } from '@ionic/react'
import { arrowBackOutline } from 'ionicons/icons'
import { arrowForwardOutline } from 'ionicons/icons'
function AboutUs() {
  return (
    <section className={styles.aboutUs}>
      <div className={styles.container}>
        <div className={styles.aboutUsContent}>
          <h1 className={styles.h1}>About Us</h1>
          <p>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum
          </p>
        </div>

        <div className={styles.aboutUsSlider}>
          <div className={styles.sliderInner}>
            <ul className={styles.sliderContainer}>
              <li className={styles.sliderItem}>
                <figure className={styles.imageHolder}>
                  <img
                    src={slider1}
                    width="575"
                    height="550"
                    className={styles.imageCover}
                  ></img>
                </figure>
              </li>

              {/* <li className={styles.sliderItem}>
                <figure className={styles.imageHolder}>
                  <img
                    src={slider2}
                    width="575"
                    height="550"
                    className={styles.imageCover}
                  ></img>
                </figure>
              </li>

              <li className={styles.sliderItem}>
                <figure className={styles.imageHolder}>
                  <img
                    src={slider3}
                    width="575"
                    height="550"
                    className={styles.imageCover}
                  ></img>
                </figure>
              </li> */}
            </ul>
          </div>

          <button
            className={styles.sliderButtonPrev}
            aria-label="slide to previous"
          >
            <IonIcon icon={arrowBackOutline}></IonIcon>
          </button>

          <button
            className={styles.sliderButtonNext}
            aria-label="slide to next"
          >
            <IonIcon icon={arrowForwardOutline}></IonIcon>
          </button>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
