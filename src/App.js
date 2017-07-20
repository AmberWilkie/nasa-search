import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import './App.css';

class App extends Component {
  state = {
    query: '',
    results: [],
    noResults: ''
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      query: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.query);
    this.requestFromNASA();
  }
  
  requestFromNASA = () => {
    fetch(`https://images-api.nasa.gov/search?q=${this.state.query}`)
    .then( resp => resp.json())
    .then ( resp => {
      console.log(typeof(resp.collection.items.slice(0, 20)));
      if (resp.collection.items.length > 0) {
        this.setState({
          results: resp.collection.items.slice(0, 20),
          noResults: ''
        })
      } else {
        this.setState({
          noResults: `Your search for ${this.state.query} returned no results`
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Nasa Search</h2>
        </div>
        <div className="App-intro">
          <form onSubmit={this.handleSubmit}>
          <Input value={this.state.query} placeholder='Search NASA' onChange={this.handleChange} />
          </form>
        </div>
        <div className="results">
          {this.state.results && this.state.results.map( result => (
            <div>
              <h3>{result.data[0].title}</h3>
              <p>{result.data[0].description}</p>
              <img src={result.links[0].href} width="300px"/>
              <hr />
            </div>
          ))}
          {this.state.noResults && <div>{this.state.noResults}</div>}
        </div>
      </div>
    );
  }
}

export default App;
