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
        ]
      try {
        localStorage.setItem('saved', JSON.stringify(newState));
      } catch (err) { console.log(err) }
      return newState;  
    default:
      try {
        return JSON.parse(localStorage.getItem('saved'));
      }
      catch (err) {
        console.log('something wrong with localstorage: ', err);
        return state;
      }
  }
}

// this doesn't belong here.
const requestFromNASA = (query) => {
  return function (dispatch) {
    fetch(`https://images-api.nasa.gov/search?q=${query}`)
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
}

const resultsReducer = (state = [], action) => {
  switch(action.type) {
    case 'SEARCH_NASA':
      requestFromNASA(action.payload)()
      break;
    case 'SAVE_SEARCH_RESULTS':
      return [...action.payload]
    default:
      return state
  }
}

const noResultsReducer = (state = '', action) => {
  switch(action.type) {
    case 'NO_RESULTS':
      return `Your search for ${action.payload} returned no results`
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

export { savedReducer, resultsReducer, noResultsReducer, requestFromNASA, navigationReducer };
