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

        // getting the token for the auth0 api
        const GetToken = () => {
            const { getTokenSilently } = useAuth0();
            const CallApi = async() => {
                try {
                    const token = await getTokenSilently();
                    return token;
                } catch (error) {
                    console.error(error);
                }
            }
            CallApi();
        }

        // const token = GetToken();
        let token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJUTkVNRGd3TWpReU9VVkNPRGN4UVRSRlEwWXhSa1U1UVRJd01UTkZRams1TWpneFJUazBNUSJ9.eyJpc3MiOiJodHRwczovL2Rldi0wYW5qajJlci5hdXRoMC5jb20vIiwic3ViIjoiTnllMUlqbzBJQThmQVE0U1hJTmFvcTJvd2RZM2g1dTJAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTBhbmpqMmVyLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTg0MzEyMjE1LCJleHAiOjE1ODQzOTg2MTUsImF6cCI6Ik55ZTFJam8wSUE4ZkFRNFNYSU5hb3Eyb3dkWTNoNXUyIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.GtLUUp9mwsbT1GYuK9fe5tHdtSLF4DhajwvpmyXU7OSeSmeoEzBwHXLfHJk1UyqNQqy39202XBy7cxbsBHGvGA8Bi_mlVDn0ROcXezwyjEse1Heo4qKLjiQBAe-hWYNi2Ia4LDyilQXEZoSMK3-2XvtEu_GfzLicqcNJn15NOOC56Hj694031e2ueKDCxjOSEoFs9bgop5n_kQG7HRjNy22k6X4aNJS-C5u98q-akSnYGmDMXIvmd9rtVY3xnZEP2jNWt7SCzfIDhZ-eIi8sdEl7h3wN_LHn3P5P8no9oxLfS56JUu5aVXbRjUkxEglqZ3oadfmG2UXy4gNx87lU6A";

        console.log(token);

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