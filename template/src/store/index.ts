import { createStore, applyMiddleware, combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ReduxThunk from "redux-thunk";

import { AppDispatch, RootState } from "../types";

import auth from "./reducers/auth";
import global from "./reducers/global";

const root = combineReducers({
  global,
  auth,
});

export const store = createStore(root, applyMiddleware(ReduxThunk));

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
