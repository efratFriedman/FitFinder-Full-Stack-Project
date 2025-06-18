import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import { Category } from "../../models/Category";
import { addCategory, deleteCategory, getCategories, getCategoryById } from "../../services/category";


const initialState= {
    categories: [] as Category[],
    error: {},
    selectedCategory: {} as Category
} 

export const fetchCategories = createAsyncThunk(
    'categories/fetchcategories',
    async () => {
        const categoris = await getCategories();
        return categoris;
    });

export const fetchCategoryById = createAsyncThunk(
    'categories/fetchCategoryById',
    async (categoryId: number) => {
        const category = await getCategoryById(categoryId);
        return category;
    });

export const addNewCategory = createAsyncThunk(
    'categories/addNewCategory',
    async (newCategory: Category) => {
        const category = await addCategory(newCategory);
        return category;
    });

export const DeleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (categoryId: number) => {
       await deleteCategory(categoryId);
        return categoryId;
    }
);


export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
        builder.addCase(fetchCategoryById.fulfilled, (state, action) => {
            state.selectedCategory = action.payload;
        });
        builder.addCase(addNewCategory.fulfilled, (state, action) => {
            state.categories = [...state.categories, action.payload]
        });
        builder.addCase(DeleteCategory.fulfilled, (state, action) => {
            state.categories = state.categories.filter((category: Category) => category.id != action.payload)
        });


        builder.addMatcher(
            isRejected,
            (state, action) => {
                state.error = action.error;
            }
        );
    }
})
