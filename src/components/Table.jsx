import React, { useContext } from 'react';
import SwPlanetsContext from '../context/SwPlanetsContext';
import Planets from './Planets';

export default function Table() {
  const { isLoading, SwData } = useContext(SwPlanetsContext);
  return isLoading ? (
    <p>Carregando...</p>
  ) : (
    <div>
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
          { SwData.map((data) => (
            <tr key={ data.name }>
              <Planets planet={ data } />
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}
