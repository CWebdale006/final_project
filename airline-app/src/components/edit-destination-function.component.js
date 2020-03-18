import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

// auth0
import { useAuth0 } from "../react-auth0-spa";

const NewEditDestination = () => {
    const [ from, setFrom ] = useState();
    const [ to, setTo ] = useState();
    const [ departDate, setDepartDate ] = useState(new Date());
    const [ returnDate, setReturnDate ] = useState(new Date());
    const [ price, setPrice ] = useState();
    const [ users, setUsers ] = useState([]);
    const [ amount, setAmount ] = useState();
    
    // const { match: { params } } = this.props;
    // axios.get(`http://localhost:5000/destinations/${params._id}`)

    useEffect(() => {
        // let id = this.props.match.params.id
        const id = "5df68a0d0ad5634c1498c793";
        axios.get('http://localhost:5000/destinations/'+id)
            .then(response => {
                setFrom(response.data.from);
                setTo(response.data.to);
                setDepartDate(new Date(response.data.departDate));
                setReturnDate(new Date(response.data.returnDate));
                setPrice(response.data.price);
            })
            .catch(function (error) {
                console.log(error);
            })
    });

    // kinda different, if bugs out i'd look here first 
    const OnChangeDepartDate = date => {
        setDepartDate(date);
    };

    const OnChangeReturnDate = date => {
        setReturnDate(date);
    };

    const OnChangeAmount = e => {
        setAmount(e.target.value);
    };

    const OnChangeFrom = () => {
        console.log("the onChangeFrom function was called");
    };
    const OnChangeTo = () => {
        console.log("the onChangeTo function was called");
    };

    let token;

    function getToken() {
        var request = require("request");

        var options = { method: 'POST',
        url: 'https://dev-0anjj2er.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: '{"client_id":"TGdihficM3i5pLvcQG5VTgWL0Uy5YDoE","client_secret":"","audience":"https://dev-0anjj2er.auth0.com/api/v2/","grant_type":"client_credentials"}' };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            token = body;
            console.log(body);
        });
    }

    function OnSubmitFunction(e) {
        // stops the page from refreshing (i think)
        e.preventDefault();

        // creating the object to be sent 
        const BookedTickets = {
            from: from, 
            to: to, 
            departDate: departDate,
            returnDate: returnDate, 
            price: price, 
            amount: amount
        };

        getToken();

        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }

        const body = {
            // "user_metadata" : { "tickets": {BookedTickets} }
            "user_metadata" : { "message": "this is from the function component!!!" }
        }

        axios.patch('https://dev-0anjj2er.auth0.com/api/v2/users/google-oauth2%7C116658177472204313093', body, config)
            .then(response=>{
                console.log(response.status);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    return ( 
        <>
            <div>
                <h3>Edit Flight</h3>
                <h6>*function component*</h6>
                <form onSubmit={OnSubmitFunction}>
                    <div className="form-group"> 
                        <label>Booking for: </label>
                        {/** <UserName /> */}
                    </div>
                    <div className="form-group">
                        <label>From: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={from}
                            onChange={OnChangeFrom} // this is pointless i think
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>To: </label>
                        <input type="text" 
                            required
                            className="form-control"
                            value={to}
                            onChange={OnChangeTo} // i think this is another pointless one 
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>Depart date: </label>
                        <div>
                            <DatePicker 
                                selected={departDate}
                                onChange={OnChangeDepartDate} 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Return date: </label>
                        <div>
                            <DatePicker 
                                selected={returnDate}
                                onChange={OnChangeReturnDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        {/* <p id="ticketPrice">${price}</p> */}
                    </div>
                    <div className="form-group" id="amountInput">
                        <label>Amount: </label>
                        <input type="number" 
                            min="1"
                            max="20"
                            required
                            className="form-control"
                            value={amount}
                            onChange={OnChangeAmount}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Book Tickets" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewEditDestination;