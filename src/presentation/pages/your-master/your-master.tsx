import React, { useContext } from 'react'
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
      force-side="dark"
      choosing-force={state.isLoading ? 'yes' : 'no'}
    >
      <header className={Styles.header}>
        <a href="#">
          <Icon iconName={state.isLoading ? 'black' : 'white'} />
          <span>back</span>
        </a>
      </header>
      <div className={Styles.content}>
        <button type="button" onClick={handleClick} disabled={state.isLoading}>
          choose your path again, Padawan
        </button>
        {state.isLoading ? (
          <div data-testid="image-skeleton"></div>
        ) : (
          <MasterImage master="dark" />
        )}
        {state.isLoading ? (
          <div data-testid="text-skeleton"></div>
        ) : (
          <span data-testid="master-text">
            Your master is <strong>Darth Vader</strong>
          </span>
        )}
      </div>
    </div>
  )
}

export default YourMaster
