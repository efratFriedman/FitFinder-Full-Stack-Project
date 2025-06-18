import axios from "axios";
import { Feedback } from "../models/Feedback";

interface FeedbackResponse{
    feedback:Feedback;
    status:number
}

axios.defaults.baseURL = `http://localhost:8080/api/`;

const axiosInstance = axios.create({
    withCredentials: true,
  });

export const getFeedbacks=async():Promise<Feedback[]>=>{
    try {
        const feedbacks = await axiosInstance.get(`feedback/getFeedbacks`);
        return feedbacks.data;
    } catch (error) {
        throw error;
    }
}

export const addFeedback = async (newFeedback: Feedback): Promise<Feedback> => {
    try {
        const response = await axiosInstance.post(`feedback/addFeedback`, newFeedback);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateFeedback=async(feedbackId:number,updatedFeedback:Feedback):Promise<FeedbackResponse>=>{
    try {
        const response = await axiosInstance.put(`feedback/updateFeedback/${feedbackId}`, updatedFeedback);
        return {feedback:response.data,status:response.status};
    } catch (error) {
        throw error;
    }
}

export const deleteFeedback = async (feedbackId: number): Promise<FeedbackResponse> => {
    try {
        const response = await axiosInstance.delete(`feedback/deleteFeedback/${feedbackId}`);
        return {feedback:response.data,status:response.status};
    } catch (error) {
        throw error;
    }
}