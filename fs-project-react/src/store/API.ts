import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { workoutSlice } from "../features/workouts/workouts";
import { categorySlice } from "../features/categories/categories";
import { feedbackSlice } from "../features/feedbacks/feedbacks";
import { traineeUserSlice } from "../features/users/traineeUsers/traineeUsers";
import { userSchedulesSlice } from "../features/userSchedules/userSchedules";
import { trainerUserSlice } from "../features/users/trainerUsers/trainerUsers";


const rootReducer=combineReducers({
  workout: workoutSlice.reducer,
  category: categorySlice.reducer,
  feedback: feedbackSlice.reducer,
  traineeUser:traineeUserSlice.reducer,
  trainerUser:trainerUserSlice.reducer,
  userSchedule:userSchedulesSlice.reducer
})

const persistConfig={
  key:'root',
  storage,
  whitelist:['traineeUser','trainerUser']
}

const persistedReducer=persistReducer(persistConfig,rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false},)
});

export const persistor=persistStore(store);


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch