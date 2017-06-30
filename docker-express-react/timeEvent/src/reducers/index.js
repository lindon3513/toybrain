import { combineReducers } from 'redux';
import { reducer as reduxFormReducer  } from 'redux-form';

import todo from './todo';
import cart from './cart';
import { timeEvents, timeEventLoadingStatus, timeEventLoadingResult } from './timeEvent';

const rootReducer = combineReducers({
    cart,
    todo,
    timeEvents,
    timeEventLoadingStatus,
    timeEventLoadingResult,
    form: reduxFormReducer
});
export default rootReducer;
