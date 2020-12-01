import React from 'react';
import Dashboard from '../components/Dashboard';
import ReactDOM from 'react-dom';

it('renders Dashboard component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Dashboard />, div);
    ReactDOM.unmountComponentAtNode(div);
  });