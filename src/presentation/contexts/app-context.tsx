import React, { createContext, useState } from 'react'
import { LoadMaster } from '@/domain/usecases'

export const AppContext = createContext(null)

type Props = {
  children: React.ReactNode
  loadMaster: LoadMaster
}

export const AppProvider = ({ children, loadMaster }: Props): JSX.Element => {
  const [state, setState] = useState({
    isLoading: false
  })

  const findYourMaster = async () => {
    setState((oldState) => ({ ...oldState, isLoading: true }))
    await loadMaster.load()
  }

  return (
    <AppContext.Provider value={{ findYourMaster, state }}>
      {children}
    </AppContext.Provider>
  )
}
