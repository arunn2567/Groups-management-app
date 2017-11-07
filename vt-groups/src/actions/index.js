import React from 'react';
import axios from 'axios';

export const FETCH_GROUPS = 'fetch_groups';
export const FETCH_GROUP = 'fetch_group';
export const CREATE_GROUP = 'create_group';
export const DELETE_GROUP = 'delete_group';
//action creator to fetch the data of the groups using axios-get
export function fetchGroups() {
  const request = axios({
    url: 'https://cors-anywhere.herokuapp.com/middleware.vt.edu/interview/groups',
    method: 'get',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
  );
  return {
    type: FETCH_GROUPS,
    payload: request
  }
}
//action creator to fetch a single group incase the group is not present in the state of the redux or incase we not using localStorage of the browser
export function fetchGroup(id) {
  const request = axios({
    url: 'https://cors-anywhere.herokuapp.com/middleware.vt.edu/interview/groups',
    method: 'get',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
  );
  return {
    type: FETCH_GROUP,
    payload: request
  }
}
//action creator to delete a single group from the state of the application
export function deleteGroup(id) {
  return {
    type: DELETE_GROUP,
    payload: id
  }
}
//action creator to create a group in the state of the application
export function createGroup(values) {
  return {
    type: CREATE_GROUP,
    payload: values
  }
}
