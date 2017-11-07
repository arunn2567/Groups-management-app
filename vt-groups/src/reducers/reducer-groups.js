import { FETCH_GROUPS } from '../actions';
import _ from 'lodash';
import { CREATE_GROUP } from '../actions'
import { FETCH_GROUP, DELETE_GROUP } from '../actions'
import { loadState } from '../localStorage'

//reducer function to return the state based on the payload of the action.
export default function(state = {}, action) {
  // if the actiontype is fetchGroup then return whole state and required group with id as the payload
  switch (action.type) {
    case FETCH_GROUP:
      return {
        ...state,
        [action.payload.data.id]: action.payload.data
      };
    //if the action is fetchGroups, then return whole state with mapping of each group with key as id
    case FETCH_GROUPS:
      return _.mapKeys(action.payload.data, 'id');
    //if the action is deleteGroup, then omitting the current group from the state.
    case DELETE_GROUP:
      return _.omit(state, action.payload);
    //if the action is creategroup then adding the current payload to whole state.
    case CREATE_GROUP:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    // if nothing matches the action type then return the original state.
    default:
      return state;
  }
}
