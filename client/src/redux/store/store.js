import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import userReducer from "../slices/userSlice";
import videoReducer from "../slices/videoSlice";
import commentsReducer from "../slices/commentSlice";

const rootReducer = combineReducers({
  user: userReducer,
  video: videoReducer,
  comments:commentsReducer
});
const persistConfig = {
  key: "root",
  whitelist: ["user","video","comments"],
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
