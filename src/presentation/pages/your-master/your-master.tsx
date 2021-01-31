import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Icon, MasterImage } from '@/presentation/components'

import Styles from './your-master-styles.scss'
import { AppContext } from '@/presentation/contexts'

const YourMaster = (): JSX.Element => {
  const { findYourMaster, state } = useContext(AppContext)

  const handleClick = () => {
    findYourMaster()
  }

  return (
    <div
      data-testid="your-master-wrap"
      className={Styles.yourMasterWrap}
      force-side={state?.masterName === 'Luke Skywalker' ? 'light' : 'dark'}
      choosing-force={state.masterName ? 'no' : 'yes'}
    >
      <header className={Styles.header}>
        <Link to="/" replace data-testid="back-link" href="#">
          <Icon
            iconName={state?.masterName === 'Darth Vader' ? 'white' : 'black'}
          />
          <span>back</span>
        </Link>
      </header>
      <div className={Styles.content}>
        <button onClick={handleClick} disabled={state.isLoading}>
          choose your path again, Padawan
        </button>
        {state.masterName ? (
          <MasterImage
            master={state.masterName === 'Luke Skywalker' ? 'light' : 'dark'}
          />
        ) : (
          <div data-testid="image-skeleton"></div>
        )}
        {state.masterName ? (
          <span data-testid="master-text">
            Your master is <strong>{state.masterName}</strong>
          </span>
        ) : (
          <div data-testid="text-skeleton"></div>
        )}
      </div>
    </div>
  )
}

export default YourMaster
