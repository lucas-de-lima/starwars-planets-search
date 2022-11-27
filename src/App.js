import React from 'react';
import './App.css';
import BarForSearch from './components/BarForSearch';
import FiltersBar from './components/FiltersBar';
import Table from './components/Table';
import SwPlanetsProvider from './context/SwPlanetsProvider';

function App() {
  return (
    <SwPlanetsProvider>
      <BarForSearch />
      <FiltersBar />
      <Table />
    </SwPlanetsProvider>
  );
}

export default App;
