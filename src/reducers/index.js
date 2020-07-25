/**
 * App Reducers
 */
import { combineReducers } from "redux";
import authUserReducer from "./AuthUserReducer";
//import settings from "./settings";
//import sidebarReducer from "./SidebarReducer";
//import apiKeysReducer from "./ApiKeysReducer";

const reducers = combineReducers({
    authUser: authUserReducer
  });

/*
const reducers = combineReducers({
  settings,
  sidebar: sidebarReducer,
  authUser: authUserReducer,
  apiKeys: apiKeysReducer
});
*/

export default reducers;
