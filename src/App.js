import React from 'react';

import Header from './components/header/index.jsx';
import Converter from './components/converter/index.jsx';

export default function App() {
  return (
    <div className="app">
      <Header />
      <Converter />
    </div>
  );
}
