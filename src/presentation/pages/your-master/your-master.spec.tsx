import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import YourMaster from './your-master'
import { LoadMasterSpy } from '@/domain/test/mock-load-master'
import { AppProvider } from '@/presentation/contexts'
import { IconNames } from '@/presentation/components/icon/icon'

type SutTypes = {
  loadMasterSpy: LoadMasterSpy
}

const makeSut = (): SutTypes => {
  const loadMasterSpy = new LoadMasterSpy()
  render(
    <AppProvider loadMaster={loadMasterSpy}>
      <YourMaster />
    </AppProvider>
  )

  return {
    loadMasterSpy
  }
}

describe('YourMaster Component', () => {
  test('Should call LoadMaster choose button click', () => {
    const { loadMasterSpy } = makeSut()
    fireEvent.click(screen.getByText(/^choose your path/))
    expect(loadMasterSpy.callsCount).toBe(1)
  })

  test('Should render correctly on state isLoading', () => {
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
  })
})
