import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('Paris');
    const [error, setError] = useState('');

    const apiKey = '54553239455bcc336e164285286cdcf6';

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
                setWeatherData(response.data);
                setError('');
            } catch (err) {
                setError('Erreur de chargement des données météo.');
            }
        };

        fetchWeatherData();
    }, [city]);

    return (
        <div className="weather-page" style={{ paddingTop: '150px' }}>
            <style>
                {`
                    .weather-page {
                        font-family: Arial, sans-serif;
                        background-color: #ecf0f1;
                        padding: 20px;
                        color: #2C3E50;
                        min-height: 100vh;
                    }

                    .weather-container {
                        background-color: #3498db;
                        color: white;
                        padding: 30px;
                        border-radius: 10px;
                        max-width: 500px;
                        margin: 0 auto;
                        text-align: center;
                    }

                    .weather-container h1 {
                        font-size: 2rem;
                    }

                    .weather-container input {
                        padding: 10px;
                        font-size: 1rem;
                        border-radius: 5px;
                        border: none;
                        margin: 10px 0;
                        width: 80%;
                        max-width: 300px;
                    }

                    .weather-container button {
                        padding: 10px;
                        background-color: #1ABC9C;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        font-size: 1rem;
                        cursor: pointer;
                    }

                    .weather-container button:hover {
                        background-color: #16a085;
                    }

                    .weather-info {
                        margin-top: 20px;
                    }

                    .weather-info h2 {
                        font-size: 1.5rem;
                    }

                    .weather-info p {
                        font-size: 1.1rem;
                    }

                    .error-message {
                        color: #e74c3c;
                    }
                `}
            </style>

            <div className="weather-container">
                <h1>Prévisions Météo</h1>
                <input
                    type="text"
                    placeholder="Entrez une ville"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={() => setCity(city)}>Rechercher</button>

                {error && <p className="error-message">{error}</p>}

                {weatherData && (
                    <div className="weather-info">
                        <h2>{weatherData.name}</h2>
                        <p>{weatherData.weather[0].description}</p>
                        <p>Température : {weatherData.main.temp}°C</p>
                        <p>Humidité : {weatherData.main.humidity}%</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Weather;
