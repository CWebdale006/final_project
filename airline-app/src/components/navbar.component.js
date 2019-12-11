import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';

export default class Mynav extends Component {

  render() {
    return (
      // <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      //   <Link to="/" className="navbar-brand">EZAirplanes</Link>
      //   <div className="collpase navbar-collapse">
      //   <ul className="navbar-nav mr-auto">
      //     <li className="navbar-item">
      //     <Link to="/" className="nav-link">Destinations</Link>
      //     </li>
      //     <li className="navbar-item">
      //     <Link to="/create" className="nav-link">Book a flight</Link>
      //     </li>
      //     <li className="navbar-item">
      //     <Link to="/user" className="nav-link">Login</Link>
      //     </li>
      //   </ul>
      //   </div>
      // </nav>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">EZAirlines</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link to="/" className="nav-link">Destinations</Link>
        <Link to="/create" className="nav-link">Book a flight</Link>
        <Link to="/user" className="nav-link">Login</Link>
      </Nav>
       <Form inline>
          <Link to="/user" className="nav-link">
            <Button varient="primary"> Sign in</Button>
          </Link>
       </Form>
      </Navbar.Collapse>
      </Navbar>
      );
  }
}