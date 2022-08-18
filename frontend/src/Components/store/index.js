import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./saga/rootSaga";
import userReducer from "./userSlice";
import postReducer from "./postSlice";

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: { user: userReducer, post: postReducer },
  middleware,
});

sagaMiddleware.run(watcherSaga);

export default store;
