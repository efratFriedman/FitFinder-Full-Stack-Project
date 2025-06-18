import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../store/API";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "./categories";
import { setCategory, setIsCustomized } from "../workouts/workouts";
import { useNavigate } from "react-router-dom";

const CategoriesList: React.FC = () => {
    const categories = useSelector((state: RootState) => state.category.categories);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    useEffect(() => {
        if (!categories || categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [categories, dispatch]);



    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: "20px",
                height: "84vh",
                marginTop: "19vh",
                overflowY: 'auto', 
                overflowX: 'hidden', 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none', 
            }}
        >
            <style>
                {`
                    div::-webkit-scrollbar {
                        display: none; /* הסתרת פס גלילה */
                    }
                `}
            </style>
            <div
                style={{
                    flex: "1 1 calc(33.33% - 20px)",
                    boxSizing: "border-box",
                    textAlign: "center",
                    position: "relative",
                }}
            >
                <img
                    src={`src/Pictures/general.png`}
                    style={{
                        width: "23vw",
                        height: "38vh",
                        borderRadius: "10px",
                        objectFit: "cover",
                    }}
                />
                <button
                    onClick={() => {
                        dispatch(setCategory(""));
                        dispatch(setIsCustomized(false));
                        navigate('/WorkoutsCards')
                    }}
                    style={{
                        position: "absolute",
                        bottom: "10%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "8px 12px",
                        cursor: "pointer",
                    }}
                >
                    general
                </button>
            </div>
            {categories &&
                categories.map((category, index) => (
                    <div
                        key={index}
                        style={{
                            flex: "1 1 calc(33.33% - 20px)",
                            boxSizing: "border-box",
                            textAlign: "center",
                            position: "relative",
                        }}
                    >
                        <img
                            src={`src/Pictures/${category.id}.png`}
                            style={{
                                width: "23vw",
                                height: "38vh",
                                borderRadius: "10px",
                                objectFit: "cover",
                            }}
                            alt={`${category.id}`}
                        />
                        <button
                            onClick={() => {
                                dispatch(setCategory(category.categoryName));
                                dispatch(setIsCustomized(false));
                                navigate('/WorkoutsCards')
                            }}
                            style={{
                                position: "absolute",
                                bottom: "10%",
                                left: "50%",
                                transform: "translateX(-50%)",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                padding: "8px 12px",
                                cursor: "pointer",
                            }}
                        >
                            {category.categoryName}
                        </button>
                    </div>
                ))
            }
            
        </div>
    );
    
};

export default CategoriesList;
