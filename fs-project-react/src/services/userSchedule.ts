import axios from "axios";
import { UserSchedule } from "../models/UserSchedule";

axios.defaults.baseURL = `http://localhost:8080/api/`;

const axiosInstance = axios.create({
    withCredentials: true,
  });

export const getUserSchedules = async (): Promise<UserSchedule[]> => {
    try {
        const userSchedules = await axiosInstance.get(`userSchedule/getUserSchedules`);
        return userSchedules.data;
    } catch (error) {
        throw error;
    }
}


export const getUserSchedulesByUserId = async (id: number): Promise<UserSchedule[]> => {
    try {
        const userSchedules = await axiosInstance.get(`userSchedule/getUserScheduleByTraineeId/${id}`);
        return userSchedules.data;
    } catch (error) {
        throw error;
    }
}

export const addUserSchedule = async (newUserSchedule: UserSchedule): Promise<UserSchedule> => {
    try {
        const response = await axiosInstance.post(`userSchedule/addUserSchedule`, newUserSchedule);
        return response.data;
    } catch (error) {
        throw error;
    }
}



