import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SwPlanetsProvider from './context/SwPlanetsProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <SwPlanetsProvider>
      <App />
    </SwPlanetsProvider>,
  );
