import React, { Component, Fragment, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

// auth0
import { useAuth0 } from "../react-auth0-spa";
// import value of the token

export default class EditDestination extends Component {
  constructor(props) {
    super(props);
  
    this.onChangeDepartDate = this.onChangeDepartDate.bind(this);
    this.onChangeReturnDate = this.onChangeReturnDate.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      departDate: new Date(),
      returnDate: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/destinations/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          from: response.data.from, 
          to: response.data.to, 
          departDate: new Date(response.data.departDate),
          returnDate: new Date(response.data.returnDate),
          price: response.data.price
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  
  onChangeDepartDate(date) {
    this.setState({
      departDate: date
    });
  }
  
  onChangeReturnDate(date) {
    this.setState({
      returnDate: date
    });
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const bookedTickets = {
      from: this.state.from,
      to: this.state.to,
      departDate: this.state.departDate,
      returnDate: this.state.returnDate,
      price: this.state.price,
      amount: this.state.amount
    };

    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJUTkVNRGd3TWpReU9VVkNPRGN4UVRSRlEwWXhSa1U1UVRJd01UTkZRams1TWpneFJUazBNUSJ9.eyJpc3MiOiJodHRwczovL2Rldi0wYW5qajJlci5hdXRoMC5jb20vIiwic3ViIjoiTnllMUlqbzBJQThmQVE0U1hJTmFvcTJvd2RZM2g1dTJAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTBhbmpqMmVyLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTgzODc2MjE5LCJleHAiOjE1ODM5NjI2MTksImF6cCI6Ik55ZTFJam8wSUE4ZkFRNFNYSU5hb3Eyb3dkWTNoNXUyIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.Z_15G4geQed5x7AeWQQGeSZWcmmdCMI_0IQzjYbgtQV3NlwKvxSxGHgBQTYxY1LmICCOrfddXNnn9rv5inOV-MfCLtHbOTTLVrMV1nOdU49ds8XCeVR2HxC2zZuOo33SE0catP2m8f_HGrVg4mubJWiZnPSWuJ7cdjYnwDenY18sK28DR9EX-gQ73HSQKi9tIvrc2bbNM80IPO1PR1M0HBBJKirDk864yKlwjeehB5n4k56A4SwXBSMGfhspnrPbYPfB69PUCi5UKtBJzYJWEjSv0XfB6OC5wy1S5x9RSK4S6_9LGBTlc-Xc5wwYd3XnOeSRqLFeYMALVNVLU-3-EQ";

    const config = {
      headers: { Authorization: `Bearer ${token}`}
    }

    const body = {
      // "user_metadata" : { "tickets": {bookedTickets} }
      "user_metadata" : { "tickets": "bruh" }
    }

    axios.patch('https://dev-0anjj2er.auth0.com/api/v2/users/google-oauth2%7C116658177472204313093', body, config)
      .then(
        console.log('tickets have been booked!')
    );

    /** 
     * { "user_metadata" : { "tickets": {bookedTickets} }}
     */

    /** use the auth0 API */
    // const user = {
    //   username: this.state.username,
    //   password: this.state.passwords,
    //   id: this.state.ids,
    //   tickets: [this.state.from, this.state.to, this.state.departDate, this.state.returnDate, this.state.price, this.state.amount]
    // };

    // console.log(user);

    // 
    // axios.post('http://localhost:5000/users/update/'+this.props.match.params.id, user)
    //   .then(res => console.log(res.data));

    // window.location = '/create';
  }


  render() {
      return (
        <>
          <div>
          <h3>Edit Flight</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>Booking for:  </label>
              {/* <UserName /> */}
            </div>
            <div className="form-group"> 
              <label>From: </label>
              <input  type="text"
                required
                className="form-control"
                value={this.state.from}
                onChange={this.onChangeFrom}
                readOnly
              />
            </div>
            <div className="form-group"> 
              <label>To: </label>
                <input  type="text"
                  required
                  className="form-control"
                  value={this.state.to}
                  onChange={this.onChangeTo}
                  readOnly
                />
            </div>
            <div className="form-group"> 
              <label>Depart date: </label>
              <div>
                <DatePicker 
                  selected={this.state.departDate}
                  onChange={this.onChangeDepartDate}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Return date: </label>
              <div>
                <DatePicker 
                  selected={this.state.returnDate}
                  onChange={this.onChangeReturnDate}
                />
              </div>
            </div>
            <div className="form-group"> 
              <label>Price: </label>
                {/* <p id="ticketPrice">${price}</p> */}
            </div>
            <div className="form-group" id="amountInput"> 
              <label>Amount: </label>
              <input  type="number"
                  min="0"
                  max="20"
                  required
                  className="form-control"
                  value={this.state.amount}
                  onChange={this.onChangeAmount}
                  />
            </div>

            <div className="form-group">
              <input type="submit" value="Book tickets" className="btn btn-primary" />
            </div>
          </form>
        </div>
        </>
      )
    }
  }

    // return (
      
    // )
