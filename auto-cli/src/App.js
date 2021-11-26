import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProdutoGrid from './pages/ProdutoGrid';
import ProdutoForm from './pages/ProdutoForm';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProdutoGrid />} />
        <Route path="/produto/novo" element={<ProdutoForm />} />
        <Route path="/produto/:produtoId/editar" element={<ProdutoForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
