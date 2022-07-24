import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./saga/rootSaga";
import userReducer from "./userSlice";

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: { user: userReducer },
  middleware,
});

sagaMiddleware.run(watcherSaga);

export default store;
