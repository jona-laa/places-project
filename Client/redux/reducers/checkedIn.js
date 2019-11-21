// Initial state
const initState = false;
  
  
  export const checkedInReducer = (state = initState, action) => {
    switch (action.type) {
      case 'TOGGLE_CHECKED_IN':
        return !state
      default:
        return state;
    }
  }