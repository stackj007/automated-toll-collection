import styles from './Header.module.css'
import Logo from '../assets/Logo/logo.png'

function Header() {
  return (
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
  )
}

export default Header
