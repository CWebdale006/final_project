import React, { Component } from 'react'
import "../css/destinations-list.css"

export default class DestinationsList extends Component {
  render() {
    return (
      <>
        <div>
            <div className="container">
              <div className="row">
                <div className="col">
                  <h1 className="display-4">Book your flight</h1>
                </div>
              </div>
              <div className="row">
                <div className="col">
                      <div className="list-group">
                        <a href="/create" className="list-group-item list-group-item-action" id="bruh">Buffalo, New York</a>
                        <a href="/create" className="list-group-item list-group-item-action" id="bruh">Los Angeles, California</a>
                        <a href="/create" className="list-group-item list-group-item-action" id="bruh">Morbi leo risus</a>
                        <a href="/create" className="list-group-item list-group-item-action" id="bruh">Porta ac consectetur ac</a>
                        <a href="/create" className="list-group-item list-group-item-action" id="bruh">Vestibulum at eros</a>
                      </div>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col">
                      <h4>Forecast for </h4>
                      <div id="weatherApi">
                        
                      </div>
                    </div>
                  </div>
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
      </>
    )
  }
}
