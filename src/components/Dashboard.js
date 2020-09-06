import React from 'react';

const Dashboard = (props) => (
  <div className="main__dashboard">
    <h1>Latest Notes</h1>
    <div className="main__dashboard--inner">
      {'123456'.split('').map((note, idx) => {
          return (
            <div 
              className="main__dashboard--latest"
              key={idx}>
                <a href="/">{note}</a>
            </div>
          )
        })
      }
    </div>
  </div>
);

export default Dashboard