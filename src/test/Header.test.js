import React from 'react';
import Header from '../components/Header';
import ReactDOM from 'react-dom';

it('renders Header component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
    ReactDOM.unmountComponentAtNode(div);
  });