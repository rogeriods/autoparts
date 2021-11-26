import axios from 'axios';
import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
//import { Redirect } from 'react-router-dom';

function ProdutoForm() {
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [estoqueMinimo, setEstoqueMinimo] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [imageName, setImageName] = useState('default.png');
  const [redirect, setRedirect] = useState(false);

  async function submit(e: SyntheticEvent) {
    e.preventDefault();

    const data = {
      descricao,
      preco,
      codigoBarras,
      estoqueMinimo,
      observacoes,
      imageName,
    };

    console.log(data);

    //if (props.match.params.id) {
    //  await axios.put(`products/${props.match.params.id}`, data);
    //} else {
    await axios.post('produtos', data);
    //}

    setRedirect(true);
  }

  const uploadFileHandler = async (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const formData = new FormData();

    formData.append('file', file);

    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      // TODO: retornar somente o nome do arquivo.extensao
      const { data } = await axios.post('produtos/upload', formData, config);

      setImageName(data);
    } catch (error) {
      console.error(error);
    }
  };

  //if (redirect) {
  //  return <Redirect to={'/'} />;
  //}

  return (
    <div className="container-sm">
      <h3>Produtos (Form)</h3>
      <form onSubmit={submit}>
        <input hidden type="text" name="id" />

        <div className="form-group">
          <img src={`http://localhost:8080/uploaded-images/${imageName}`} alt="produto-logo" />
        </div>
        <Form.Control
          type="text"
          placeholder="Enter image url"
          onChange={(e) => setImageName(e.target.value)}
        ></Form.Control>
        <Form.Group controlId="image">
          <Form.Control name="file" type="file" onChange={uploadFileHandler} />
        </Form.Group>

        <div className="form-group">
          <label>Descrição *</label>
          <input
            type="text"
            className="form-control"
            placeholder="Breve descrição do produto"
            required
            name="descricao"
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group">
              <label>Estoque minímo</label>
              <input
                type="number"
                className="form-control"
                min="1"
                step="1"
                name="estoqueMinimo"
                onChange={(e) => setEstoqueMinimo(e.target.value)}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <label>Preço sugerido (R$)</label>
              <input
                type="number"
                className="form-control"
                min="1"
                step="0.01"
                name="preco"
                onChange={(e) => setPreco(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Código de barras</label>
          <input
            type="text"
            className="form-control"
            placeholder="Código de barras"
            name="codigoBarras"
            onChange={(e) => setCodigoBarras(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Observações</label>
          <textarea
            className="form-control"
            rows={4}
            placeholder="Observações gerais do produto"
            name="observacoes"
            onChange={(e) => setObservacoes(e.target.value)}
          />
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
