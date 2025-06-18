import axios from "axios";
import { Workout } from "../models/Workout";
import { TraineeUser } from "../models/TraineeUser";

axios.defaults.baseURL = `http://localhost:8080/api/`;

const axiosInstance = axios.create({
    withCredentials: true,
  });

export const getWorkouts = async (): Promise<Workout[]> => {
    console.log("קורסים כלליים ");
    
    try {
        const response = await axiosInstance.get(`workout/getWorkouts`);
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getWorkoutById = async (workoutId: number): Promise<Workout> => {
    try {
        const response = await axiosInstance.get(`workout/getWorkoutById/${workoutId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getCustomizedWorkouts = async (currentTrainee: TraineeUser): Promise<Workout[]> => {
    console.log("קורסים מותאמים אישית");
    
    try {
        const response = await axiosInstance.post(`workout/getCustomizedWorkouts`, currentTrainee);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addWorkout = async (newWorkout: Workout): Promise<Workout> => {
    try {
        const response = await axiosInstance.post(`workout/addWorkout`, newWorkout);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateWorkout = async (workoutId: number, updatedWorkout: Workout): Promise<Workout> => {
    try {
        const response = await axiosInstance.put(`workout/updateWorkout/${workoutId}`, updatedWorkout);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteWorkout = async (workoutId: number): Promise<Workout> => {
    try {
        const response = await axiosInstance.delete(`workout/deleteWorkout/${workoutId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const uploadWorkoutWithImg = async (workout: Workout, file: File): Promise<Workout> => {
    try {
        const formData = new FormData();
        formData.append("workout", new Blob([JSON.stringify(workout)], { type: "application/json" }));
        formData.append("image", file);

        const response = await axiosInstance.post(`workout/uploadWorkout`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};
