import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditDestination extends Component {
  constructor(props) {
    super(props);
  
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeDepartDate = this.onChangeDepartDate.bind(this);
    this.onChangeReturnDate = this.onChangeReturnDate.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      passwords: [],
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

      axios.get('http://localhost:5000/users/')
        .then(response => {
          this.setState({
            users: response.data.map(user => user.username),
            passwords: response.data.map(user => user.password),
          });
        })
        .catch((error) => {
          console.log(error);
        })
  }

  
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
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

    const user = {
      username: this.state.username,
      password: this.state.password,
      tickets: [this.state.from, this.state.to, this.state.departDate, this.state.returnDate, this.state.price]
    };

    console.log(user);

    axios.post('http://localhost:5000/users/update/'+this.props.match.params.id, user)
      .then(res => console.log(res.data));

    // window.location = '/create';
  }

  render() {
    let price = "9.00";
    return (
      <>
        <div>
        <h3>Edit Flight</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
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
              <p id="ticketPrice">${price}</p>
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
            <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
      </>
    )
  }
}
