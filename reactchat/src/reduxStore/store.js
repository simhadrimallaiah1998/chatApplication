import thunkMiddleware from "redux-thunk";
import { legacy_createStore, applyMiddleware } from "redux";
import { reducer, reducerRegister } from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  login: reducer,
  register: reducerRegister,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedRegister = persistReducer(
  persistConfig,
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

export const store = legacy_createStore(persistedRegister);

export const persistedStore = persistStore(store);
