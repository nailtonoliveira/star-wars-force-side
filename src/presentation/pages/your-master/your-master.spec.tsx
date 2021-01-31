import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import YourMaster from './your-master'
import { LoadMasterSpy } from '@/domain/test/mock-load-master'
import { AppProvider } from '@/presentation/contexts'

describe('YourMaster Component', () => {
  test('Should call LoadMaster choose button click', () => {
    const loadMasterSpy = new LoadMasterSpy()
    render(
      <AppProvider loadMaster={loadMasterSpy}>
        <YourMaster />
      </AppProvider>
    )
    fireEvent.click(screen.getByText(/^choose your path/))
    expect(loadMasterSpy.callsCount).toBe(1)
  })
})
