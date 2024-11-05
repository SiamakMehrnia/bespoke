import React, { useEffect, useState } from "react";
import axios from "axios";

const TokenHome = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: false,
        },
      })
      .then((response) => {
        const shuffledCoins = response.data.sort(() => 0.5 - Math.random()).slice(0, 4);
        setCoins(shuffledCoins);
      })
      .catch((error) => {
        console.error("Error fetching coin data:", error);
      });
  }, []);

  return (
    <>
      <div className="mt-10">
        <div className="card w-full md:w-96 shadow-2xl mx-auto">
          <h1 className="text-center pt-10 font-extrabold text-xl">Your coin</h1>
          <div className="p-4 md:p-10">
            <button className="btn btn-outline w-full md:w-72">Bitcoin</button>
          </div>
          <div className="p-4 md:p-10">
            <button className="btn btn-outline w-full md:w-72">Litecoin</button>
          </div>
          <div className="p-4 md:p-10">
            <button className="btn btn-outline w-full md:w-72">DogCoin</button>
          </div>
          <div className="p-4 md:p-10">
            <button className="btn btn-outline w-full md:w-72">Tether</button>
          </div>

          <div className="mt-10">
            <h2 className="text-center font-bold text-lg">Your suggestion</h2>
            {coins.map((coin) => (
              <div key={coin.id} className="p-4 flex justify-between items-center">
                <span className="font-semibold">{coin.name}</span>
                <span className="text-sm text-gray-600">${coin.current_price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenHome;