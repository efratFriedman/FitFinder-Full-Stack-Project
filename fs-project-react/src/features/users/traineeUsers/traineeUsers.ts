import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import { TraineeUser } from "../../../models/TraineeUser";
import { traineeUserLogin, traineeUserSignUp, updateTraineeUser, updateTraineeUserWithImg, uploadImageTrainee } from "../../../services/traineeUser";
import { signOut } from "../../../services/user";



const initialState = {
    error: {},
    currentTraineeUser: {} as TraineeUser,
    isSignUp: false
}
export const UpdateTraineeUser = createAsyncThunk(
    'traineeUsers/UpdateTraineeUser',
    async ({ updatedTraineeUser, traineeUserId }: { updatedTraineeUser: TraineeUser; traineeUserId: number }) => {
        const response = await updateTraineeUser(traineeUserId, updatedTraineeUser);
        return response;
    }
);

export const UpdateTraineeUserWithImg = createAsyncThunk(
    'traineeUsers/UpdateTraineeUserWithImg',
    async ({ updatedTraineeUser, traineeUserId }: { updatedTraineeUser: TraineeUser; traineeUserId: number }) => {
        const response = await updateTraineeUserWithImg(traineeUserId, updatedTraineeUser);
        return response;
    }
);


export const LoginTraineeUser = createAsyncThunk(
    'traineeUsers/LoginTraineeUser',
    async (loginData: { userName: string; password: string }) => {
        const response = await traineeUserLogin(loginData);
        return response;
    }
);

export const SignUpTraineeUser = createAsyncThunk(
    'traineeUsers/SignUpTraineeUser',
    async (newTraineeUser: TraineeUser) => {
        const response = await traineeUserSignUp(newTraineeUser);
        return response;
    }
)

export const UploadTraineeImage = createAsyncThunk(
    'traineeUsers/UploadTraineeImage',
    async ({ trainee, file }: { trainee: TraineeUser; file: File }) => {
        const response = await uploadImageTrainee(trainee, file);
        return response;
    }
)

export const signOutTrainee = createAsyncThunk(
    'traineeUsers/signOutTrainee',
    async () => {
        const response = await signOut();
        return response;
    }
)


export const traineeUserSlice = createSlice({
    name: 'traineeUser',
    initialState,
    reducers: {
        setIsSignUp: (state, action) => {
            state.isSignUp = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(LoginTraineeUser.fulfilled, (state, action) => {
            state.currentTraineeUser = action.payload?.traineeUser;

        });
        builder.addCase(UpdateTraineeUser.fulfilled, (state, action) => {
            state.currentTraineeUser = action.payload.traineeUser;
        });
        builder.addCase(SignUpTraineeUser.fulfilled, (state, action) => {
            state.currentTraineeUser = action.payload.traineeUser;
        });
        builder.addCase(UploadTraineeImage.fulfilled, (state, action) => {
            state.currentTraineeUser = action.payload;
        });
        builder.addCase(UpdateTraineeUserWithImg.fulfilled, (state, action) => {
            state.currentTraineeUser = action.payload.traineeUser;
        });

        builder.addCase(signOutTrainee.fulfilled, (state, action) => {
            state.currentTraineeUser = { ...initialState.currentTraineeUser };
            state.error = '';
            localStorage.removeItem("root");
        });

        builder.addMatcher(
            isRejected,
            (state, action) => {
                state.error = action.error;
            }
        );


    }
})
export const { setIsSignUp } = traineeUserSlice.actions






