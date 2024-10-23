import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { BiLoaderAlt } from "react-icons/bi";

const CryptoGrid = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        setCryptoData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <BiLoaderAlt className="animate-spin text-6xl text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Cryptocurrency Market</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cryptoData.map((crypto) => (
          <div
            key={crypto.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ease-in-out focus-within:ring-2 focus-within:ring-blue-500 focus:outline-none"
            tabIndex="0"
          >
            <div className="flex items-center mb-4">
              <img
                src={crypto.image}
                alt={`${crypto.name} icon`}
                className="w-10 h-10 mr-4"
              />
              <h2 className="text-xl font-semibold">{crypto.name}</h2>
            </div>
            <p className="text-gray-600 mb-2">{crypto.symbol.toUpperCase()}</p>
            <p className="text-2xl font-bold mb-2">
              ${crypto.current_price.toLocaleString()}
            </p>
            <div
              className={`flex items-center ${crypto.price_change_percentage_24h > 0
                  ? "text-green-500"
                  : "text-red-500"
                }`}
            >
              {crypto.price_change_percentage_24h > 0 ? (
                <FiArrowUp className="mr-1" />
              ) : (
                <FiArrowDown className="mr-1" />
              )}
              <span>
                {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoGrid;
