import React, { useContext } from 'react'
import { Icon, MasterImage } from '@/presentation/components'

import Styles from './your-master-styles.scss'
import { AppContext } from '@/presentation/contexts'

const YourMaster = (): JSX.Element => {
  const { findYourMaster } = useContext(AppContext)

  const handleClick = () => {
    findYourMaster()
  }

  return (
    <div
      className={Styles.yourMasterWrap}
      force-side="dark"
      choosing-force="no"
    >
      <header className={Styles.header}>
        <a href="#">
          <Icon iconName="white" />
          <span>back</span>
        </a>
      </header>
      <div className={Styles.content}>
        <button type="button" onClick={handleClick}>
          choose your path again, Padawan
        </button>
        <MasterImage master="dark" />
        <span>
          Your master is <strong>Darth Vader</strong>
        </span>
      </div>
    </div>
  )
}

export default YourMaster
