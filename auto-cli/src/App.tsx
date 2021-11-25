import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProdutoForm from './pages/produtos/ProdutoForm';
import ProdutoGrid from './pages/produtos/ProdutoGrid';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProdutoGrid />} />
        <Route path="/produto/novo" element={<ProdutoForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
