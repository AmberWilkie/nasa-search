import { combineReducers } from 'redux'

import { 
  savedReducer, 
  resultsReducer, 
  noResultsReducer,
  navigationReducer,
} from './nasaItemManagement';

const nasaActions = combineReducers({
  results: resultsReducer,
  page: navigationReducer,
  saved: savedReducer,
  noResults: noResultsReducer,
})

export { nasaActions };

