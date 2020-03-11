import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const NewEditDestination = () => {
    // getting id of the ticket
    // axios.get('http://localhost:5000/destinations/')
    //     .then(response=> {
    //         let id = response.data[0]._id;
    //         console.log(id);
    //     })
    function getId() {
        return axios.get('http://localhost:5000/destinations/');
    }

    let id = getId().then(function (response) {
        let id = response.data[0]._id;
        return id
    })

    let id2 = useState(id);
    console.log(id2)

    // let id;
    let from, to;

    axios.get('http://localhost:5000/destinations/'+id)
        .then(response=> {
            from = response.data.from;
            to = response.data.to;
        })
    return (
        <>
            <h1>Hello there</h1>
        </>
    );
}

export default NewEditDestination