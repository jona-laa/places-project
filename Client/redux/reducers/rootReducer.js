import { combineReducers } from 'redux';
import { placeReducer } from './places';

// Root reducer - COMBINE REDUCERS
export const rootReducer = combineReducers({
    places: placeReducer
})



