import axios from "axios";


axios.defaults.baseURL = `http://localhost:8080/api/`;

const axiosInstance = axios.create({
    withCredentials: true,
  });
  
export const signOut = async () => {
    try {
        const response = await axiosInstance.post(`user/signout`);
        return response;
    } catch (error) {
        throw error;
    }
}