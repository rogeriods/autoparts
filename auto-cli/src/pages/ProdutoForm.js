import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';

const ProdutoForm = () => {
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState(1);
  const [codigoBarras, setCodigoBarras] = useState('');
  const [estoqueMinimo, setEstoqueMinimo] = useState(1);
  const [observacoes, setObservacoes] = useState('');
  const [imageName, setImageName] = useState('default.png');
  const [redirect, setRedirect] = useState(false);

  const params = useParams();

  // Carrego form se o id do produto for passado por parâmetro
  useEffect(() => {
    const loadProdutoById = async (id) => {
      const { data } = await axios.get(`produtos/${id}`);

      setDescricao(data.descricao || '');
      setPreco(data.preco || 1);
      setCodigoBarras(data.codigoBarras || '');
      setEstoqueMinimo(data.estoqueMinimo || 1);
      setObservacoes(data.observacoes || '');
      setImageName(data.imageName || '');
    };

    if (params.produtoId) {
      loadProdutoById(params.produtoId);
    }
  }, [params]);

  // Envia os dados pra API
  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      descricao,
      preco,
      codigoBarras,
      estoqueMinimo,
      observacoes,
      imageName,
    };

    // Verifico se é novo ou edição
    if (params.produtoId) {
      await axios.put(`produtos/${params.produtoId}`, data);
    } else {
      await axios.post('produtos', data);
    }

    setRedirect(true);
  };

  // Executa upload do arquivo selecionado
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('file', file);

    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const { data } = await axios.post('produtos/upload', formData, config);
      setImageName(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Redireciona para home
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <h4 className="mt-3">Produto (Form)</h4>
      <p>
        Campos em <b>*</b> são de preenchimento obrigatório.
      </p>
      <Form onSubmit={submitHandler}>
        <Card>
          <Card.Body>
            <Row className="justify-content-md-center">
              <Col xs md={6}>
                <Image src={`http://localhost:8080/uploaded-images/${imageName}`} thumbnail />
              </Col>
              <Col xs md={6}>
                <Form.Group className="mb-1" controlId="image">
                  <Form.Label>Imagem referência</Form.Label>
                  <Form.Control
                    type="text"
                    value={imageName}
                    onChange={(e) => setImageName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="image-file">
                  <Form.Control type="file" onChange={uploadFileHandler} />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="descricao">
              <Form.Label>Descrição *</Form.Label>
              <Form.Control
                type="text"
                required
                name="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="estoqueMinimo">
                  <Form.Label>Estoque mínimo</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    step="1"
                    name="estoqueMinimo"
                    value={estoqueMinimo}
                    onChange={(e) => setEstoqueMinimo(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="estoqueMinimo">
                  <Form.Label>Preço unitário (R$)</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    step="0.01"
                    name="preco"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="estoqueMinimo">
                  <Form.Label>Cód. Barra</Form.Label>
                  <Form.Control
                    type="text"
                    name="codigoBarras"
                    value={codigoBarras}
                    onChange={(e) => setCodigoBarras(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="observacoes">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Observações gerais do produto"
                name="observacoes"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Gravar
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  );
};

export default ProdutoForm;
