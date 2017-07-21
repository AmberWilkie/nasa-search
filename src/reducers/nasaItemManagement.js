const savedReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_ITEM':
      return state.concat(action.payload)
    case 'DELETE_ITEM':
      const index = state.indexOf(action.payload);
      return [
          ...state.slice(0, index),
          ...state.slice(index+1)
        ]
    default: 
      return state
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
      localStorage.setItem('results', JSON.stringify(action.payload));
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
