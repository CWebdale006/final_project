import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import DestinationsList from "./components/destinations-list.component";
import EditDestination from "./components/edit-destination.component";
import CreateDestination from "./components/create-destination.component";
import CreateUser from "./components/create-user.component";
import SearchDestination from "./components/search-destination.component";
import Footer from "./components/footer.component";

function App() {
  return (
    <>
    <section>
      <Router>
        <div className='container'>
          <Navbar />
          {/* <br /> */}
          {/* path sets the url path, and the component is the code that is loaded when the user goes to that path */}
          <Route path="/" exact component={DestinationsList} />
          <Route path="/edit/:id" component={EditDestination} />
          <Route path="/create" component={CreateDestination} />
          <Route path="/user" component={CreateUser} />
        </div>
      </Router>
    </section>
    <section>
      {/*this'll be fun to fix  */}
      <SearchDestination />
    </section>
    <section>
      <Footer />
    </section>
    </>
  );
}

export default App;
