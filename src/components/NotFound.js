import React from 'react';
import './NotFound.css';

const NotFound = () => (
  <div className="notfound__container">
    <h1>Page not found</h1>
    <div>
      <a className="notfound__homelink" href="/">return Home</a>
    </div>
  </div>
);

export default NotFound;