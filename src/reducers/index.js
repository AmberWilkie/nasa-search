import { combineReducers } from 'redux'

import { 
  savedReducer, 
  resultsReducer, 
  navigationReducer,
  isFetchingReducer,
} from './nasaItemManagement';

const nasaActions = combineReducers({
  results: resultsReducer,
  page: navigationReducer,
  saved: savedReducer,
  isFetching: isFetchingReducer,
})

export { nasaActions };

