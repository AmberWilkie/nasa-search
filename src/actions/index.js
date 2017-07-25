const searchNASA = query => dispatch => {
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

const addNasaItem = item => dispatch => {
  dispatch({
    type: 'ADD_ITEM',
    payload: item
  })
}

const deleteItem = item => dispatch => {
  dispatch({
    type: 'DELETE_ITEM',
    payload: item
  })
}

const setSavedFromStorage = results => dispatch => {
  dispatch({
    type: 'SET_FROM_STORAGE'
  })
}

const changePage = page => dispatch => {
  dispatch({
    type: 'CHANGE_PAGE',
    payload: page
  })
}

export { addNasaItem, deleteItem, searchNASA, setSavedFromStorage, changePage };

