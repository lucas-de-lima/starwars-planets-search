import React, { useContext, useEffect } from 'react';
import SwPlanetsContext from '../context/SwPlanetsContext';

function FiltersBar() {
  const { columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    setFiltredPlanets, filters, setFilters,
    columnSelect, setColumnSelect, SwData, isLoading,
    columnSelectFilter, orderFilter, setOrderFilter,
    click, setClick,
  } = useContext(SwPlanetsContext);

  useEffect(() => {
    setFiltredPlanets(SwData);
    filters.forEach((filter) => {
      switch (filter.comparisonFilter) {
      case 'menor que':
        setFiltredPlanets((prevState) => prevState
          .filter((element) => +element[filter.columnFilter] < +filter.valueFilter));
        break;

      case 'maior que':
        setFiltredPlanets((prevState) => prevState
          .filter((element) => +element[filter.columnFilter] > +filter.valueFilter));
        break;

      case 'igual a':
        setFiltredPlanets((prevState) => prevState
          .filter((element) => element[filter.columnFilter] === filter.valueFilter));
        break;

      default:
        break;
      }
    });
    setColumnFilter(columnSelect[0]);
  }, [filters, columnSelect]);

  useEffect(() => {

  }, [click]);

  const createNumericFilter = () => {
    setFilters((prevState) => [...prevState, {
      columnFilter,
      comparisonFilter,
      valueFilter,
    }]);
    setColumnSelect((prevState) => prevState.filter((option) => option !== columnFilter));
  };

  const removeFilter = (columnToRemove) => {
    setFilters((prevState) => prevState
      .filter((filter) => filter.columnFilter !== columnToRemove));
    setColumnSelect((prevState) => [...prevState, columnToRemove]);
  };

  const removeAllFilters = () => {
    setFilters([]);
    setColumnSelect(['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water']);
  };

  const orderResults = () => {
    setClick((prevState) => !prevState);
  };

  return (
    <div>
      { isLoading && <p>Carregando...</p> }
      <select
        data-testid="column-filter"
        value={ columnFilter }
        onChange={ (event) => setColumnFilter(event.target.value) }
      >
        { columnSelect.map((option) => (
          <option value={ option } key={ option }>{ option }</option>
        )) }
      </select>

      <select
        value={ comparisonFilter }
        onChange={ (event) => setComparisonFilter(event.target.value) }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        value={ valueFilter }
        onChange={ (event) => setValueFilter(event.target.value) }
        type="number"
        data-testid="value-filter"
      />
      <button
        onClick={ createNumericFilter }
        type="button"
        data-testid="button-filter"
      >
        Filtro

      </button>

      <select
        data-testid="column-sort"
        value={ orderFilter.order.column }
        onChange={ (event) => setOrderFilter({ order:
         { ...orderFilter.order, column: event.target.value } }) }
      >
        { columnSelectFilter.map((option) => (
          <option value={ option } key={ option }>{ option }</option>
        )) }
      </select>

      <input
        type="radio"
        name="sort-radios"
        value="ASC"
        checked={ orderFilter.order.sort === 'ASC' }
        onChange={ (event) => setOrderFilter({ order:
         { ...orderFilter.order, sort: event.target.value } }) }
        data-testid="column-sort-input-asc"
      />
      <input
        type="radio"
        name="sort-radios"
        value="DESC"
        checked={ orderFilter.order.sort === 'DESC' }
        onChange={ (event) => setOrderFilter({ order:
         { ...orderFilter.order, sort: event.target.value } }) }
        data-testid="column-sort-input-desc"
      />

      <button
        type="button"
        onClick={ orderResults }
        data-testid="column-sort-button"
      >
        Ordenar

      </button>

      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ removeAllFilters }
      >
        Remover todas filtragens

      </button>
      { filters.map((filter) => (
        <div data-testid="filter" key={ filter.columnFilter }>
          <p>{filter.columnFilter}</p>
          <p>{filter.comparisonFilter}</p>
          <p>{filter.valueFilter}</p>
          <button
            type="button"
            onClick={ () => removeFilter(filter.columnFilter) }
          >
            X

          </button>
        </div>
      )) }
    </div>
  );
}

export default FiltersBar;
