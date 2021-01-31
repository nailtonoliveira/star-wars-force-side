import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import YourMaster from './your-master'
import { LoadMasterSpy } from '@/domain/test/mock-load-master'
import { AppProvider } from '@/presentation/contexts'
import { IconNames } from '@/presentation/components/icon/icon'
import { Images } from '@/presentation/components/master-image/base64-images'

type SutTypes = {
  loadMasterSpy: LoadMasterSpy
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/your-master'] })
  const loadMasterSpy = new LoadMasterSpy()
  render(
    <AppProvider loadMaster={loadMasterSpy}>
      <Router history={history}>
        <YourMaster />
      </Router>
    </AppProvider>
  )

  return {
    loadMasterSpy,
    history
  }
}

describe('YourMaster Component', () => {
  test('Should call LoadMaster choose button click', () => {
    const { loadMasterSpy } = makeSut()
    fireEvent.click(screen.getByText(/^choose your path/))
    expect(loadMasterSpy.callsCount).toBe(1)
    waitFor(() => screen.getByTestId('your-master-wrap'))
  })

  test('Should render correctly on state isLoading', async () => {
    makeSut()
    fireEvent.click(screen.getByText(/^choose your path/))
    expect(screen.getByTestId('your-master-wrap')).toHaveAttribute(
      'choosing-force',
      'yes'
    )
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconNames.black)
    expect(screen.getByText(/^choose your path/)).toBeDisabled()
    expect(screen.queryByTestId('master-image')).not.toBeInTheDocument()
    expect(screen.getByTestId('image-skeleton')).toBeInTheDocument()
    expect(screen.queryByTestId('master-text')).not.toBeInTheDocument()
    expect(screen.getByTestId('text-skeleton')).toBeInTheDocument()
    waitFor(() => screen.getByTestId('your-master-wrap'))
  })

  test('Should render Master correctly', async () => {
    const { loadMasterSpy } = makeSut()
    loadMasterSpy.master = { name: 'Luke Skywalker' }
    fireEvent.click(screen.getByText(/^choose your path/))
    await waitFor(() => screen.getByTestId('your-master-wrap'))
    expect(screen.getByTestId('your-master-wrap')).toHaveAttribute(
      'choosing-force',
      'no'
    )
    expect(screen.getByTestId('your-master-wrap')).toHaveAttribute(
      'force-side',
      'light'
    )
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconNames.black)
    expect(screen.getByText(/^choose your path/)).toBeEnabled()
    expect(screen.getByTestId('master-image')).toBeInTheDocument()
    expect(screen.getByTestId('master-image')).toHaveProperty(
      'src',
      Images.light
    )
    expect(screen.queryByTestId('image-skeleton')).not.toBeInTheDocument()
    expect(screen.getByTestId('master-text')).toBeInTheDocument()
    expect(screen.getByTestId('master-text')).toHaveTextContent(
      'Your master is Luke Skywalker'
    )
    expect(screen.queryByTestId('text-skeleton')).not.toBeInTheDocument()
  })

  test('Should go back to Home on back link click', () => {
    const { history } = makeSut()
    fireEvent.click(screen.getByTestId('back-link'))
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })
})
