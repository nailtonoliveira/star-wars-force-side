import React from 'react'
import { Router } from 'react-router-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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
  test('Should call LoadMaster on START button click', async () => {
    const { loadMasterSpy } = makeSut()
    const startButton = screen.getByTestId('start-button')
    fireEvent.click(startButton)
    expect(loadMasterSpy.callsCount).toBe(1)
    await waitFor(() => startButton)
  })

  test('Should go to /your-master route on START button click', async () => {
    const { history } = makeSut()
    const startButton = screen.getByTestId('start-button')
    fireEvent.click(startButton)
    expect(history.location.pathname).toBe('/your-master')
    await waitFor(() => startButton)
  })
})
