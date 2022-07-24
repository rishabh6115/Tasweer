import { takeLatest } from "redux-saga/effects";
import { userActions } from "../userSlice";
import {
  handleGetUser,
  handleLoggedUser,
  handleLogout,
  handleLogin,
} from "./handler/userHandler";

export function* watcherSaga() {
  yield takeLatest(userActions.getLoggedUser, handleGetUser);
  yield takeLatest(userActions.getLoggedData, handleLoggedUser);
  yield takeLatest(userActions.logout, handleLogout);
  yield takeLatest(userActions.login, handleLogin);
}
