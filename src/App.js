import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Input, Button } from 'reactstrap';
import './index.css';
import './App.css';

class App extends Component {
  state = {
    query: '',
    results: [],
    noResults: '',
    saved: []
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      query: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.requestFromNASA();
  }
  
  requestFromNASA = () => {
    fetch(`https://images-api.nasa.gov/search?q=${this.state.query}`)
    .then( resp => resp.json())
    .then ( resp => {
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

  handleSave = (item) => {
    this.setState( state => {
      return {
        saved: state.saved.concat(item)
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Nasa Search</h2>
        </div>
        <div className="search-box">
          <form onSubmit={this.handleSubmit}>
          <Input value={this.state.query} placeholder='Search NASA' onChange={this.handleChange} />
          </form>
        </div>
        <div className="results">
          {this.state.saved && <div>{this.state.saved.length} items saved</div>}
          {this.state.results && this.state.results.map( result => (
            <div key={result.href}>
              <h3>{result.data[0].title}</h3>
              <p>{result.data[0].description}</p>
              <img src={result.links[0].href} className="nasaImage"/>
              <br />
              <Button color="success" onClick={() => this.handleSave(result)}>Save</Button>
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
