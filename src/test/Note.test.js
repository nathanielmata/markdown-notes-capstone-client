import React from 'react';
import Note from '../components/Note';
import ReactDOM from 'react-dom';

it('renders Note component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Note />, div);
    ReactDOM.unmountComponentAtNode(div);
  });