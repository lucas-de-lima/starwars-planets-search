import React, { useContext } from 'react';
import SwPlanetsContext from '../context/SwPlanetsContext';

function BarForSearch() {
  const { search, setSearch } = useContext(SwPlanetsContext);

  return (
    <div>
      <input
        type="text"
        value={ search }
        onChange={ (event) => setSearch(event.target.value) }
        name="search"
        data-testid="name-filter"
      />
      Search Planets
    </div>
  );
}

export default BarForSearch;
