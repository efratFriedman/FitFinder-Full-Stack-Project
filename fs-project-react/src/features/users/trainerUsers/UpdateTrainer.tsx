import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/API";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { TrainerUser } from "../../../models/TrainerUser";
import { UpdateTrainerUser, UploadTrainer } from "./trainerUsers";
import { Dialog } from "@mui/material";

const UpdateTrainer: React.FC = () => {
    const trainer = useSelector((state: RootState) => state.trainerUser.selectedTrainer);
    const dispatch = useDispatch<AppDispatch>();

    // הגדרת ה-form עם defaultValues מתוך ה-state
    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm<TrainerUser>({
        defaultValues: {
            id: trainer.id,
            userName: trainer.userName,
            password: trainer.password,
            email: trainer.email,
            gender: trainer.gender,
            birthdate: trainer.birthdate,
            phoneNumber: trainer.phoneNumber,
            profilPhoto: trainer.profilPhoto,
            experience: trainer.experience,
            bio: trainer.bio,
        },
    });

    const[open,setOpen]=useState(false);

    // פונקציה לטיפול בהגשת הטופס
    const onSubmit = async (data: TrainerUser) => {
        try {
            const fileInput = document.querySelector<HTMLInputElement>("input[type='file']");
            const file = fileInput?.files?.[0];
            if (!file || file == undefined) {
                dispatch(UpdateTrainerUser({ trainerUserId: data.id, updatedTrainerUser: data }));

            }
            else {
                dispatch(UploadTrainer({ updatedTrainerUser: data, file: file }))

            }
            setOpen(true);
            setTimeout(() => {
              setOpen(false);
            }, 1000);


        }
        catch (error) {
            // טיפול בשגיאה
            console.error("Error updating profile:", error);
        }
    };



    return (

        <div style={{
            marginTop: "18vh",
            // marginLeft: "-47vw",
            marginRight: "8vw",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            flexWrap: "nowrap"
        }}>
            < form onSubmit={handleSubmit(onSubmit)} style={{
                  width: "39vw",
                  marginLeft: "-2vw",
                  marginTop: "-14vh",
                  marginRight:" -9vw",
                  height:"74vh"
            }} >
                <h2>Update Profile</h2>
                <input type="file"
                />
                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    {...control.register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                            message: 'Invalid email address',
                        },
                    })}
                />
                {errors.email && <span className="error">{errors.email.message}</span>}

                <input
                    type="text"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    {...control.register('phoneNumber', {
                        required: 'Phone number is required',
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: 'Phone number must be 10 digits',
                        },
                    })}
                />
                {errors.phoneNumber && <span className="error">{errors.phoneNumber.message}</span>}

                <input
                    type="number"
                    id="experience"
                    placeholder="experience"
                    {...control.register('experience', {
                        required: 'experience number is required',

                    })}
                />
                {errors.experience && <span className="error">{errors.experience.message}</span>}

                <input
                    type="bio"
                    id="bio"
                    placeholder="bio"
                    {...control.register('bio', {
                        required: 'bio is required',

                    })}
                />
                {errors.bio && <span className="error">{errors.bio.message}</span>}



                <button type="submit">Update</button>
            </form >
            <Dialog open={open}>
                the details updated
            </Dialog>


        </div >
    );
};

export default UpdateTrainer;
