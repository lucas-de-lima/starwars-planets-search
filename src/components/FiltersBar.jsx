import React, { useContext } from 'react';
import SwPlanetsContext from '../context/SwPlanetsContext';

function FiltersBar() {
  const { columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter, filtredPlanets,
    setFiltredPlanets } = useContext(SwPlanetsContext);

  const createNumericFilter = () => {
    switch (comparisonFilter) {
    case 'menor que':
      setFiltredPlanets(filtredPlanets
        .filter((element) => element[columnFilter] < +valueFilter));
      break;

    case 'maior que':
      setFiltredPlanets(filtredPlanets
        .filter((element) => element[columnFilter] > +valueFilter));
      break;

    case 'igual a':
      setFiltredPlanets(filtredPlanets
        .filter((element) => element[columnFilter] === valueFilter));
      break;

    default:
      break;
    }
  };

  return (
    <div>
      <select
        data-testid="column-filter"
        value={ columnFilter }
        onChange={ (event) => setColumnFilter(event.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
    </div>
  );
}

export default FiltersBar;
