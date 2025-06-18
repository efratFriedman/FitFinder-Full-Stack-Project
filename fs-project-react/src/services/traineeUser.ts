import axios from "axios";
import { TraineeUser } from "../models/TraineeUser";
import { logInDetails } from "../models/logInDetails";

interface TraineeUserResponse {
    traineeUser: TraineeUser;
    status: number;
}

axios.defaults.baseURL = `http://localhost:8080/api/`;

const axiosInstance = axios.create({
    withCredentials: true,
});

export const updateTraineeUser = async (traineeUserId: number, updatedTraineeUser: TraineeUser): Promise<TraineeUserResponse> => {
    try {
        const response = await axiosInstance.put(`traineeUser/updateTraineeUserDetails/${traineeUserId}`, updatedTraineeUser);

        return { traineeUser: response.data, status: response.status };
    } catch (error) {
        throw error;
    }
}


export const traineeUserLogin = async (traineeUser: logInDetails) => {
    try {
        const response = await axiosInstance.post(`traineeUser/traineeUserLogin`, traineeUser, {
            validateStatus: (status) => {
                return status < 500;
            },
        });
        return { traineeUser: response.data, status: response.status };
    } catch (error) {
        throw error;
    }
};

export const traineeUserSignUp = async (traineeUser: TraineeUser): Promise<TraineeUserResponse> => {
    try {
        const response = await axiosInstance.post('traineeUser/traineeUserSignUp', traineeUser, {
            validateStatus: (status) => {
                return status < 500;
            },
        });
        return { traineeUser: response.data, status: response.status };
    } catch (error) {
        throw error;
    }
}

export const uploadImageTrainee = async (trainee: TraineeUser, file: File): Promise<TraineeUser> => {
    try {
        const formData = new FormData();
        formData.append('trainee', JSON.stringify(trainee));
        formData.append('image', file);
        const response = await axiosInstance.post(`traineeUser/uploadTrainee`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

        return response.data;
    }
    catch (err) {
        throw err
    }
}

export const updateTraineeUserWithImg = async (traineeUserId: number, updatedTraineeUser: TraineeUser): Promise<TraineeUserResponse> => {
    try {
        const response = await axiosInstance.put(`traineeUser/updateTraineeUserDetailsWithImg/${traineeUserId}`, updatedTraineeUser);

        return { traineeUser: response.data, status: response.status };
    } catch (error) {
        throw error;
    }
}

