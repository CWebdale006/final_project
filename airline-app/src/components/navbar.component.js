import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import '../css/navbar.css'

export default class Mynav extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">EZAirplanes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" defaultActiveKey="/">
            <Nav.Item>
              <Link to="/" className="nav-link">Destinations</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/create" className="nav-link">Book a flight</Link>
            </Nav.Item>
          </Nav>
          <Form inline>
            <Link to="/user" className="nav-link">
              <Button variant="primary"> Sign up</Button>
            </Link>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      );
  }
}