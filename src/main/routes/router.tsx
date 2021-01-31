import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { AppContextFactory } from '@/main/factories/contexts'
import { Home, YourMaster } from '@/presentation/pages'

const Router = (): JSX.Element => (
  <AppContextFactory>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/your-master" exact component={YourMaster} />
      </Switch>
    </BrowserRouter>
  </AppContextFactory>
)

export default Router
