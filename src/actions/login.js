import { push } from 'react-router-redux'

import { auth0Lock, authLocalStore } from 'src/auth';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const requestLogin = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (profile, token) => ({
  type: LOGIN_SUCCESS,
  profile,
  token,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  errorMessage: error,
});

function getProfile(dispatch, token) {
  auth0Lock.getProfile(token, (error, profile) => {
    if (error) {
      return dispatch(loginFailure(error));
    }
    authLocalStore.setStoredAuthData(profile, token);
    return dispatch(loginSuccess(profile, token));
  });
}

export const checkLogin = (dispatch) => {
  auth0Lock.on('authenticated', (authResult) => {
    getProfile(dispatch, authResult.idToken);
  });
};

export const login = () => (dispatch) => {
  if (authLocalStore.isAuthenticated()) {
    const authData = authLocalStore.getStoredAuthData();
    getProfile(dispatch, authData.token);
  } else {
    dispatch(requestLogin());
  }
};

export const redirectToHome = () => (dispatch) => {
  dispatch(push('/'));
};
