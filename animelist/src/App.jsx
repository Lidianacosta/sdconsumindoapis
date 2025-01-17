import React, { useEffect, useState } from "react";
import "./App.css"; // Opcional: para estilização

const App = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await fetch("https://api.jikan.moe/v4/top/anime");
        const data = await response.json();
        setAnimes(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os animes:", error);
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  return (
    <div className="container">
      <h1>Top Animes</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="anime-list">
          {animes.map((anime) => (
            <div key={anime.mal_id} className="anime">
              <img src={anime.images.jpg.image_url} alt={anime.title} />
              <div className="anime-details">
                <h2>{anime.title}</h2>
                <p>Score: {anime.score || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;