import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from './testData';
import userEvent from '@testing-library/user-event';

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
    const tatooine = await screen.findByText(/Tatooine/i)
    expect(tatooine).toBeInTheDocument()
    const kamino = await screen.findByText(/Kamino/i)
    expect(kamino).toBeInTheDocument()
    
  })

  it('verifica o filtro por nome', async ()=> {
    render(<App />);
    await waitFor(
      () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
      { timeout: 3000 }
    );
      const inputSearch = screen.getByTestId('name-filter')
      expect(inputSearch).toBeInTheDocument()

      const kamino = await screen.findByText(/Kamino/i)
      userEvent.type(inputSearch, 'tatooine')

      const tatooine = await screen.findByText(/Tatooine/i)
      expect(tatooine).toBeInTheDocument()
      expect(kamino).not.toBeInTheDocument()
  })

  it('Verifica a funcionalidade do botão "filtro"', async()=> {
    render(<App />);
    await waitFor(
      () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
      { timeout: 3000 }
    );

    const btnFilter = screen.getByTestId('button-filter');
    
    const hoth = await screen.findByText(/Hoth/i)
    const dagobah = await screen.findByText(/Dagobah/i)
    const tatooine = await screen.findByText(/Tatooine/i)

    userEvent.click(btnFilter)
    expect(hoth).not.toBeInTheDocument();
    expect(dagobah).not.toBeInTheDocument();
    expect(tatooine).toBeInTheDocument();

  })

})
