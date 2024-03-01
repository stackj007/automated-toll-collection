import styles from './LandingPage.module.css'
import Logo from '../../../assets/Logo/Toll Express 1.png'
function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <header className={styles.header}>
        <img src={Logo} alt="Your company logo" />

        <nav>
          <ul>
            <li>
              <a href="#" className={styles.navLink}>
                Home
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                Account
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                Tolls
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.authButtons}>
          <button className={styles.loginButton}>
            Login
          </button>
          <button className={styles.signupButton}>
            Sign Up
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h2>Enjoy the ride.</h2>
          <p>
            Ready to handle toll payments hassle-free? Join
            now and access all the resources needed to
            streamline your toll payment experience while
            cruising our roads.
          </p>
          <button className={styles.button}>Sign Up</button>
        </section>
        <section className={styles.benefits}>
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
        </section>
        <section className={styles.actions}>
          <a href="#" className={styles.actionLink}>
            Pay or learn more about a Notice of Toll
            Violation
          </a>
          <a href="#" className={styles.actionLink}>
            Calculate the toll for any trip on our toll
            roads
          </a>
        </section>
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
