import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import { UserSchedule } from "../../models/UserSchedule";
import { addUserSchedule, getUserSchedulesByUserId } from "../../services/userSchedule";

const initialState = {
    userSchedules: [] as UserSchedule[],
    error: {}
}



export const fetchCurrentTraineeUserSchedules = createAsyncThunk(
    'userSchedules/fetchCurrentTraineeUserSchedules',
    async (id: number) => {
        const userSchedules = await getUserSchedulesByUserId(id);
        return userSchedules;
    }
);

export const addNewUserSchedule = createAsyncThunk(
    'userSchedules/addNewUserSchedule',
    async (newUserSchedule: UserSchedule) => {
        const userSchedule = await addUserSchedule(newUserSchedule);
        return userSchedule;
    }

);


export const userSchedulesSlice = createSlice({
    name: 'userSchedule',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(fetchCurrentTraineeUserSchedules.fulfilled, (state, action) => {
            state.userSchedules = action.payload;
        });
        builder.addCase(addNewUserSchedule.fulfilled, (state, action) => {
            state.userSchedules = [...state.userSchedules, action.payload];
        });
        builder.addMatcher(
            isRejected,
            (state, action) => {
                state.error = action.error;
            }
        );


    }
})

