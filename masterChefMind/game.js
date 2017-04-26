import React from 'react';
import ReactDOM from 'react-dom';
import Masterchefmind from './src/masterchefmind';

ReactDOM.render(
	React.createElement(Masterchefmind, {codeLength: 4, colors: new Map([[0, 'zero'], [1, 'one'], [2, 'two'], [3, 'three'], [4, 'four'], [5, 'five']])}),
	document.getElementById('masterchefmind')
)
