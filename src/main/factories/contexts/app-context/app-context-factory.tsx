import React from 'react'
import { AppProvider } from '@/presentation/contexts'
import { RemoteLoadMaster } from '@/data/usecases'
import { AxiosHttpClient } from '@/infra/http'

type Props = {
  children: React.ReactNode
}

const AppContextFactory = ({ children }: Props): JSX.Element => {
  const httpGetClient = new AxiosHttpClient()
  const remoteLoadMaster = new RemoteLoadMaster(httpGetClient)
  return <AppProvider loadMaster={remoteLoadMaster}>{children}</AppProvider>
}

export default AppContextFactory
