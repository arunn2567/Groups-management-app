import { combineReducers } from 'redux';
import GroupsReducer from './reducer-groups';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({

  groups: GroupsReducer,
  form: formReducer
});

export default rootReducer;
