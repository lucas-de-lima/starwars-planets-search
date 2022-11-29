import React, { useContext, useEffect } from 'react';
import SwPlanetsContext from '../context/SwPlanetsContext';
import Planets from './Planets';

export default function Table() {
  const { SwData, search, filtredPlanets,
    setFiltredPlanets, click, orderFilter } = useContext(SwPlanetsContext);

  useEffect(() => {
    setFiltredPlanets(SwData.filter((element) => element.name
      .toUpperCase().includes((search.toUpperCase()))));
  }, [search]);

  useEffect(() => {
    const unknown = filtredPlanets
      .filter((element) => element[orderFilter.order.column] === 'unknown');
    const notUnknown = filtredPlanets
      .filter((element) => element[orderFilter.order.column] !== 'unknown');

    if (orderFilter.order.sort === 'ASC') {
      const notUnknownSorted = notUnknown
        .sort((a, b) => a[orderFilter.order.column] - b[orderFilter.order.column]);
      setFiltredPlanets([...notUnknownSorted, ...unknown]);
    }
    if (orderFilter.order.sort === 'DESC') {
      const notUnknownSorted = notUnknown
        .sort((a, b) => b[orderFilter.order.column] - a[orderFilter.order.column]);
      setFiltredPlanets([...notUnknownSorted, ...unknown]);
    }
  }, [click]);

  return (
    <div>
      { !filtredPlanets.length && <p>Carregando...</p> }

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Obribal Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          { filtredPlanets.map((data) => (
            <tr key={ data.name }>
              <Planets planet={ data } />
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}
