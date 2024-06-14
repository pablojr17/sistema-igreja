import axios from "axios";
import React, { useState } from "react";
import "./Registro.css";

interface Dizimista {
  nome: string;
  valor: number;
}

function Registro() {
  const [dataCulto, setDataCulto] = useState("");
  const [nomeCulto, setNomeCulto] = useState("");
  const [oferta, setOferta] = useState(0);
  const [nomeDizimista, setNomeDizimista] = useState("");
  const [valorDizimo, setValorDizimo] = useState(0);
  const [dizimistas, setDizimistas] = useState<Dizimista[]>([]);

  const adicionarDizimista = () => {
    setDizimistas([...dizimistas, { nome: nomeDizimista, valor: valorDizimo }]);
    setNomeDizimista("");
    setValorDizimo(0);
  };

  const enviarDados = async () => {
    const dados = {
      dataCulto,
      nomeCulto,
      oferta,
      dizimistas,
    };

    try {
      await axios.post("http://localhost:5000/cultos", dados);
      alert("Dados enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao enviar dados.");
    }
  };

  return (
    <div className="registro-container">
      <h1>Registro de Culto</h1>
      <div className="form-group">
        <label htmlFor="data-culto">Data do Culto:</label>
        <input
          type="date"
          id="data-culto"
          value={dataCulto}
          onChange={(e) => setDataCulto(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="nome-culto">Nome do Culto:</label>
        <input
          type="text"
          id="nome-culto"
          value={nomeCulto}
          onChange={(e) => setNomeCulto(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="oferta">Oferta:</label>
        <input
          type="number"
          id="oferta"
          value={oferta}
          onChange={(e) => setOferta(Number(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="nome-dizimista">Nome do Dizimista:</label>
        <input
          type="text"
          id="nome-dizimista"
          value={nomeDizimista}
          onChange={(e) => setNomeDizimista(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="valor-dizimo">Valor do Dízimo:</label>
        <input
          type="number"
          id="valor-dizimo"
          value={valorDizimo}
          onChange={(e) => setValorDizimo(Number(e.target.value))}
        />
      </div>
      <div className="button-group">
        <button onClick={adicionarDizimista}>Adicionar Dizimista</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {dizimistas.map((dizimista, index) => (
              <tr key={index}>
                <td>{dizimista.nome}</td>
                <td>{dizimista.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-group">
        <button onClick={enviarDados}>Enviar Dados</button>
      </div>
    </div>
  );
}

export default Registro;
