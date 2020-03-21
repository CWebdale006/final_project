import React, { Component, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

// auth0
import { useAuth0 } from "../react-auth0-spa";
// import value of the token
// import token from "./GetToken";
import createAuth0Client from '@auth0/auth0-spa-js';


// const auth0 = await createAuth0CLient({
//   domain: 'dev-0anjj234.auth0.com',
//   client_id: 'ZR4PTrsgBY4zf2k24dZSq41MaGDLWgc'
// });

// function helpMe() {
  // const { getTokenSilently } = useAuth0();

  // const callApi = async () => {
  //   try {
  //     const token = await getTokenSilently();
  //     return token
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // callApi()
// }


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

    createAuth0Client({
      domain: 'dev-0anjj2er.auth0.com',
      client_id: 'ZR4PTrsgBY4zf2k24dZSq41MaGDLWgcz'
    }).then(auth0 => {
      auth0
        .getTokenSilently()
        .then(accessToken => 
          // fetch('https://dev-0anjj2er.auth0.com/api/v2/', {
          //   method: 'GET',
          //   headers: {
          //     Authorization: 'Bearer ' + accessToken
          //   }
          // })
          axios.patch('https://dev-0anjj2er.auth0.com/api/v2/users/google-oauth2%7C116658177472204313093', {
            headers: {
              Authorization: 'Bearer ' + accessToken
            }, 
            body: {
              "user_metadata": { "welp": "sent with promises and access tokens"}
            }
          })
            .then(response=> {
              console.log(response.status)
            })
            .catch(function(error) {
              console.log("hey monkey, the error is: "+error);
            })
        )
        .then(result => result.json())
        .then(data => {
          console.log(data);
        });
    })

    // const GetToken = () => {
    //   var request = require("request");

    //   var options = {
    //     method: 'POST',
    //     url: 'https://dev-0anjj2er.auth0.com/oauth/token',
    //     headers: {'content-type': 'application/x-www-form-urlencoded'},
    //     form: {
    //       grant_type: 'client_credentials',
    //       client_id: 'ZR4PTrsgBY4zf2k24dZSq41MaGDLWgcz',
    //       client_secret: '',
    //       audience: 'https://dev-0anjj2er.auth0.com/api/v2/'
    //     }
    //   };

    //   request(options, function (error, response, body) {
    //     if (error) throw new Error(error);

    //     console.log(body);
    //   });
    // }
      
    //   axios({
    //     method: 'post',
    //     url: 'https://dev-0anjj2er.auth0.com/oauth/token',
    //     headers: {
    //       'content-type': 'application/x-www-form-urlencoded'
    //     },
    //     body: '{"client_id":"ZR4PTrsgBY4zf2k24dZSq41MaGDLWgcz","client_secret":"","audience":"https://dev-0anjj2er.auth0.com/api/v2/","grant_type":"client_credentials"}' 
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    // }

    // const token = GetToken();

    // console.log(token);

    // const config = {
    //   headers: { Authorization: `Bearer ${token}`}
    // }

    // const body = {
    //   // "user_metadata" : { "tickets": {bookedTickets} }
    //   "user_metadata" : { "tickets": "bruh" }
    // }

    // axios.patch('https://dev-0anjj2er.auth0.com/api/v2/users/google-oauth2%7C116658177472204313093', body, config)
    //   .then(response=>{
    //     console.log(response.status)
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });

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
          <h6>*class component*</h6>
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
