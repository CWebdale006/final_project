import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../css/destinations-list.css";
import { round } from 'mathjs';
import PrivateRoute from "./PrivateRoute";

// auth0
import { useAuth0 } from "../react-auth0-spa";
import EditDestination from './edit-destination.component';

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>
  }
}

let topText = "Book your flight";

const Destination = props => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <tr id={props.destination.to}>
      <td>{props.destination.from}</td>
      <td>{props.destination.to}</td>
      <td>{props.destination.departDate.substring(0,10)}</td>
      <td>{props.destination.returnDate.substring(0,10)}</td>
      <td>{props.destination.price}</td>
      <td>
        {/*first link goes to the edit route, second calls the delete method */}
        {/* <Link to={"/edit/"+props.destination._id}>edit</Link> | <a href="#" onClick={() => { props.deleteDestination(props.destination._id) }}>delete</a> */}
        {/* <Link to={'/edit/'+props.destination._id}>Purchase</Link> */}
        <div>
          {!isAuthenticated && (
            <button type="button" class="btn btn-primary" onClick={() => loginWithRedirect({})}>Purchase</button>
          )}

          {isAuthenticated && (
            <span>
              <button type="button" class="btn btn-primary"><Link id="link" to={'/edit/'+props.destination._id}>Purchase</Link></button>
            </span>
          )}
        </div>
      </td>
    </tr>
  )
}

// getting the weather 
function Weather(to) {
  function getWeather(city) {
      // http://api.openweathermap.org/data/2.5/weather?q=peoria,us&APPID=4cf9476bc10145918605334adf1a590a
      fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',us&APPID=4cf9476bc10145918605334adf1a590a')
        .then(res => res.json())
        .then(
          data => {
              function toF(K) {
                  // converts Kelvin to Fahrenheit and rounds to 2 decimal places
                  return round(((K - 273.15) * 9/5 + 32), 2);
              }

              // adding the city name to the h4
              const cityDiv = document.getElementById("city");
              const cityData = city
              cityDiv.innerHTML = "Weather: " + cityData[0].toUpperCase() + cityData.slice(1);

              // adding the temperature in Fahrenheit
              const temp = document.getElementById("temp");
              const tempDataK = data.main.temp;
              temp.innerHTML = "Temperature: " + toF(tempDataK) + "&degF";

              // adding the "feels like" temperature in Fahrenheit
              const feelsLike = document.getElementById("feelsLike");
              const feelsLikeDataK = data.main.feels_like;
              feelsLike.innerHTML = "Feels like: " + toF(feelsLikeDataK) + "&degF";

              // adding the high in Fahrenheit
              const high = document.getElementById("high");
              const highData = data.main.temp_max;
              high.innerHTML = "High: " + toF(highData) + "&degF";

              // adding the low in Fahrenheit
              const low = document.getElementById("low");
              const lowData = data.main.temp_min;
              low.innerHTML = "Low: " + toF(lowData) + "&degF";

              // adding the humidity 
              const humidity = document.getElementById("humidity");
              const humidityData = data.main.humidity;
              humidity.innerHTML = "Humidity: " + humidityData + "%";
            }
        )
  };

  getWeather(to.to);

  return (
     <>
      <h4 id="city">Weather: </h4>
      <div className="container">
          <div className="col">
              <div className="row" id="temp">Hover over a ticket to see weather information</div>
              <div className="row" id="feelsLike"></div>
              <div className="row" id="high"></div>
              <div className="row" id="low"></div>
              <div className="row" id="humidity"></div>
          </div>
      </div>
     </>
  )
}

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

  render() {
    const HeaderText = () => {
      const { loading, user } = useAuth0();

      if (loading || !user) {
        return <div>Book a flight</div>;
      }

      return (
        <Fragment>
          Welcome, {user.given_name}!
        </Fragment>
      )
    }
    return(
      <>
        <div>
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 className="display-4">
                  <HeaderText />
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <div>
                      <table className="table">
                        <thead className="thead-light">
                          <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Depart Date</th>
                            <th>Return Date</th>
                            <th>Price</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          { this.destinationList() }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <div id="weatherApi">
                          <Weather to="sacramento" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card" id="hehe">
                  <div className="card-body">
                    {/* filler */}
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h4>Google Maps somehow?</h4>
                        <div id="mapsApi">

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  // each destination is output with the Destination component 
  destinationList() {
    return this.state.destinations.map(currentdestination => {
      return <Destination destination={currentdestination} deleteDestination={this.deleteDestination} key={currentdestination._id} />;
    })
  }
}
