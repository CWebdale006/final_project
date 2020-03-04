// src/components/Profile.js

import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import "../css/profile.css";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <div class="container">
        <div class="row profile">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="profile-sidebar">
              <div class="profile-userpic d-flex justify-content-center">
                <img src={user.picture} class="img-responsive" alt="Profile" />
              </div>
              <div class="profile-usertitle">
                <div class="profile-usertitle-name">
                  {user.name}<br /><br />
                  Email: {user.email}<br /><br />
                  Tickets: 
                </div>
              </div>
            </div>
          </div>
        <div class="col-md-3"></div>
      </div>
      </div>

      <code>{JSON.stringify(user, null, 2)}</code>
    </Fragment>
  );
};

export default Profile;