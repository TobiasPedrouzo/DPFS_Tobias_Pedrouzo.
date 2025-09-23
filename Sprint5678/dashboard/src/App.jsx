import { useState, useEffect } from 'react';
import './App.css';
import TotalsPanel from './components/TotalsPanel';
import LastCreatedPanel from './components/LastCreatedPanel';
import CategoriesPanel from './components/CategoriesPanel';
import ProductsListPanel from './components/ProductsListPanel';

function App() {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <TotalsPanel />
      <div className="main-content">
        <LastCreatedPanel />
        <CategoriesPanel />
      </div>
      <ProductsListPanel />
    </div>
  );
}

export default App;
