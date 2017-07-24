import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux'

import './App.css';
import './index.css';

import NasaQuery from './containers/NasaQuery';

import ResultsList from './components/ResultsList';

import { requestFromNASA } from './reducers/nasaItemManagement';

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

const mapStateToProps = (state = {saved: [], page: 'home'}, props) => {
  return {
    results: state.results.returnedResults,
    saved: state.saved,
    noResults: state.results.noResults,
    page: state.page,
    isFetching: state.isFetching,
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
    deleteItem: (item) => {
      dispatch({
        type: 'DELETE_ITEM',
        payload: item
      })
    },
    searchNasa: (query) => {
      dispatch(requestFromNASA(query))
    },
    setSavedFromStorage: (results) => {
      dispatch({
        type: 'SET_FROM_STORAGE'
      })
    },
    changePage: (page) => {
      dispatch({
        type: 'CHANGE_PAGE',
        payload: page
      })
    }
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(NasaApp)

export default App;
