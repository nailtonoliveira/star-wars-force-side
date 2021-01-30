import React from 'react'
import Styles from './home-styles.scss'

const Home = (): JSX.Element => {
  return (
    <div className={Styles.homeWrap}>
      <span className={Styles.title}>
        Welcome to <strong>iClinic</strong>
      </span>
      <span className={Styles.subtitle}>Frontend Challenge</span>
      <button type="button">Start</button>
    </div>
  )
}

export default Home
