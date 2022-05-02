import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ConverterCurrencyPair() {
  const [amount, setAmount] = useState(null);
  const [inputName, setInputName] = useState('');
  const [from, setFromCurrency] = useState('');
  const [to, setToCurrency] = useState('');
  const [result, setResult] = useState(null);
  const [backendError, setBackendError] = useState(null);
  const [inputError, setInputError] = useState(null);

  function validateInput(input) {
    const reg = new RegExp(/^\d*(\.)?(\d{0,2})?$/);
    return reg.test(input);
  }

  function handleCurrencyInput(e) {
    setAmount(e.target.value);
    setInputName(e.target.name);
    if (!validateInput(e.target.value)) {
      setInputError('numbers only please');
    } else {
      setInputError(null);
    }
  }

  function handleFromCurrency(e) {
    setFromCurrency(e.target.value);
  }

  function handleToCurrency(e) {
    setToCurrency(e.target.value);
  }

  function handleRateRequest(amount = 0, from, to) {
    const url =
      inputName === 'left'
        ? `https://api.getgeoapi.com/v2/currency/convert?api_key=77eed905a93a78d05adb55ce7db36955d7be8453&from=${from}&to=${to}&amount=${amount}`
        : `https://api.getgeoapi.com/v2/currency/convert?api_key=77eed905a93a78d05adb55ce7db36955d7be8453&from=${to}&to=${from}&amount=${amount}`;
    axios
      .get(url)
      .then((res) => setResult(res.data.rates[Object.keys(res.data.rates)[0]].rate_for_amount))
      .catch((err) => setBackendError(err));
  }

  useEffect(() => {
    if (!inputError && amount && from && to) {
      handleRateRequest(amount, from, to);
    } else {
      setResult('');
    }
  }, [amount, from, to]);

  return (
    <>
      <div className="converter">
        <input
          className="amount-input"
          autocomplete="off"
          type="text"
          name="left"
          value={inputName === 'left' ? amount : result}
          onChange={handleCurrencyInput}
        />
        <select name="left" className="currency-select" id="left" onChange={handleFromCurrency}>
          <option selected value="" disabled>
            {' '}
            -- select currency --{' '}
          </option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
          <option value="RON">RON</option>
        </select>
        <select name="right" className="currency-select" id="right" onChange={handleToCurrency}>
          <option selected value="" disabled>
            {' '}
            -- select currency --{' '}
          </option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
          <option value="RON">RON</option>
        </select>
        <input
          className="amount-input"
          autocomplete="off"
          type="text"
          name="right"
          value={inputName === 'right' ? amount : result}
          onChange={handleCurrencyInput}
        ></input>
      </div>
      {inputError && <p className="error">{inputError}</p>}
      {backendError && <p className="error">{backendError}</p>}
    </>
  );
}
