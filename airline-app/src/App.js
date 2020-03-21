import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";
import { Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import DestinationsList from "./components/destinations-list.component";
import EditDestination from "./components/edit-destination.component";
import CreateDestination from "./components/create-destination.component";
import CreateUser from "./components/create-user.component";
import SearchDestination from "./components/search-destination.component";
import Footer from "./components/footer.component";
import NewEditDestination from "./components/edit-destination-function.component";

// auth0
import { useAuth0 } from "./react-auth0-spa";
    // profile 
    import { Switch } from "react-router-dom";
    import Profile from "./components/Profile.component";
    import history from "./utils/history";
    import PrivateRoute from "./components/PrivateRoute";
    import ExternalApi from "./components/ExternalApi";

function App() {
  return (
    <>
    <section>
      <Router history={history}>
        <div className='container'>
          <Navbar />
          {/* <br /> */}
          {/* path sets the url path, and the component is the code that is loaded when the user goes to that path */}
          <Switch>
            <Route path="/" exact component={DestinationsList} />
            <Route path="/edit/:id" component={EditDestination} />
            <Route path="/create" component={CreateDestination} />
            <Route path="/user" component={CreateUser} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/edit" component={EditDestination} />
            <PrivateRoute path="/external-api" component={ExternalApi} />
          </Switch>
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
