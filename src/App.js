import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Input, Button } from 'reactstrap';
import { connect } from 'react-redux'

import './App.css';
import './index.css';

import NasaQuery from './containers/NasaQuery';
import { requestFromNASA } from './reducers';

const NasaApp = (props) => {
  const {
    addNasaItem,
    searchNasa,
    results,
    noResults,
    saved,
  } = props;
  console.log(props);

  return (
    <div className="App">
      <NasaQuery 
        addNasaItem={addNasaItem} 
        searchNasa={searchNasa}
        results={results}
        noResults={noResults}
        saved={saved}/>
    </div>
  );
}

const mapStateToProps = (state = {saved: []}, props) => {
  console.log(props);
  return {
    results: state.results,
    saved: state.saved,
    noResults: state.noResults
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    addNasaItem: (item) => {
      dispatch({
        type: 'ADD_ITEM',
        payload: item
      })
    },
    searchNasa: (query) => {
      dispatch(requestFromNASA(query))
    }
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(NasaApp)

export default App;
