import React, { useEffect, useMemo, useState } from 'react';
import SwPlanetsContext from './SwPlanetsContext';

export default function SwPlanetsProvider({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [SwData, setSwData] = useState([]);
  const [search, setSearch] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filtredPlanets, setFiltredPlanets] = useState([]);
  const [filters, setFilters] = useState([]);
  const [columnSelect, setColumnSelect] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [columnSelectFilter, setColumnSelectFilter] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [orderFilter, setOrderFilter] = useState({ order:
     { column: 'population', sort: 'ASC' } });
  const [click, setClick] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // setLoading(true);

        const response = await fetch('https://swapi.dev/api/planets');

        const data = await response.json();
        const removeResidentsInDataArray = data.results.map((element) => {
          delete element.residents;
          return element;
        });

        setSwData(removeResidentsInDataArray);
      } catch (error) {
        setErrors(error);
      } finally {
        // setLoading(false);
      }
    }

    if (isLoading) {
      fetchData();
      setLoading(false);
    }

    if (!isLoading) {
      setFiltredPlanets(SwData);
    }
  }, [isLoading, SwData]);

  const values = useMemo(() => ({
    isLoading,
    SwData,
    search,
    setSearch,
    columnFilter,
    setColumnFilter,
    comparisonFilter,
    setComparisonFilter,
    valueFilter,
    setValueFilter,
    filtredPlanets,
    setFiltredPlanets,
    filters,
    setFilters,
    columnSelect,
    setColumnSelect,
    columnSelectFilter,
    setColumnSelectFilter,
    orderFilter,
    setOrderFilter,
    click,
    setClick,
  }), [isLoading, SwData, search, columnFilter,
    comparisonFilter, valueFilter, filtredPlanets, filters,
    columnSelect, columnSelectFilter, orderFilter, click, setClick]);

  return (
    <SwPlanetsContext.Provider value={ values }>
      { children }
    </SwPlanetsContext.Provider>
  );
}

SwPlanetsProvider.propTypes = {}.isRequerid;
