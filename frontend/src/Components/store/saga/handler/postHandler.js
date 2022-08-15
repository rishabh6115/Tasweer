import { call, put } from "redux-saga/effects";
import { setAllPosts } from "../../postSlice";
import { allPostRequest } from "../request/postRequest";

export function* handleAllPost() {
  try {
    const { data } = yield call(allPostRequest);
    console.log(data);
    yield put(setAllPosts(data));
  } catch (error) {
    console.log(error);
  }
}
