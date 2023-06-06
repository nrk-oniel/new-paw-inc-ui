/* eslint-disable global-require */
import React from 'react';

import { styleHomeServices } from './styles';

function Service() {
  return (
    <div id="serviceContainer">
      <div style={styleHomeServices} />
      <div>
        <div className="text-center">
          <h1>Features & Services</h1>
        </div>
        <div id="advantage" className="text-center">
          <img className="my-5" src={require('./assets/advantages.png')} alt="Advantage" />
          <img src={require('./assets/book.png')} alt="Advantage" />
        </div>
      </div>
    </div>
  );
}

export default Service;
