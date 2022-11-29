import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from './testData';
import userEvent from '@testing-library/user-event';

describe('Testando App', ()=> {
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
      { timeout: 5000 }
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
      { timeout: 5000 }
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

  it('Verifica se filtro de diametro menos que 5000 funciona', async ()=> {
    render(<App />);
    await waitFor(
      () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
      { timeout: 5000 }
    );

    const inputColumn = screen.getByTestId('column-filter');
    fireEvent.change(inputColumn, {target: { value: 'diameter'}})

    const inputComparison = screen.getByTestId('comparison-filter')
    fireEvent.change(inputComparison, {target: { value: 'menor que'}})

    const inputValue = screen.getByTestId('value-filter');
    userEvent.clear(inputValue)
    userEvent.type(inputValue, '5000')

    const tatooine = await screen.findByText(/Tatooine/i)

    const btnFilter = screen.getByTestId('button-filter');
    userEvent.click(btnFilter)

    const endor = await screen.findByText(/Endor/i)

    expect(endor).toBeInTheDocument();
    expect(tatooine).not.toBeInTheDocument();
  })

  it('Verifica se a ordem de planetas é alterada após ordenar', async ()=>{
    render(<App />);
    await waitFor(
      () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
      { timeout: 5000 }
    );

    const tatooine = await screen.findByText(/Tatooine/i)
    const endor = await screen.findByText(/Endor/i)

    const btnOrder = await screen.findByTestId('column-sort-button');

    userEvent.click(btnOrder)

    expect(tatooine).toBeInTheDocument();
    expect(endor).toBeInTheDocument();

  })

  it('Verifica se a ordem dos planetas é alterada quando usado filtro ASC e DESC', async ()=> {
    render(<App />);
    await waitFor(
      () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
      { timeout: 5000 }
    );

    const descInput = screen.getByTestId('column-sort-input-desc');
    userEvent.click(descInput)

    const btnOrderDESC = screen.getByTestId('column-sort-button');
    userEvent.click(btnOrderDESC)

    const tablePlanetsDESC = await screen.findAllByTestId('planet-name')
    expect(tablePlanetsDESC[0]).toHaveTextContent('Coruscant');

    const ascInput = screen.getByTestId('column-sort-input-asc');
    userEvent.click(ascInput)

    const btnOrderASC = screen.getByTestId('column-sort-button');
    userEvent.click(btnOrderASC)

    const tablePlanetsASC = await screen.findAllByTestId('planet-name')
    expect(tablePlanetsASC[0]).toHaveTextContent('Yavin IV');

  })

  it('Verifica se é possivel criar um filtro, e se é possivel apaga-lo', async ()=>{
    render(<App />);
    await waitFor(
      () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
      { timeout: 5000 }
    );

    const inputColumn = screen.getByTestId('column-filter');
    fireEvent.change(inputColumn, {target: { value: 'diameter'}})

    const inputComparison = screen.getByTestId('comparison-filter')
    fireEvent.change(inputComparison, {target: { value: 'menor que'}})

    const inputValue = screen.getByTestId('value-filter');
    userEvent.clear(inputValue)
    userEvent.type(inputValue, '5000')


    const btnFilter = screen.getByTestId('button-filter');
    userEvent.click(btnFilter)

    const tablePlanets = await screen.findAllByTestId('planet-name')
    expect(tablePlanets.length).toBe(1)


    const btnRemove = await screen.findByRole('button', {name: /x/i})
    userEvent.click(btnRemove)
    const tablePlanetsNoFilter = await screen.findAllByTestId('planet-name')
    expect(tablePlanetsNoFilter.length).toBe(10)

  })

  it('Verifica se o botão de apagar todos os filtros é funcional', async () => {
    render(<App />);
    await waitFor(
      () => expect(screen.queryAllByText('Carregando...')).toHaveLength(0),
      { timeout: 5000 }
    );

    const inputColumn = screen.getByTestId('column-filter');
    fireEvent.change(inputColumn, {target: { value: 'surface_water'}})

    const inputComparison = screen.getByTestId('comparison-filter')
    fireEvent.change(inputComparison, {target: { value: 'igual a'}})

    const inputValue = screen.getByTestId('value-filter');
    userEvent.clear(inputValue)
    userEvent.type(inputValue, '8')

    const btnFilter = screen.getByTestId('button-filter');
    userEvent.click(btnFilter)

    const inputSortColumn = screen.getByTestId('column-sort');
    fireEvent.change(inputSortColumn, {target: { value: 'diameter'}})

    const btnOrder = screen.getByTestId('column-sort-button');
    userEvent.click(btnOrder)

    const tablePlanetsFiltred = await screen.findAllByTestId('planet-name')
    expect(tablePlanetsFiltred[0]).toHaveTextContent('Endor');

    const btnRomeveAllFilters = screen.getByTestId('button-remove-filters');
    userEvent.click(btnRomeveAllFilters);

    const tablePlanetsNoFiltred = await screen.findAllByTestId('planet-name')
    expect(tablePlanetsNoFiltred[0]).toHaveTextContent('Tatooine');

  })

})
