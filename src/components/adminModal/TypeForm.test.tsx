import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TypeForm from './TypeForm';
import { deviceAPI } from '../../api/deviceAPI';
import { $authHost } from '../../api';

const newType = 'New Type'

describe('Type Form test', () => {
  it('input hould be in the document', async () => {
    render(<TypeForm />)
    const linkElement = await screen.findByTestId('typeform')
    expect(linkElement).toBeInTheDocument()
  })

  let mockCreateType: jest.SpyInstance
  mockCreateType = jest.spyOn($authHost, 'post')

  it('deviceAPI.createType() should be called after change input value and submit btn click', async () => {
    render(<TypeForm />)

    const typeInput = screen.getByRole('textbox')
    expect(typeInput).toBeInTheDocument()

    fireEvent.change(typeInput, {
      target: { value: newType }
    })

    const submit = screen.getByTestId('submit btn')
    fireEvent.click(submit)

    const result = { status: 200 }

    mockCreateType.mockImplementation(() => Promise.resolve(result))

    await deviceAPI.createType({ name: newType })

    expect(mockCreateType).toHaveBeenCalledTimes(1)
  })

  jest.clearAllMocks()

})