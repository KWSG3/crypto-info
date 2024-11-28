import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Chart from './Chart';  // Importuj komponent wykresu

const CryptoInfoPage = () => {
  const { id } = useParams();  // Pobierz nazwę kryptowaluty z URL
  const [cryptoInfo, setCryptoInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCryptoInfo = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCryptoInfo(response.data);
      } catch (err) {
        console.error('Błąd podczas pobierania danych kryptowaluty', err);
      }
    };

    fetchCryptoInfo();
  }, [id]);

  const handleGoBack = () => {
    navigate('/');  // Powrót do strony głównej
  };

  if (!cryptoInfo) return <div>Ładowanie danych...</div>;

  return (
    <div className="crypto-info-page">
      <h1>{cryptoInfo.name}</h1>
      <h2>{cryptoInfo.symbol.toUpperCase()}</h2>
      <p><strong>Aktualna cena: </strong>{cryptoInfo.market_data.current_price.usd} USD</p>
      <p><strong>Zmiana 24h: </strong>{cryptoInfo.market_data.price_change_percentage_24h}%</p>
      <Chart coinId={id} />  {/* Wykres kryptowaluty */}
    </div>
  );
};

export default CryptoInfoPage;
