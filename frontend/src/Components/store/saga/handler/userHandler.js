import { call, put } from "redux-saga/effects";
import { userActions } from "../../userSlice";
import {
  requestGetUser,
  requestLoggedUser,
  requestLogout,
  requestLogin,
} from "../request/userRequest";
import { select } from "redux-saga/effects";
import { allPostRequest } from "../request/postRequest";
import { setAllPosts } from "../../postSlice";
const dataone = (state) => state.user;

export function* handleGetUser(action) {
  try {
    yield put(userActions.setLoading(true));
    let username = yield select(dataone);
    const response = yield call(requestGetUser, username);
    const data = yield response.json();
    yield put(userActions.setLoggedUser(data));
    yield put(userActions.setIsAuthenticated(true));
    yield put(userActions.setNotification("Registration Successful"));
    yield put(userActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(userActions.setError(true));
    yield put(userActions.setLoading(false));
  }
}

export function* handleLoggedUser() {
  try {
    yield put(userActions.setAppLoading(true));
    const response = yield call(requestLoggedUser);
    const { data } = yield call(allPostRequest);
    yield put(setAllPosts(data));
    if (!response) {
      return;
    }
    const datatwo = yield response.json();
    yield put(userActions.setIsAuthenticated(true));
    yield put(userActions.setLoggedUser(datatwo));
    yield put(userActions.setAppLoading(false));
  } catch (error) {
    yield put(userActions.setAppLoading(false));
  }
}

export function* handleLogout() {
  try {
    yield call(requestLogout);
    yield put(userActions.setLoggedUser(null));
    yield put(userActions.setIsAuthenticated(false));
  } catch (error) {}
}

export function* handleLogin() {
  try {
    yield put(userActions.setLoading(true));
    let username = yield select(dataone);
    const response = yield call(requestLogin, username);
    const data = yield response.json();
    yield put(userActions.setIsAuthenticated(true));
    yield put(userActions.setLoggedUser(data));
    yield put(userActions.setNotification("Logged In Successfully"));
    yield put(userActions.setLoading(false));
  } catch (error) {
    console.log(error);
    yield put(userActions.setError(true));
    yield put(userActions.setLoading(false));
  }
}
