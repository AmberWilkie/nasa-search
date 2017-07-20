import React, { Component } from 'react';
import { Input, Button } from 'reactstrap';
import { connect } from 'react-redux'

import ResultsList from '../components/ResultsList';
import QueryBox from '../components/QueryBox';

class NasaQuery extends Component {
  constructor(props) {
    super(props);
  };
  
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

  componentDidMount() {
    console.log(this.props.saved);
    if (localStorage.getItem('results')){
      this.props.setSavedFromStorage(JSON.parse(localStorage.getItem('results')));
    }
  }

  render() {
    const {
      saved,
      results,
      noResults
    } = this.props; 

    return (
      <div>
        <QueryBox handleChange={this.handleChange} handleSubmit={this.handleSubmit} query={this.state.query}/>

        {saved && <div>{saved.length} items saved</div>}

        <ResultsList results={results} noResults={noResults} saved={saved} handleSave={this.handleSave} />
      </div>
    );
  }
}

export default NasaQuery;

