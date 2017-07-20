const initialState = {
  saved: [],
  results: [],
  noResults: ''
}

export const requestFromNASA = (query) => {
  return function (dispatch) {
    fetch(`https://images-api.nasa.gov/search?q=${query}`)
      .then( resp => resp.json())
      .then ( resp => {
        if (resp.collection.items.length > 0) {
          console.log('obtained collection');
          // this.setState({
          // results: resp.collection.items.slice(0, 20),
          // noResults: ''
          // })
          dispatch({
            type: 'SAVE_SEARCH_RESULTS',
            payload: resp.collection.items
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

const nasaActions = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_ITEM':
      console.log(action.payload);
      return {
        ...state,
        saved: state.saved.concat(action.payload)
      }
      break;
    case 'REMOVE_ITEM':
      console.log('removing: ', action.payload);
      break;
    case 'SEARCH_NASA':
      let results = [];
      console.log('getting items');
      requestFromNASA(action.payload)()
      break;
    case 'SAVE_SEARCH_RESULTS':
      console.log('saving results');
      return {
        ...state,
        results: action.payload
      }
      break;
    case 'NO_RESULTS':
      return {
        ...state,
        results: [],
        noResults: `Your search for ${action.payload} returned no results`
      }
    default:
      console.log('running default NasaItems case');
  }
}

export default nasaActions;
