import React, { createContext } from 'react'
import { LoadMaster } from '@/domain/usecases'

export const AppContext = createContext(null)

type Props = {
  children: React.ReactNode
  loadMaster: LoadMaster
}

export const AppProvider = ({ children, loadMaster }: Props): JSX.Element => {
  const findYourMaster = async () => {
    await loadMaster.load()
  }

  return (
    <AppContext.Provider value={{ findYourMaster }}>
      {children}
    </AppContext.Provider>
  )
}
