import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../slice/userSlice";
import podcastReducer from "../slice/podcastSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        podcasts: podcastReducer
    },
})