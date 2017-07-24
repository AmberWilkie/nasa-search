import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux'

import './App.css';
import './index.css';

import NasaQuery from './containers/NasaQuery';

import ResultsList from './components/ResultsList';

import * as actions from './actions';

const NasaApp = (props) => {
  const {
    addNasaItem,
    searchNasa,
    setSavedFromStorage,
    changePage,
    deleteItem,
    results,
    noResults,
    saved,
    page,
    isFetching,
  } = props;

  const handleSavedLink = (e) => {
    e.preventDefault();
    changePage(e.target.href.replace('http://localhost:3000/', ''));
  }

  return (
    <div className="App">
      <div className="App-header">
        <h2>Nasa Search</h2>
        { page === 'home' && <a href='/saved' onClick={handleSavedLink}>View Saved</a> }
        { page === 'saved' && <a href='/home' onClick={handleSavedLink}>Home</a> }
      </div>
      {page === 'home' && <NasaQuery 
        addNasaItem={addNasaItem}
        handleDelete={deleteItem}
        searchNasa={searchNasa}
        results={results}
        noResults={noResults}
        isFetching={isFetching}
        setSavedFromStorage={setSavedFromStorage}
        saved={saved}/>
      }
      { page === 'saved' && 
          <div>
            <ResultsList
              results={saved} page={page} saved={saved} handleDelete={deleteItem} handleSave={() => {console.log('trying to save')}}
            />
          </div> }
    </div>
  );
}

const mapStateToProps = (state = {}, props) => {
  return {
    results: state.results.returnedResults,
    saved: state.saved,
    noResults: state.results.noResults,
    page: state.page,
    isFetching: state.isFetching,
  }
}
const mapDispatchToProps = dispatch => ({
  addNasaItem: item => dispatch(actions.addNasaItem(item)),
  deleteItem: item => dispatch(actions.deleteItem(item)),
  searchNasa: query => dispatch(actions.requestFromNASA(query)),
  setSavedFromStorage: () => dispatch(actions.setSavedFromStorage),
  changePage: page => dispatch(actions.changePage(page)),
})

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(NasaApp)

export default App;
