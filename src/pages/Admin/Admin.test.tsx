import React from 'react';
import { render, screen } from '@testing-library/react';
import Admin from './Admin';

describe('Admin page test', () => {
  it('should render 3 ModalContainers', async () => {
    render(<Admin deviceForm={<></>} />);
    const linkElement = await screen.findAllByTestId('modal');
    expect(linkElement.length).toBe(3)
  });
})

