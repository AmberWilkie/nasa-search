import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import { connect } from 'react-redux'

import ResultsList from '../components/ResultsList';
import QueryBox from '../components/QueryBox';

class NasaQuery extends Component {
  state = {
    query: '',
    results: [],
    noResults: '',
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      query: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.searchNasa(this.state.query);
  }
  
  handleSave = (item) => {
    this.props.addNasaItem(item);
  }
  
  render() {
      const {
    saved
  } = this.props; 

    return (
      <div>
        <div className="App-header">
          <h2>Nasa Search</h2>
        </div>

        <QueryBox handleChange={this.handleChange} handleSubmit={this.handleSubmit} query={this.state.query}/>

        {saved && <div>{saved.length} items saved</div>}

        <ResultsList results={this.props.results} noResults={this.props.noResults} saved={saved} handleSave={this.handleSave} />
      </div>
    );
  }
}

export default NasaQuery;

