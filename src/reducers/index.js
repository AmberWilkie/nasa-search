import { combineReducers } from 'redux'

import { 
  savedReducer, 
  resultsReducer, 
  noResultsReducer,
  requestFromNASA, 
  navigationReducer,

} from './nasaItemManagement';

const nasaActions = combineReducers({
  results: resultsReducer,
  page: navigationReducer,
  saved: savedReducer,
  noResults: noResultsReducer,
})

export { nasaActions };

