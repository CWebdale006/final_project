import React, { Component } from 'react';
import "../css/search-navbar.css";

export default class SearchDestination extends Component {
  render() {
    return (
      <>
        <header className="masthead text-white text-center">
            <div className="overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-9 mx-auto">
                        <h1 className="mb-5 text-dark">Enter your destination</h1>
                    </div>
                    <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
                    <form>
                        <div className="form-row">
                        <section className="search-sec">
                            <div className="container">
                                <form action="#" method="post" noValidate="novalidate">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="row">
                                                <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                                    <input type="text" className="form-control search-slt" placeholder="Leaving from" />
                                                </div>
                                                <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                                    <input type="text" className="form-control search-slt" placeholder="Going to" />
                                                </div>
                                                <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                                    <select className="form-control search-slt" id="exampleFormControlSelect1">
                                                        <option>Select Flight</option>
                                                        <option>Example one</option>
                                                        <option>Example one</option>
                                                        <option>Example one</option>
                                                        <option>Example one</option>
                                                        <option>Example one</option>
                                                        <option>Example one</option>
                                                    </select>
                                                </div>
                                                <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                                    <button type="button" className="btn btn-danger wrn-btn">Get tickets</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
        </header>
      </>
    )
  }
}
