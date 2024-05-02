import { configureStore } from "@reduxjs/toolkit";

import gptReducers from "./Slice/appSlice";

const store = configureStore(
    {
        reducer :
        {
            centerStore : gptReducers
        }
    }
)

export default store;