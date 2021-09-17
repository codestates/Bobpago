import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  // whitelist
  // blacklist
};

const middleware = [logger, thunk];
const enhancedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  enhancedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
