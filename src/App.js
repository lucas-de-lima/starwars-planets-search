import React from 'react';
import './App.css';
import BarForSearch from './components/BarForSearch';
import FiltersBar from './components/FiltersBar';
import Table from './components/Table';

function App() {
  return (
    <>

      <span>Hello, App!</span>
      <div>
        <BarForSearch />
        <FiltersBar />
        <Table />
      </div>

    </>
  );
}

export default App;
