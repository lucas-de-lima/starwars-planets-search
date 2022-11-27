import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import SwPlanetsContext from './SwPlanetsContext';

export default function SwPlanetsProvider({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [SwData, setSwData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        // setLoading(true);

        const response = await fetch('https://swapi.dev/api/planets');

        if (!response.ok) {
          const newError = await response.json();
          throw newError.message;
        }

        const data = await response.json();
        const removeResidentsInDataArray = data.results.map((element) => {
          delete element.residents;
          return element;
        });

        setSwData(removeResidentsInDataArray);
      } catch (error) {
        console.log('Error');
      } finally {
        // setLoading(false);
      }
    }

    if (isLoading) {
      fetchData();
      setLoading(false);
    }
  }, [isLoading, SwData]);

  const values = useMemo(() => ({
    isLoading,
    SwData,
    search,
    setSearch,
  }), [isLoading, SwData, search]);

  return (
    <SwPlanetsContext.Provider value={ values }>
      { children }
    </SwPlanetsContext.Provider>
  );
}

SwPlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
