import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css'; // Import CSS

const HomePage = () => {
  const [coinName, setCoinName] = useState('');
  const [coins, setCoins] = useState([]);
  const navigate = useNavigate(); // Inicjalizacja hooka do nawigacji

  // Pobieranie popularnych kryptowalut z CoinGecko API
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 15,
            page: 1
          }
        });
        setCoins(response.data); // Przechowuj dane o kryptowalutach
      } catch (error) {
        console.error('Błąd pobierania danych kryptowalut:', error);
      }
    };

    fetchCoins();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (coinName) {
      // Jeśli wprowadzono nazwę kryptowaluty, przekieruj na stronę z wynikami
      navigate(`/crypto/${coinName.toLowerCase()}`);
    } else {
      // Jeśli pole jest puste, pokazujemy komunikat o błędzie
      alert("Wpisz nazwę kryptowaluty");
    }
  };

  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <h1 className="homepage-header">Wyszukaj Kryptowalutę</h1>

        <form className="search-box" onSubmit={handleSubmit}>
          <input
            className="search-input"
            type="text"
            placeholder="Wpisz nazwę kryptowaluty"
            value={coinName}
            onChange={(e) => setCoinName(e.target.value)}
          />
          <button className="search-button" type="submit">
            Wyszukaj
          </button>
        </form>

        <div className="popular-coins">
          <h2>Najpopularniejsze Kryptowaluty</h2>
          <div className="coins-list">
            {coins.map((coin) => (
              <div key={coin.id} className="coin-item">
                <img src={coin.image} alt={coin.name} className="coin-logo" />
                <span className="coin-name">{coin.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
