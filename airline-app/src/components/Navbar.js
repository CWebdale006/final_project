import React from 'react';
import Image from 'react-bootstrap/Image';
import Plane from '../airplane.jpeg';

export default class Navbar extends React.Component {
  render() {
    return (
      <>
      <div className="container" id="one">
        <div id="logo">
          {/* <a href="http://localhost:3000/">
            <Image src={Plane} />
          </a> */}
        </div>
        <div id='links'>
          {/* links */}
        </div>
      </div>
      <style>{`
      .container {
        display: grid;
      }
      
    
      `}</style>
      </>
    )
  }
}
