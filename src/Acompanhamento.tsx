import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Acompanhamento.css";

interface Dizimista {
  nome: string;
  valor: number;
}

interface Culto {
  id: number;
  dataCulto: string;
  nomeCulto: string;
  oferta: number;
  dizimistas: Dizimista[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

function Acompanhamento() {
  const [cultos, setCultos] = useState<Culto[]>([]);
  const [totalOferta, setTotalOferta] = useState(0);
  const [totalDizimos, setTotalDizimos] = useState(0);
  const [todosDizimistas, setTodosDizimistas] = useState<Dizimista[]>([]);
  const [totalGeral, setTotalGeral] = useState(0);

  useEffect(() => {
    const fetchCultos = async () => {
      try {
        const response = await axios.get(
          "https://igreja-api.vercel.app/cultos"
        );

        // const response = await axios.get(
        //   "https://data-sistema.vercel.app/db.json"
        // );
        setCultos(response.data);

        const totalOferta = response.data.reduce(
          (acc: number, culto: Culto) => acc + culto.oferta,
          0
        );
        setTotalOferta(totalOferta);

        const dizimistas = response.data.flatMap(
          (culto: Culto) => culto.dizimistas
        );
        setTodosDizimistas(dizimistas);

        const totalDizimos = dizimistas.reduce(
          (acc: number, dizimista: Dizimista) => acc + dizimista.valor,
          0
        );
        setTotalDizimos(totalDizimos);

        const totalGeral = totalOferta + totalDizimos;
        setTotalGeral(totalGeral);
      } catch (error) {
        console.error("Erro ao buscar cultos:", error);
      }
    };

    fetchCultos();
  }, []);

  return (
    <div className="container">
      <h1>Acompanhamento de Cultos</h1>
      <div className="summary">
        <div className="total-oferta">
          <h2>Valor Total das Ofertas: {formatCurrency(totalOferta)}</h2>
        </div>
        <div className="total-dizimos">
          <h2>Valor Total dos Dízimos: {formatCurrency(totalDizimos)}</h2>
        </div>
        <div className="total-geral">
          <h2>Valor Total Geral: {formatCurrency(totalGeral)}</h2>
        </div>
      </div>
      <div className="cards">
        {cultos.map((culto) => {
          const totalDizimoCulto = culto.dizimistas.reduce(
            (acc, dizimista) => acc + dizimista.valor,
            0
          );
          const totalGeralCulto = culto.oferta + totalDizimoCulto;
          return (
            <div className="card" key={culto.id}>
              <h2 style={{ fontSize: "1em" }}>
                {culto.nomeCulto} -{" "}
                {new Date(culto.dataCulto).toLocaleDateString()}
              </h2>

              <p>Oferta: {formatCurrency(culto.oferta)}</p>
              <p>Total Dízimos: {formatCurrency(totalDizimoCulto)}</p>
              <p>Total Geral: {formatCurrency(totalGeralCulto)}</p>
              <h3>Dizimistas:</h3>
              <ul>
                {culto.dizimistas.map((dizimista, index) => (
                  <li key={index}>
                    {index + 1}. {dizimista.nome} -{" "}
                    {formatCurrency(dizimista.valor)}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="card">
        <h3>Lista de Todos os Dizimistas</h3>
        <ul>
          {todosDizimistas.map((dizimista, index) => (
            <li key={index}>
              {index + 1}. {dizimista.nome} - {formatCurrency(dizimista.valor)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Acompanhamento;
