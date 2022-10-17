import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ModalContainer from './ModalContainer';

const dataTestId = 'modal children'
const children = <div data-testid={dataTestId}>children</div>
const modalName = 'test modal'

describe('Modal Container test', () => {
  it('modal name should be in the document', () => {
    render(<ModalContainer children={children} modalName={modalName} />);
    const linkElement = screen.queryByText(modalName)
    expect(linkElement).toBeInTheDocument()
  })

  it('children should NOT be in the container', () => {
    render(<ModalContainer children={children} modalName={modalName} />);
    const linkElement = screen.queryByTestId(dataTestId)
    expect(linkElement).not.toBeInTheDocument()
  })

  it('children should be in the container after btn click', () => {
    render(<ModalContainer children={children} modalName={modalName} />);
    const openBtn = screen.getByTestId('open btn')
    expect(openBtn).toBeInTheDocument()
    fireEvent.click(openBtn)
    const cildrelEl = screen.getByTestId(dataTestId)
    expect(cildrelEl).toBeInTheDocument()
    fireEvent.click(openBtn)
  })
})
