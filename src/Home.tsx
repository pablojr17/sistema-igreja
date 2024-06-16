import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";

const BibleVerse = () => {
  const [verse, setVerse] = useState("");

  useEffect(() => {
    generateVerse();
  }, []);

  const generateVerse = () => {
    const books = [
      "Genesis",
      "Exodus",
      "Leviticus",
      "Numbers",
      "Deuteronomy",
      "Joshua",
      "Judges",
      "Ruth",
      "1 Samuel",
      "2 Samuel",
      "1 Kings",
      "2 Kings",
      "1 Chronicles",
      "2 Chronicles",
      "Ezra",
      "Nehemiah",
      "Esther",
      "Job",
      "Psalms",
      "Proverbs",
      "Ecclesiastes",
      "Song of Solomon",
      "Isaiah",
      "Jeremiah",
      "Lamentations",
      "Ezekiel",
      "Daniel",
      "Hosea",
      "Joel",
      "Amos",
      "Obadiah",
      "Jonah",
      "Micah",
      "Nahum",
      "Habakkuk",
      "Zephaniah",
      "Haggai",
      "Zechariah",
      "Malachi",
      "Matthew",
      "Mark",
      "Luke",
      "John",
      "Acts",
      "Romans",
      "1 Corinthians",
      "2 Corinthians",
      "Galatians",
      "Ephesians",
      "Philippians",
      "Colossians",
      "1 Thessalonians",
      "2 Thessalonians",
      "1 Timothy",
      "2 Timothy",
      "Titus",
      "Philemon",
      "Hebrews",
      "James",
      "1 Peter",
      "2 Peter",
      "1 John",
      "2 John",
      "3 John",
      "Jude",
      "Revelation",
    ];

    const randomBook = books[Math.floor(Math.random() * books.length)];
    const randomChapter = Math.floor(Math.random() * 50) + 1;
    const randomVerse = Math.floor(Math.random() * 20) + 1;

    fetch(`https://bible-api.com/${randomBook}+${randomChapter}:${randomVerse}`)
      .then((response) => response.json())
      .then((data) => setVerse(`${data.reference}: ${data.text}`));
  };

  return (
    <div className="card">
      <h3>Versículo Aleatório</h3>
      <p className="versiculo-text">&ldquo;{verse}&rdquo;</p>
    </div>
  );
};

function Home() {
  const [pastor, setPastor] = useState("");
  const [tesoureiros, setTesoureiros] = useState<String[]>([]);
  const [eventoDestaque, setEventoDestaque] = useState("");

  useEffect(() => {
    // Obter os nomes do pastor e dos tesoureiros (supondo que você os obtenha de alguma fonte)
    setPastor("Cenilson Gomes");
    setTesoureiros(["Pablo", "Raiane"]);

    // Exemplo de evento em destaque
    setEventoDestaque("");
  }, []);

  return (
    <div className="home-container">
      <h1>
        Bem-vindo ao sistema de acompanhamento financeiro da Igreja Assembleia
        de Deus - Cotegipe Deus
      </h1>
      <div>
        <h2>Pastor: {pastor}</h2>
        <h2>Tesoureiros:</h2>
        <ul>
          {tesoureiros.map((tesoureiro, index) => (
            <li key={index}>{tesoureiro}</li>
          ))}
        </ul>
      </div>
      {/* Componente BibleVerse para exibir o versículo aleatório */}
      <BibleVerse />
    </div>
  );
}

export default Home;
