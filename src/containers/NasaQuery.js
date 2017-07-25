import React, { Component } from 'react';

import ResultsList from '../components/ResultsList';
import QueryBox from '../components/QueryBox';

class NasaQuery extends Component {  
  state = {
    query: '',
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      query: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      query: ''
    })
    this.props.searchNasa(this.state.query);
  }
  
  handleSave = (item) => {
    this.props.addNasaItem(item);
  }
  
  render() {
    const {
      handleDelete,
      saved,
      results,
      noResults,
      isFetching,
    } = this.props; 

    return (
      <div>
        <QueryBox handleChange={this.handleChange} handleSubmit={this.handleSubmit} query={this.state.query}/>

        {saved && <div>{saved.length} items saved</div>}

        <ResultsList results={results} noResults={noResults} saved={saved} handleDelete={handleDelete} handleSave={this.handleSave} isFetching={isFetching} />
      </div>
    );
  }
}

export default NasaQuery;

