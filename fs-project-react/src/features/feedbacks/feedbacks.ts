import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import { Feedback } from "../../models/Feedback";
import { addFeedback, deleteFeedback, getFeedbacks, updateFeedback } from "../../services/feedback";


const initialState={
    feedbacks: [] as Feedback[],
    error: {},
    selectedFeedback: {} as Feedback
} 

export const fetchFeedbacks = createAsyncThunk(
    'feedbacks/fetchFeedbacks',
    async () => {
        const feedbacks = await getFeedbacks();
        return feedbacks;
    }
);

export const addNewFeedback = createAsyncThunk(
    'feedbacks/addNewFeedback',
    async (newFeedback: Feedback) => {
        const feedback = await addFeedback(newFeedback);
        return feedback;
    });

export const UpdateFeedback = createAsyncThunk(
    'feedbacks/UpdateFeedback',
    async ({ updatedFeedback, feedbackId }: { updatedFeedback: Feedback; feedbackId: number }) => {
        const workout = await updateFeedback(feedbackId, updatedFeedback);
        return workout;
    }
);
export const DeleteFeedback = createAsyncThunk(
    'feedbacks/DeleteFeedback',
    async (feedbackId: number) => {
        const response = await deleteFeedback(feedbackId);
        return response;
    }
);


export const feedbackSlice=createSlice({
    name:'feedback',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
       builder.addCase(fetchFeedbacks.fulfilled,(state,action)=>{
           state.feedbacks=action.payload;
       });
       builder.addCase(addNewFeedback.fulfilled,(state,action)=>{
        state.feedbacks=[...state.feedbacks,action.payload]
       });
       builder.addCase(UpdateFeedback.fulfilled,(state,action)=>{
        state.feedbacks = state.feedbacks.map(feedback =>
            feedback.id === (action.payload.feedback as Feedback).id ? action.payload.feedback : feedback
        );
       });
       builder.addCase(DeleteFeedback.fulfilled,(state,action )=>{
                state.feedbacks=state.feedbacks.filter((feedback:Feedback)=>feedback.id!=action.payload.feedback.id)
       });
       builder.addMatcher(
        isRejected,
        (state, action) => {
          state.error = action.error;
        }
      );


    }
})








