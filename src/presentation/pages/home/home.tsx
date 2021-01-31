import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Styles from './home-styles.scss'
import { AppContext } from '@/presentation/contexts'

const Home = (): JSX.Element => {
  const { findYourMaster, state } = useContext(AppContext)
  const history = useHistory()
  const handleStartClick = (): void => {
    findYourMaster()
    history.push('/your-master')
  }

  return (
    <div className={Styles.homeWrap}>
      <span className={Styles.title}>
        Welcome to <strong>iClinic</strong>
      </span>
      <span className={Styles.subtitle}>Frontend Challenge</span>
      <button
        data-testid="start-button"
        type="button"
        onClick={handleStartClick}
        disabled={state.isLoading}
      >
        Start
      </button>
    </div>
  )
}

export default Home
