const savedReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_ITEM':
      let newState = state.concat(action.payload);
      try {
        localStorage.setItem('saved', JSON.stringify(newState)); }
      catch (err) { console.log(err) }
      return newState;
    case 'DELETE_ITEM':
      const index = state.indexOf(action.payload);
      newState = [
          ...state.slice(0, index),
          ...state.slice(index+1)
        ];
      try {
        localStorage.setItem('saved', JSON.stringify(newState));
      } catch (err) { console.log(err) }
      return newState;  
    default:
      try {
        const results = JSON.parse(localStorage.getItem('saved'));
        if (results) { return results }
        return state;
      }
      catch (err) {
        console.log('something wrong with localstorage: ', err);
        return state;
      }
  }
}

const requestFromNASA = query => dispatch => {
  dispatch({
    type: 'SEARCH_NASA'
  })
  return fetch(`https://images-api.nasa.gov/search?q=${query}`)
    .then( resp => resp.json())
    .then ( resp => {
      if (resp.collection.items.length > 0) {
        dispatch({
          type: 'SAVE_SEARCH_RESULTS',
          payload: resp.collection.items.slice(0, 10)
        })
      } else {
        dispatch({
          type: 'NO_RESULTS',
          payload: query
        })
      }
    })
}

const resultsReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SEARCH_NASA':
      return [];
    case 'SAVE_SEARCH_RESULTS':
      return {
        returnedResults: [...action.payload],
        noResults: false
      }
    case 'NO_RESULTS':
      return {
        ...state,
        noResults: `Your search for ${action.payload} returned no results`
      }
    default:
      return state
  }
}

const navigationReducer = (state = 'home', action) => {
  switch(action.type) {
    case 'CHANGE_PAGE':
      return action.payload
    default:
      return state
  }
}

const isFetchingReducer = (state = false, action) => {
  switch(action.type) {
    case 'SEARCH_NASA':
      return true;
    case 'SAVE_SEARCH_RESULTS':
      return false;
    default:
      return false;
  }
}

export { savedReducer, resultsReducer, requestFromNASA, navigationReducer, isFetchingReducer };
