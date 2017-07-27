import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Input, Button } from 'reactstrap';
import './App.css';

import ResultsList from './components/ResultsList';
import NasaQuery from './components/NasaQuery';

class App extends Component {
  state = {
    query: '',
    results: [],
    noResults: '',
    saved: [],
    page: 'home'
  }

  render() {
    const handleChange = e => {
      e.preventDefault();
      this.setState({
        query: e.target.value
      })
    }

    const handleSubmit = e => {
      e.preventDefault();
      requestFromNASA();
    }

    const requestFromNASA = () => {
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

    const handleSave = (item) => {
      this.setState( state => {
        return {
          saved: state.saved.concat(item)
        }
      })
    }

    const toggleSavedView = (e) => {
      e.preventDefault();
      if (this.state.page === 'home') {
        this.setState({
          page: 'saved'
        })
      } else {
        this.setState({
          page: 'home'
        })
      }
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Nasa Search</h2>
            { this.state.page === 'home' && 
              <a href='/saved' className='orange-link' 
                onClick={toggleSavedView}>View Saved</a> }
            { this.state.page === 'saved' && 
                <a href='/home' className='orange-link' 
                onClick={toggleSavedView}>Home</a> }
        </div>
        
        {this.state.page === 'home' &&
          <div>
            <NasaQuery query={this.state.query}
              handleSubmit={handleSubmit}
              handleChange={handleChange}/>
        
            <ResultsList saved={this.state.saved}
              results={this.state.results}
              handleSave={handleSave} />
          </div>}

        {this.state.page === 'saved' &&
          <div>        
            <ResultsList saved={this.state.saved}
              results={this.state.saved}
              handleSave={handleSave} />
          </div>}


        {this.state.noResults && <div>{this.state.noResults}</div>}
      </div>
    );
  }
}

export default App;
