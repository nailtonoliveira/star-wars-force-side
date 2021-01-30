import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Home } from '@/presentation/pages'

const Router = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  </BrowserRouter>
)

export default Router
