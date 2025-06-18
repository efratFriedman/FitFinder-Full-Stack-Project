import { createAsyncThunk,createSlice, isRejected } from "@reduxjs/toolkit";
import { Workout } from "../../models/Workout";
import { getWorkouts,getCustomizedWorkouts,getWorkoutById,addWorkout,updateWorkout,deleteWorkout,uploadWorkoutWithImg} from "../../services/workout";
import { TraineeUser } from "../../models/TraineeUser";

const initialState={
    workouts:[] as Workout[],
    error:{},
    customizedWorkouts:[] as Workout[],
    selectedWorkout:{} as Workout,
    isCustomized:false,
    category:""
}

export const fetchWorkouts=createAsyncThunk(
    'workouts/fetchWorkouts',
    async()=>{
        
        const workouts=await getWorkouts();
        
        return workouts;
    }
);

export const fetchCustomizedWorkouts=createAsyncThunk(
    'workouts/fetchCustomizedWorkouts',
    async(traineeUser:TraineeUser)=>{
        const workouts=await getCustomizedWorkouts(traineeUser);
        return workouts;
    }
);

export const fetchWorkoutById=createAsyncThunk(
    'workouts/fetchWorkoutById',
    async(workoutId:number)=>{
        const workouts=await getWorkoutById(workoutId);
        return workouts;
    }
);

export const addNewWorkout=createAsyncThunk(
    'workouts/addNewWorkout',
    async(newWorkout:Workout)=>{
        const workout=await addWorkout(newWorkout);
        return workout;
    }

);

export const UpdateWorkout = createAsyncThunk(
    'workouts/UpdateWorkout',
    async ({ updatedWorkout, workoutId }: { updatedWorkout: Workout; workoutId: number }) => {
        const workout = await updateWorkout(workoutId, updatedWorkout);
        return workout;
    }
);

export const DeleteWorkout = createAsyncThunk(
    'workouts/DeleteWorkout',
    async (workoutId:number) => {
        const response = await deleteWorkout(workoutId);
        return response;
    }
);

//Upload training with image
export const upload = createAsyncThunk(
    'workouts/upload',
    async ({ newWorkout, file }: { newWorkout: Workout; file: File }) => {
        const workout = await uploadWorkoutWithImg(newWorkout, file);
        return workout;
    }
);

export const workoutSlice=createSlice({
    name:'workout',
    initialState,
    reducers:{
       setIsCustomized:(state,action)=>{
        state.isCustomized=action.payload;
       },
       setCategory:(state,action)=>{
        state.category=action.payload
       }
    },
    extraReducers:(builder)=>{
       builder.addCase(fetchWorkouts.fulfilled,(state,action)=>{
           state.workouts=action.payload;
       });
       builder.addCase(fetchCustomizedWorkouts.fulfilled,(state,action)=>{
        state.customizedWorkouts=action.payload;
       });
       builder.addCase(fetchWorkoutById.fulfilled,(state,action)=>{
        state.selectedWorkout=action.payload;
       });
       builder.addCase(addNewWorkout.fulfilled,(state,action)=>{
        state.workouts=[...state.workouts,action.payload]
       });
       builder.addCase(UpdateWorkout.fulfilled,(state,action)=>{
        state.workouts = state.workouts.map(workout =>
            workout.id === action.payload.id ? action.payload : workout
        );
       });
       builder.addCase(DeleteWorkout.fulfilled,(state,action )=>{
                state.workouts=state.workouts.filter((workout:Workout)=>workout.id!=action.payload.id)
       });
       builder.addCase(upload.fulfilled,(state,action)=>{
        state.workouts=[...state.workouts,action.payload]
       })
       
       builder.addMatcher(
        isRejected,
        (state, action) => {
          state.error = action.error;
        }
      );


    }
})


export const { setCategory,setIsCustomized } = workoutSlice.actions






