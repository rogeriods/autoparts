import React from 'react';
import { Form } from 'react-bootstrap';

function ProdutoForm() {
  return (
    <div className="container">
      <h3>Produtos (Form)</h3>
      <form>
        <input hidden type="text" name="id" />

        <div className="form-group">
          <img src="http://localhost:8080/uploaded-images/default.png" alt="produto-logo" />
        </div>
        <Form.Group controlId="image">
          <Form.Control id="image-file" type="file" />
        </Form.Group>

        <div className="form-group">
          <label>Descrição *</label>
          <input
            type="text"
            className="form-control"
            placeholder="Breve descrição do produto"
            required
            name="descricao"
          />
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label>Estoque minímo</label>
              <input type="number" className="form-control" min="1" step="1" name="estoqueMinimo" />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Preço sugerido (R$)</label>
              <input type="number" className="form-control" min="1" step="0.01" name="preco" />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Código de barras</label>
          <input type="text" className="form-control" placeholder="Código de barras" name="codigoBarras" />
        </div>
        <div className="form-group">
          <label>Observações</label>
          <textarea className="form-control" rows={4} placeholder="Observações gerais do produto" name="observacoes" />
        </div>

        <hr />

        <button type="submit" className="btn btn-primary">
          Gravar
        </button>
      </form>
    </div>
  );
}

export default ProdutoForm;
