import AboutUs from './AboutUs.jsx'
import styles from './LandingPage.module.css'
import accountIcon from '../../../assets/icons/account.png'
import calculator from '../../../assets/icons/calculator.png'
import payment from '../../../assets/icons/payment.png'
import toll from '../../../assets/icons/toll.png'

function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.overlay}>
            <div className={styles.overlayContent}>
              {' '}
              <h1>Enjoy the ride.</h1>
              <p>
                Ready to handle toll payments hassle-free?
                Join now and access all the resources needed
                to streamline your toll payment experience
                while cruising our roads.
              </p>
              <div className={styles.benefits}>
                <div className={styles.subbenefits}>
                  <img
                    src={accountIcon}
                    alt="Account Icon"
                  />
                  <p>Save time and money</p>
                </div>

                <div className={styles.subbenefits}>
                  <img
                    src={calculator}
                    alt="Account Icon"
                  />
                  <p>
                    calculate the toll for any trip on the
                    toll roads
                  </p>
                </div>

                <div className={styles.subbenefits}>
                  <img src={toll} alt="Account Icon" />
                  <p>
                    Pay or learn more about a Notice of toll
                    violation
                  </p>
                </div>

                <div className={styles.subbenefits}>
                  <img src={payment} alt="Account Icon" />
                  <p>Numerous payment methods</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AboutUs />
      </main>
      <footer className={styles.footer}>
        <p>
          &copy; 2023 Your Company Name. All rights
          reserved.
        </p>
      </footer>
    </div>
  )
}

export default LandingPage
