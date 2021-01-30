import React from 'react'
import { AppProvider } from '@/presentation/contexts'
import { RemoteLoadMaster } from '@/data/usecases'
import { AxiosHttpClient } from '@/infra/http'
import { makeApiUrl } from '../../http/api-url-factory'

type Props = {
  children: React.ReactNode
}

const AppContextFactory = ({ children }: Props): JSX.Element => {
  const httpGetClient = new AxiosHttpClient()
  const remoteLoadMaster = new RemoteLoadMaster(
    makeApiUrl('/people/1'),
    makeApiUrl('/people/4'),
    httpGetClient
  )
  return <AppProvider loadMaster={remoteLoadMaster}>{children}</AppProvider>
}

export default AppContextFactory
