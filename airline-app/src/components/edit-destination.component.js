import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditDestination extends Component {
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

  render() {
    return (
      <>
        <p>Here is where we will edit destinations</p>
      </>
    )
  }
}
