import { combineReducers } from 'redux';
import { placeReducer } from './places';
import { locationReducer } from './location';
import { checkedInReducer } from './checkedIn';

// Root reducer - COMBINE REDUCERS
export const rootReducer = combineReducers({
    places: placeReducer,
    location: locationReducer,
    checkedIn: checkedInReducer
})



