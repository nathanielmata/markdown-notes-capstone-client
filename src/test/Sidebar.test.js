import React from 'react';
import Sidebar from '../components/Sidebar';
import ReactDOM from 'react-dom';

it('renders Sidebar component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sidebar />, div);
    ReactDOM.unmountComponentAtNode(div);
  });