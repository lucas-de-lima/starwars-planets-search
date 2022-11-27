import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from './testData';

describe('Testando App', ()=> {
  beforeEach(() => global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData)
  }))
  test('verifica se existe informações na tela', async () => {
    render(<App />);
    const tatooine = await screen.findByText(/Tatooine/i)
    expect(tatooine).toBeInTheDocument()
    const kamino = await screen.findByText(/Kamino/i)
    expect(kamino).toBeInTheDocument()
  })

})
