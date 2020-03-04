import React, { Component } from 'react';
import { useAuth0 } from "../react-auth0-spa";
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import '../css/navbar.css';

const Mynav = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    let addClass = (e) => {
      const link = e.target;
      console.log(link)
    }

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">EZAirplanes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" defaultActiveKey="/">
            <Nav.Item>
              <Link to="/" className="nav-link" id="navEffect" onClick={addClass}>Destinations</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/create" className="nav-link" id="navEffect" onClick={addClass}>Book a flight</Link>
            </Nav.Item>
          </Nav>
          <Form inline>
              <div>
                {!isAuthenticated && (
                  <button type="button" class="btn btn-primary" onClick={() => loginWithRedirect({})}>Log in</button>
                )}

                {isAuthenticated && (
                  <span>
                    <button type="button" class="btn btn-primary"><Link id="link" to="/profile">Profile</Link></button>
                  </span>
                )}

                {isAuthenticated && <button type="button" class="btn btn-primary" onClick={() => logout()}>Log out</button>}
              </div>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      );
}

export default Mynav;