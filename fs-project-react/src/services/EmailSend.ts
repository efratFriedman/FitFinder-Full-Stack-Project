import axios from "axios";
import { EmailDetails } from "../models/EmailDetails";



const axiosInstance = axios.create({
    withCredentials: true,
  });

export const sendEmail = async (mailDetail: EmailDetails) => {
    try {
        const ans = await axiosInstance.post(`http://localhost:8080/sendMail`, mailDetail);
        return {data:ans.data,status:ans.status};
    } catch (error) {
        console.log("error to send mail ");
        throw (error);
    }
}

