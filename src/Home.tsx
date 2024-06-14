import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css"; // Importando arquivo de estilos

function Home() {
  const [pastor, setPastor] = useState("");
  const [tesoureiros, setTesoureiros] = useState<String[]>([]);
  const [versiculo, setVersiculo] = useState("");

  useEffect(() => {
    // Obter os nomes do pastor e dos tesoureiros (supondo que você os obtenha de alguma fonte)
    setPastor("Cenilson Gomes");
    setTesoureiros(["Pablo", "Raiane"]);

    // Obter um versículo aleatório da API
    const fetchVersiculoAleatorio = async () => {
      try {
        const response = await axios.get(
          "https://www.abibliadigital.com.br/api/verses/nvi/random"
        );
        setVersiculo(response.data.text);
      } catch (error) {
        console.error("Erro ao obter versículo:", error);
      }
    };

    fetchVersiculoAleatorio();
  }, []);

  return (
    <div className="home-container">
      <h1>Home</h1>
      <div>
        <h2>Pastor: {pastor}</h2>
        <h2>Tesoureiros:</h2>
        <ul>
          {tesoureiros.map((tesoureiro, index) => (
            <li key={index}>{tesoureiro}</li>
          ))}
        </ul>
      </div>
      {versiculo && (
        <div className="card">
          <h3>Versículo Aleatório</h3>
          <p className="versiculo-text">&ldquo;{versiculo}&rdquo;</p>
        </div>
      )}
    </div>
  );
}

export default Home;
