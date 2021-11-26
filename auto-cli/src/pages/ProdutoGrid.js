import { useState, useEffect } from 'react';
import { Container, Table, Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';

const ProdutoGrid = () => {
  const [produtos, setProdutos] = useState([]);

  // Carrega o grid 'construtor'
  useEffect(() => {
    const loadProdutos = async () => {
      const { data } = await axios.get('produtos');
      setProdutos(data);
    };
    loadProdutos();
  }, []);

  // Deleta produto e atualiza o grid
  async function deleteProduto(id) {
    if (window.confirm('Deseja realmente deletar este produto?')) {
      await axios.delete(`produtos/${id}`);
      setProdutos(produtos.filter((p) => p.id !== id));
    }
  }

  return (
    <Container>
      <h4 className="mt-3">Produto(s)</h4>
      <Table striped bordered hover>
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
                <th scope="row" style={{ width: 80 }}>
                  {produto.id}
                </th>
                <td style={{ width: 120 }}>
                  <img
                    src={`http://localhost:8080/uploaded-images/${produto.imageName}`}
                    alt="produto-logo"
                    width="110"
                    height="50"
                  />
                </td>
                <td>{produto.descricao}</td>
                <td style={{ width: 150 }}>{produto.estoqueMinimo}</td>
                <td style={{ width: 150 }}>{produto.preco}</td>
                <td style={{ width: 120 }}>
                  <ButtonGroup aria-label="Actions" size="sm">
                    <Button variant="dark" href={`produto/${produto.id}/editar`}>
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => deleteProduto(produto.id)}>
                      Deletar
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProdutoGrid;
