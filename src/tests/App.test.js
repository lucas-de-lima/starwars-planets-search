import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from './testData';

describe('Testando App', ()=> {
  //  beforeEach(() => global.fetch = jest.fn().mockResolvedValue({
  //   json: jest.fn().mockResolvedValue(testData)
  // }))
  it('verifica se existe informações na tabela', async () => {
    render(<App />);
    await waitFor(
      () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
      { timeout: 3000 }
    );
    const tatooine = await screen.findByText(/Tatooine/i, 3000)
    expect(tatooine).toBeInTheDocument()
    const kamino = await screen.findByText(/Kamino/i)
    expect(kamino).toBeInTheDocument()
    
  })

  

})
