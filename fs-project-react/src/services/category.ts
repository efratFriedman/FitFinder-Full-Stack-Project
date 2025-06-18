import axios from "axios";
import { Category } from "../models/Category";

axios.defaults.baseURL = `http://localhost:8080/api/`;

const axiosInstance = axios.create({
    withCredentials: true,
  });

export const getCategories=async():Promise<Category[]>=>{
    try {
        const response = await axiosInstance.get(`category/getCategories`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getCategoryById=async(categoryId:number):Promise<Category>=>{
    try {
        const response = await axiosInstance.get(`category/getCategoryById/${categoryId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addCategory = async (newCategory: Category): Promise<Category> => {
    try {
        const response = await axiosInstance.post(`category/addCategory`, newCategory);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteCategory = async (categoryId: number): Promise<Category> => {
    try {
        const response = await axiosInstance.delete(`category/deleteCategory/${categoryId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
