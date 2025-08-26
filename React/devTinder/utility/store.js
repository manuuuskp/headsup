import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./reducer/UserSlice";
import feedReducer from "./reducer/FeedSlice";
import requestReducer from "./reducer/RequestsSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        requests: requestReducer
    }
})

export default store;