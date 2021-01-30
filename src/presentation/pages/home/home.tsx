import { LoadMaster } from '@/domain/usecases'
import React from 'react'
import Styles from './home-styles.scss'

type Props = {
  loadMaster: LoadMaster
}

const Home = ({ loadMaster }: Props): JSX.Element => {
  const handleStartClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault()
    loadMaster.load()
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
      >
        Start
      </button>
    </div>
  )
}

export default Home
