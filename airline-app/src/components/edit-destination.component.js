import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditDestination extends Component {
  constructor(props) {
    super(props);
  
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
    this.onChangeDepartDate = this.onChangeDepartDate.bind(this);
    this.onChangeReturnDate = this.onChangeReturnDate.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      from: '',
      to: '',
      departDate: new Date(),
      returnDate: new Date(),
      price: '',
      amount: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/destinations/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username, 
          from: response.data.from, 
          to: response.data.to, 
          departDate: new Date(response.data.departDate),
          returnDate: new Date(response.data.returnDate),
          price: response.data.price,
          amount: response.data.amount
        })
      })
      .catch(function (error) {
        console.log(error);
      })

      axios.get('http://localhost:5000/users/')
        .then(response => {
          this.setState({
            users: response.data.map(user => user.username)
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

  onChangeFrom(e) {
    this.setState({
      from: e.target.value
    });
  }

  onChangeTo(e) {
    this.setState({
      to: e.target.value
    });
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

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    })
  }

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const destination = {
      username: this.state.username,
      from: this.state.from, 
      to: this.state.to,
      departDate: this.state.departDate,
      returnDate: this.state.returnDate,
      price: this.state.price,
      amount: this.state.amount,
    };

    console.log(destination);

    axios.post('http://localhost:5000/destinations/update/'+this.props.match.params.id, destination)
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
            />
          </div>
          <div className="form-group"> 
            <label>To: </label>
              <input  type="text"
                required
                className="form-control"
                value={this.state.to}
                onChange={this.onChangeTo}
              />
          </div>
          <div className="form-group"> 
            <label>Depart date: </label>
            <div>
              <DatePicker 
                selected={this.state.date}
                onChange={this.onChangeDepartDate}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Return date: </label>
            <div>
              <DatePicker 
                selected={this.state.date}
                onChange={this.onChangeReturnDate}
              />
            </div>
          </div>
          <div className="form-group"> 
            <label>Price: </label>
              <p id="ticketPrice">${price}</p>
          </div>
          <div className="form-group"> 
            <label>Amount: </label>
            <input  type="text"
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
