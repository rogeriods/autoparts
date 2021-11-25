import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Produto } from '../../models/Produto';

function ProdutoGrid() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // Load form
  useEffect(() => {
    async function loadProdutos() {
      const { data } = await axios.get('produtos');
      setProdutos(data);
    }
    loadProdutos();
  }, []);

  // Delete
  async function delProduto(id: number) {
    if (window.confirm('Deseja realmente deletar este produto?')) {
      await axios.delete(`produtos/${id}`);

      setProdutos(produtos.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="container">
      <h3>Produtos</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Imagem</th>
            <th scope="col">Descrição</th>
            <th scope="col">Estoque Minímo</th>
            <th scope="col">Preço R$</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => {
            return (
              <tr key={produto.id}>
                <th scope="row">{produto.id}</th>
                <td>
                  <img
                    src={`http://localhost:8080/uploaded-images/${produto.imageName}`}
                    alt="produto-logo"
                    width="120"
                    height="60"
                  />
                </td>
                <td>{produto.descricao}</td>
                <td>{produto.estoqueMinimo}</td>
                <td>{produto.preco}</td>
                <td style={{ width: 80 }}>
                  <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                    <Link to={`produto/${produto.id}/editar`} className="btn btn-outline-dark">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button type="button" className="btn btn-outline-danger" onClick={() => delProduto(produto.id)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProdutoGrid;
