import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Header() {
  const endpoints = [
    'https://api.getgeoapi.com/v2/currency/convert?api_key=77eed905a93a78d05adb55ce7db36955d7be8453&from=EUR&to=UAH&amount=1',
    'https://api.getgeoapi.com/v2/currency/convert?api_key=77eed905a93a78d05adb55ce7db36955d7be8453&from=USD&to=UAH&amount=1',
  ];

  const [currencyPairs, setCurrencyPairs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) =>
        res.map((item) => {
          const pair = {
            from: item.data.base_currency_code,
            to: Object.keys(item.data.rates)[0],
            rate: item.data.rates.UAH.rate,
          };
          return pair;
        })
      )
      .then((result) => setCurrencyPairs(result))
      .catch((err) => setError(err.response.data.error.message));
  }, []);

  return (
    <div className="header">
      <div className="logo">Currency Converter</div>
      <ul className="header-currencies">
        {currencyPairs.length > 0 &&
          currencyPairs.map((currencyPair) => {
            return (
              <li key={currencyPair.from}>
                1 {currencyPair.from} = {currencyPair.rate} {currencyPair.to}
              </li>
            );
          })}
      </ul>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
