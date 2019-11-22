import { combineReducers } from 'redux';
import { placeReducer } from './places';
import { locationReducer } from './location';
import { checkingInReducer } from './checkingIn';

// Root reducer - COMBINE REDUCERS
export const rootReducer = combineReducers({
    places: placeReducer,
    location: locationReducer,
    checkingIn: checkingInReducer
})



