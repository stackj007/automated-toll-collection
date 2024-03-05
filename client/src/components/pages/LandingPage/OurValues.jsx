import {useState} from 'react'
import styles from './OurValues.module.css'

function OurValues() {
  const [selectedButton, setSelectedButton] =
    useState('mission')

  const content = {
    mission: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut laoreet libero. Donec ut libero sed arcu eleifend aliquam sed at lorem.`,
    vision: `Fusce et urna justo. Maecenas iaculis consequat sapien sit amet volutpat. Pellentesque vestibulum tempor magna, sit amet efficitur eros pharetra eget.`,
    values: `Nulla vitae elit libero. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas faucibus mollis interdum.`,
  }

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName)
  }

  return (
    <div className={styles.textContent}>
      <h2 className={styles.heading}>About Us</h2>
      <div className={styles.buttons}>
        <button
          className={
            selectedButton === 'mission'
              ? styles.activeButton
              : styles.button
          }
          onClick={() => handleButtonClick('mission')}
        >
          Mission
        </button>
        <button
          className={
            selectedButton === 'vision'
              ? styles.activeButton
              : styles.button
          }
          onClick={() => handleButtonClick('vision')}
        >
          Vision
        </button>
        <button
          className={
            selectedButton === 'values'
              ? styles.activeButton
              : styles.button
          }
          onClick={() => handleButtonClick('values')}
        >
          Value
        </button>
      </div>
      <p className={styles.text}>
        {' '}
        {content[selectedButton]}
      </p>
    </div>
  )
}

export default OurValues
