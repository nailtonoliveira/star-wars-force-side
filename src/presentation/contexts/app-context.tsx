import React, { createContext, useState } from 'react'
import { LoadMaster } from '@/domain/usecases'

export const AppContext = createContext(null)

type Props = {
  children: React.ReactNode
  loadMaster: LoadMaster
}

export const AppProvider = ({ children, loadMaster }: Props): JSX.Element => {
  const [state, setState] = useState({
    isLoading: false,
    masterName: null
  })

  const findYourMaster = async () => {
    setState({
      isLoading: true,
      masterName: null
    })
    const master = await loadMaster.load()

    setState({
      masterName: master.name,
      isLoading: false
    })
  }

  return (
    <AppContext.Provider value={{ findYourMaster, state }}>
      {children}
    </AppContext.Provider>
  )
}
