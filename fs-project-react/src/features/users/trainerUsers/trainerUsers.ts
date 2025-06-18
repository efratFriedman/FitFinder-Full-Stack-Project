import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import { TrainerUser } from "../../../models/TrainerUser";
import { getAllTrainers, trainerUserLogin, trainerUserSignUp, updateTrainerUser, uploadTrainer } from "../../../services/trainerUser";
import { signOut } from "../../../services/user";


const initialState = {
    trainers: [] as TrainerUser[],
    error: {},
    selectedTrainer: {} as TrainerUser
}


export const fetchTrainers = createAsyncThunk(
    'trainerUsers/fetchTrainers',
    async () => {
        const trainers = await getAllTrainers();
        return trainers;
    }
);

export const logInTrainerUser = createAsyncThunk(
    'trainerUsers/logIn',
    async (loginData: { userName: string; password: string }) => {
        const response = await trainerUserLogin(loginData);
        return response;
    }
)

export const signUp = createAsyncThunk(
    'trainerUsers/signUp',
    async (trainerUser: TrainerUser) => {
        const response = await trainerUserSignUp(trainerUser);
        return response;
    }
)

export const UpdateTrainerUser = createAsyncThunk(
    'trainerUsers/UpdateTrainerUser',
    async ({ updatedTrainerUser, trainerUserId }: { updatedTrainerUser: TrainerUser; trainerUserId: number }) => {
        const response = await updateTrainerUser(trainerUserId, updatedTrainerUser);
        return response;
    }
)

export const UploadTrainer = createAsyncThunk(
    'trainerUsers/UploadTrainer',
    async ({ updatedTrainerUser, file }: { updatedTrainerUser: TrainerUser; file: File }) => {
        const response = await uploadTrainer(updatedTrainerUser, file);
        return response;
    }
)

export const signOutTrainer = createAsyncThunk(
    'traineeUsers/signOutTrainer',
    async () => {
        const response = await signOut();
        return response;
    }
)


export const trainerUserSlice = createSlice({
    name: 'trainerUser',
    initialState,
    reducers: {
      

    },
    extraReducers: (builder) => {
        builder.addCase(fetchTrainers.fulfilled, (state, action) => {
            state.trainers = action.payload;
        });
        builder.addCase(logInTrainerUser.fulfilled, (state, action) => {
            state.selectedTrainer = action.payload?.trainerUser;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            if (action.payload.trainerUser != null) {
                state.trainers = [...state.trainers, action.payload.trainerUser];
            }
        });
        builder.addCase(UpdateTrainerUser.fulfilled, (state, action) => {
            state.trainers = state.trainers.map(trainer =>
                trainer.id === action.payload.trainerUser.id ? action.payload.trainerUser : trainer
            );
            state.selectedTrainer = action.payload?.trainerUser;
        })
        builder.addCase(UploadTrainer.fulfilled, (state, action) => {
            state.trainers = state.trainers.map(trainer =>
                trainer.id === action.payload.id ? action.payload : trainer
            );
            state.selectedTrainer = action.payload;
        })

        builder.addCase(signOutTrainer.fulfilled, (state, action) => {
            state.selectedTrainer = { ...initialState.selectedTrainer };
            state.error = '';
            localStorage.removeItem("root");
        });

        builder.addMatcher(//?
            isRejected,
            (state, action) => {
                state.error = action.error;
            }
        );
    },
})



