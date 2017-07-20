const initialState = {
  saved: [],
  results: [],
  noResults: '',
  page: 'home'
}

export const requestFromNASA = (query) => {
  return function (dispatch) {
    fetch(`https://images-api.nasa.gov/search?q=${query}`)
      .then( resp => resp.json())
      .then ( resp => {
        if (resp.collection.items.length > 0) {
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
      localStorage.setItem('results', JSON.stringify(action.payload));
      return {
        ...state,
        results: action.payload
      }
    case 'NO_RESULTS':
      return {
        ...state,
        results: [],
        noResults: `Your search for ${action.payload} returned no results`
      }
    case 'SET_FROM_STORAGE':
      console.log('setting from storage');      
      return {
        ...state,
        results: JSON.parse(localStorage.getItem('results'))
      }
    case 'CHANGE_PAGE':
      return {
        ...state,
        page: action.payload
      }
    default:
      console.log('running default NasaItems case');
  }
}

export default nasaActions;
