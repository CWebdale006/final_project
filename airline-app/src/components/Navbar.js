import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <>
      <div className="container" id="one">
        <div id="logo">
            <a href="http://localhost:3000/"><h2>EZAirplanes</h2></a>
        </div>
        <div id="nav1">
          <a href="http://localhost:3000/">link 1</a>
        </div>
        <div id="nav2">
          <a href="http://localhost:3000/">link 2</a>
        </div>
        <div id="nav3">
          <a href="http://localhost:3000/">link 3</a>
        </div>
      </div>
      <style>{`

      `}</style>
      </>
    )
  }
}
