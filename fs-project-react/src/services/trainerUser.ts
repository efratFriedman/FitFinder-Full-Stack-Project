import axios from "axios";
import { TrainerUser } from "../models/TrainerUser";
import { logInDetails } from "../models/logInDetails";

interface TrainerUserResponse {
    trainerUser: TrainerUser;
    status: number;
}

axios.defaults.baseURL = `http://localhost:8080/api/`;

const axiosInstance = axios.create({
    withCredentials: true,
  });

export const getAllTrainers=async():Promise<TrainerUser[]>=>{
    try{
        const trainers=await axiosInstance.get(`trainerUser/getTrainerUsers`);
        return trainers.data;
    }
    catch(error){
        throw error;
    }
};


export const trainerUserLogin = async (trainerUser:logInDetails): Promise<TrainerUserResponse> => {
    try {
        const response = await axiosInstance.post(`trainerUser/trainerUserLogin`, trainerUser,{
            validateStatus: (status) => {
                return status < 500;
            },
        });
        return {trainerUser:response.data,status:response.status}; 
    } catch (error) {
        throw error;
    }
};

export const trainerUserSignUp=async(trainerUser:TrainerUser):Promise<TrainerUserResponse>=>{
    try {
        const response = await axiosInstance.post(`trainerUser/trainerUserSignUp`, trainerUser,{
            validateStatus: (status) => {
                return status < 500;
            },
        });
        return {trainerUser:response.data,status:response.status}; 
    } catch (error) {
       throw error;
    }
}

export const updateTrainerUser = async (trainerUserId: number, updatedTrainerUser: TrainerUser): Promise<TrainerUserResponse> => {
    try {
        const response = await axiosInstance.put(`trainerUser/updateTrainerUser/${trainerUserId}`, updatedTrainerUser);
        return {trainerUser:response.data,status:response.status};
    } catch (error) {
        throw error;
    }
}


export const uploadTrainer = async (trainer: TrainerUser, file: File): Promise<TrainerUser> => {
    try {
        const formData = new FormData();
        formData.append('trainer', JSON.stringify(trainer));
        formData.append('image', file);
        const response = await axiosInstance.post(`trainerUser/uploadTrainer`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

        return response.data;
    }
    catch (err) {
        throw err
    }
}





