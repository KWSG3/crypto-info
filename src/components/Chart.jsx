import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Chart.css'; // Zaimportowanie pliku CSS

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`);
        const data = response.data;

        setChartData({
          labels: data.prices.map(price => new Date(price[0]).toLocaleDateString()),
          datasets: [
            {
              label: 'Cena w USD',
              data: data.prices.map(price => price[1]),
              borderColor: '#385170',
              tension: 0.1,
            },
          ],
        });
      } catch (err) {
        console.error('Błąd podczas ładowania wykresu', err);
      }
    };

    fetchChartData();
  }, [coinId]);

  return (
    <div className="chart-container">
      <h2 className="chart-title">Cena kryptowaluty (USD)</h2>
      <div className="chart">
        {chartData ? <Line data={chartData} /> : <div>Ładowanie wykresu...</div>}
      </div>
      <button className="go-back-button" onClick={() => window.history.back()}>
        Cofnij
      </button>
    </div>
  );
};

export default Chart;
