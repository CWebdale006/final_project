import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateDestination extends Component {
  constructor(props) {
    super(props);
  
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
    this.onChangeDepartDate = this.onChangeDepartDate.bind(this);
    this.onChangeReturnDate = this.onChangeReturnDate.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      to: '',
      departDate: new Date(),
      returnDate: new Date(),
      amount: '',
      users: []
    }
  }

  // single user, eventually replaced with data from database
  componentDidMount() {
    this.setState({
      users: ['test user'],
      username: 'test user'
    });
  }
  
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
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

  onChangeAmount(e) {
    this.setState({
      amount: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault(false);

    const exercise = {
      username: this.state.username,
      to: this.state.to,
      departDate: this.state.departDate,
      returnDate: this.state.returnDate,
      amount: this.state.amount,
    };

    console.log(exercise);

    // window.location = '/create';
  }

  render() {
    return (
      <>
        <div className="card" id="hehe">
          <div className="card-body">
            <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <div>
                    <h3>Book a flight</h3>
                    <form onSubmit={this.onSubmit}>
                      <div className="form-group"> 
                        <label>Username: </label>
                        <select ref="userInput"
                            required
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
                          <p id="ticketPrice">$0.00</p>
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
                        <input type="submit" value="Book Flight" className="btn btn-primary" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Card title</h3>
                  <p className="card-text">the google maps api goes here </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </>
    )
  }
}
