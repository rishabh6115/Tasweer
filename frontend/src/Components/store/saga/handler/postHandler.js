import { call, put } from "redux-saga/effects";
import { setAllPosts, setPostRequestLoading } from "../../postSlice";
import { allPostRequest } from "../request/postRequest";

export function* handleAllPost() {
  try {
    yield put(setPostRequestLoading(true));
    const { data } = yield call(allPostRequest);
    console.log(data);
    yield put(setAllPosts(data));
    yield put(setPostRequestLoading(false));
  } catch (error) {
    yield put(setPostRequestLoading(false));
    console.log(error);
  }
}
