import React, { useContext, useEffect } from 'react';
import SwPlanetsContext from '../context/SwPlanetsContext';

function FiltersBar() {
  const { columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter, filtredPlanets,
    setFiltredPlanets, filters, setFilters,
    columnSelect, setColumnSelect } = useContext(SwPlanetsContext);

  useEffect(() => {
    filters.forEach((filter) => {
      switch (filter.comparisonFilter) {
      case 'menor que':
        setFiltredPlanets(filtredPlanets
          .filter((element) => +element[filter.columnFilter] < +filter.valueFilter));
        break;

      case 'maior que':
        setFiltredPlanets(filtredPlanets
          .filter((element) => +element[filter.columnFilter] > +filter.valueFilter));
        break;

      case 'igual a':
        setFiltredPlanets(filtredPlanets
          .filter((element) => element[filter.columnFilter] === filter.valueFilter));
        break;

      default:
        break;
      }
    });
    setColumnFilter(columnSelect[0]);
  }, [filters, columnSelect]);

  const createNumericFilter = () => {
    setFilters((prevState) => [...prevState, {
      columnFilter,
      comparisonFilter,
      valueFilter,
    }]);
    setColumnSelect((prevState) => prevState.filter((option) => option !== columnFilter));
  };

  return (
    <div>
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
      { filters.map((filter) => (
        <div key={ filter.columnFilter }>
          <p>{filter.columnFilter}</p>
          <p>{filter.comparisonFilter}</p>
          <p>{filter.valueFilter}</p>
        </div>
      )) }
    </div>
  );
}

export default FiltersBar;
