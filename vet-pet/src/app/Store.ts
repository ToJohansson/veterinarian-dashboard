import { configureStore }  from "@reduxjs/toolkit";
import UserReducer from "./features/UserSlice";

export default configureStore({
    reducer: {
        user: UserReducer,
    },
});