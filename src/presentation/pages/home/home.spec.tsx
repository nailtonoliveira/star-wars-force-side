import React from 'react'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

import Home from './home'
import { LoadMasterSpy } from '@/domain/test/mock-load-master'
import { AppProvider } from '@/presentation/contexts'

type SutTypes = {
  loadMasterSpy: LoadMasterSpy
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const loadMasterSpy = new LoadMasterSpy()
  render(
    <AppProvider loadMaster={loadMasterSpy}>
      <Router history={history}>
        <Home />
      </Router>
    </AppProvider>
  )

  return {
    loadMasterSpy,
    history
  }
}

describe('Home Component', () => {
  test('Should call LoadMaster on START button click', () => {
    const { loadMasterSpy } = makeSut()
    fireEvent.click(screen.getByTestId('start-button'))
    expect(loadMasterSpy.callsCount).toBe(1)
  })

  test('Should go to /your-master route on START button click', () => {
    const { history } = makeSut()
    fireEvent.click(screen.getByTestId('start-button'))
    expect(history.location.pathname).toBe('/your-master')
  })
})
