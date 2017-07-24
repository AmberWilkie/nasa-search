const savedReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_ITEM':
      let newState = state.concat(action.payload);
      saveInLocalStorage('saved', newState);
      return newState;
    case 'DELETE_ITEM':
      const index = state.indexOf(action.payload);
      newState = [
        ...state.slice(0, index),
        ...state.slice(index+1)
      ];
      saveInLocalStorage('saved', newState);
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

const saveInLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) { console.log(err) }
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

export { savedReducer, resultsReducer, navigationReducer, isFetchingReducer };
