import api from '../api';
import * as types from './mutation-types';

export const requestItems = ({ commit, dispatch }) => {
  dispatch('getUrl');
  commit(types.PRE_HTTP_REQUEST);
};

export const getUrl = ({ commit, dispatch }) => {
  api.getUrl().then((data) => {
    commit(types.SET_URL, data);
    dispatch('fetchItems');
  });
};

export const fetchItems = ({ dispatch, state }) => {
  api.fetchItems(state.apiEntryPoint).then((data) => {
    dispatch('receiveItems', data);
  }).catch((err) => {
    throw new Error(err);
  });
};

export const vote = ({ commit }, data) => {
  commit(types.PRE_VOTE);
  api.vote(data.choice).then((response) => {
    commit(types.VOTE, { response, data });
  }).catch((err) => {
    throw new Error(err);
  });
};

export const receiveItems = ({ commit }, data) => {
  commit(types.FETCHED_ADS_SUCCESS, data);
};

export const increasePage = ({ commit }, data) => {
  commit(types.INCREASE_PAGE, data);
};
