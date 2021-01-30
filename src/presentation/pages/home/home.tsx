import { LoadMaster } from '@/domain/usecases'
import { useHistory } from 'react-router-dom'
import React from 'react'
import Styles from './home-styles.scss'

type Props = {
  loadMaster: LoadMaster
}

const Home = ({ loadMaster }: Props): JSX.Element => {
  const history = useHistory()
  const handleStartClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault()
    loadMaster.load()
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
      >
        Start
      </button>
    </div>
  )
}

export default Home
