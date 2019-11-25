import { combineReducers } from 'redux';
import { placeReducer } from './places';
import { locationReducer } from './location';
import { checkingInReducer } from './checkingIn';
import { tokenReducer } from './token';

// Root reducer - COMBINE REDUCERS
export const rootReducer = combineReducers({
    places: placeReducer,
    location: locationReducer,
    checkingIn: checkingInReducer,
    expoPushToken: tokenReducer 
})



