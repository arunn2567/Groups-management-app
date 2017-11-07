import React from 'react';
import axios from 'axios';
import fetchJsonp from 'fetch-jsonp';
import $ from 'jquery';

export const FETCH_GROUPS = 'fetch_groups';
export const FETCH_GROUP = 'fetch_group';
export const CREATE_GROUP = 'create_group';
export const DELETE_GROUP = 'delete_group';

export function fetchGroups(){
const request = axios({
  url:'https://cors-anywhere.herokuapp.com/middleware.vt.edu/interview/groups',
  method:'get',
 headers: {'X-Requested-With': 'XMLHttpRequest'}
}
);
return {
    type: FETCH_GROUPS,
    payload: request
}
}

export function fetchGroup(id){
  const request = axios({
    url:'https://cors-anywhere.herokuapp.com/middleware.vt.edu/interview/groups',
    method:'get',
   headers: {'X-Requested-With': 'XMLHttpRequest'}
  }
  );
  return {
    type: FETCH_GROUP,
    payload:request
  }
}
export function deleteGroup(id){
  return{
    type:DELETE_GROUP,
    payload:id
  }
}
export function createGroup(values){
  return {
    type: CREATE_GROUP,
    payload:values
  }
}
