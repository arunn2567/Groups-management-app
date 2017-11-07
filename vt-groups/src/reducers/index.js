import { combineReducers } from 'redux';
import GroupsReducer from './reducer-groups';
import { reducer as formReducer } from 'redux-form';

// rootReducer which combines all the reducers in the application
const rootReducer = combineReducers({
  groups: GroupsReducer,
  form: formReducer
});

export default rootReducer;
