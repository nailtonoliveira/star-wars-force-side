import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import Home from './home'
import { LoadMasterSpy } from '@/domain/test/mock-load-master'

describe('Home Component', () => {
  test('Should call LoadMaster on START button click', () => {
    const loadMasterSpy = new LoadMasterSpy()
    render(<Home loadMaster={loadMasterSpy} />)
    fireEvent.click(screen.getByTestId('start-button'))
    expect(loadMasterSpy.callsCount).toBe(1)
  })
})
