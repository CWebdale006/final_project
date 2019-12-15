import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../css/destinations-list.css"

const Destination = props => (
  <tr>
    <td>{props.destination.username}</td>
    <td>{props.destination.from}</td>
    <td>{props.destination.to}</td>
    <td>{props.destination.departDate.substring(0,10)}</td>
    <td>{props.destination.returnDate.substring(0,10)}</td>
    <td>{props.destination.price}</td>
    <td>{props.destination.amount}</td>
    <td>
      {/*first link goes to the edit route, second calls the delete method */}
      <Link to={"/edit/"+props.destination._id}>edit</Link> | <a href="#" onClick={() => { props.deleteDestination(props.destination._id) }}>delete</a>
    </td>
  </tr>
)

export default class DestinationsList extends Component {
  constructor(props) {
    super(props);

    this.deleteDestination = this.deleteDestination.bind(this);

    this.state = {destinations: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/destinations/')
      .then(response => {
        this.setState({ destinations: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteDestination(id) {
    axios.delete('http://localhost:5000/destinations/'+id)
      .then(res => console.log(res.data));

    this.setState({
      // filtering out the exercise that was deleted 
      destinations: this.state.destinations.filter(el => el._id !==id)
    })
  }

  // render() {
  //   return (
  //     <>
  //       <div>
  //           <div className="container">
  //             <div className="row">
  //               <div className="col">
  //                 <h1 className="display-4">Book your flight</h1>
  //               </div>
  //             </div>
  //             <div className="row">
  //               <div className="col">
  //                     <div className="list-group">
  //                       <a href="/create" className="list-group-item list-group-item-action" id="bruh">Buffalo, New York</a>
  //                       <a href="/create" className="list-group-item list-group-item-action" id="bruh">Los Angeles, California</a>
  //                       <a href="/create" className="list-group-item list-group-item-action" id="bruh">Morbi leo risus</a>
  //                       <a href="/create" className="list-group-item list-group-item-action" id="bruh">Porta ac consectetur ac</a>
  //                       <a href="/create" className="list-group-item list-group-item-action" id="bruh">Vestibulum at eros</a>
  //                     </div>
  //               </div>
  //               <div className="col">
  //                 <div className="row">
  //                   <div className="col">
  //                     <h4>Forecast for </h4>
  //                     <div id="weatherApi">
                        
  //                     </div>
  //                   </div>
  //                 </div>
  //                 <div className="row">
  //                   <div className="col">
  //                     <h4>Google Maps somehow?</h4>
  //                     <div id="mapsApi">

  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //       </div>
  //     </>
  //   )
  // }
  render() {
    return(
      <div>
        <h3>Destinations List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>From</th>
              <th>To</th>
              <th>Depart Date</th>
              <th>Return Date</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.destinationList() }
          </tbody>
        </table>
      </div>
    )
  }

  // each destination is output with the Destination component 
  destinationList() {
    return this.state.destinations.map(currentdestination => {
      return <Destination destination={currentdestination} deleteDestination={this.deleteDestination} key={currentdestination._id} />;
    })
  }
}
