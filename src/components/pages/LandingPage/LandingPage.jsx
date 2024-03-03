import Header from '../../../components/common/Header'
import AboutUs from '../../common/AboutUs'
import styles from './LandingPage.module.css'
import accountIcon from '../../../assets/icons/account 1.png'
import calculator from '../../../assets/icons/calculator 1.png'
import payment from '../../../assets/icons/payment 1.png'
import toll from '../../../assets/icons/toll (1) 1.png'

function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <Header />

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

        {/* <section className={styles.benefits}>
          <h3>Save time and money</h3>
          <p>
            Our automated toll collection system eliminates
            the need to stop at toll booths, saving you time
            and money.
          </p>
          <h3>Numerous payment methods</h3>
          <p>
            Choose from a variety of convenient payment
            methods to keep your account current.
          </p>
        </section> */}

        {/* <section className={styles.actions}>
          <a href="#" className={styles.actionLink}>
            Pay or learn more about a Notice of Toll
            Violation
          </a>
          <a href="#" className={styles.actionLink}>
            Calculate the toll for any trip on our toll
            roads
          </a>
        </section> */}
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
