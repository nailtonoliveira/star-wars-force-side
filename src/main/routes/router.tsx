import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { AppContextFactory } from '@/main/factories/contexts'
import { Home } from '@/presentation/pages'

const Router = (): JSX.Element => (
  <AppContextFactory>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  </AppContextFactory>
)

export default Router
