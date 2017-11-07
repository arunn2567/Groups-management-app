import {FETCH_GROUPS} from '../actions';
import _ from 'lodash';
import {CREATE_GROUP} from '../actions'
import {FETCH_GROUP, DELETE_GROUP} from '../actions'
import {loadState} from '../localStorage'




export default function(state={}, action){
  switch(action.type){
    case FETCH_GROUP:
    return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_GROUPS:
    console.log(action.payload.data)
    return _.mapKeys(action.payload.data, 'id');
    case DELETE_GROUP:
    return _.omit(state, action.payload);
    case CREATE_GROUP:
  //  const arr = _.mapKeys([action.payload], 'id');
  // const arr2 = arr[action.payload.id]
   return {...state , [action.payload.id]:action.payload};
    default: return state;
  }
}
