import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/API";
import { useForm, Controller } from "react-hook-form";
import { TraineeUser } from "../../../models/TraineeUser";
import { FitnessLevel } from "../../../models/enums/FitnessLevel";
import { UpdateTraineeUser, UpdateTraineeUserWithImg, UploadTraineeImage } from "./traineeUsers";
import React from "react";
import { useNavigate } from "react-router-dom";
import BmiBar from "./BmiBar";
import { setCategory, setIsCustomized } from "../../workouts/workouts";

const Profile: React.FC = () => {
    const trainee = useSelector((state: RootState) => state.traineeUser.currentTraineeUser);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm<TraineeUser>({
        defaultValues: {
            id: trainee?.id,
            userName: trainee?.userName,
            birthdate: trainee?.birthdate,
            password: trainee?.password,
            gender: trainee?.gender,
            email: trainee?.email,
            phoneNumber: trainee?.phoneNumber,
            profilPhoto: trainee?.profilPhoto,
            height: trainee?.height,
            weight: trainee?.weight,
            bmi: trainee?.bmi,
            fitnessLevel: trainee?.fitnessLevel,
        },
    });

    const onSubmit = async (data: TraineeUser) => {
        try {
            const fileInput = document.querySelector<HTMLInputElement>("input[type='file']");
            const file = fileInput?.files?.[0];
            if (!file || file == undefined) {

                const d = await dispatch(UpdateTraineeUser({ updatedTraineeUser: data, traineeUserId: data.id })).unwrap();


            }
            else {

                const res = await dispatch(UpdateTraineeUserWithImg({ updatedTraineeUser: data, traineeUserId: data.id })).unwrap();
                if (res.status === 200) {

                    const photo = await dispatch(UploadTraineeImage({ trainee: res.traineeUser, file: file })).unwrap();


                }
            }
            dispatch(setIsCustomized(false));
            dispatch(setCategory(""));
            navigate('/WorkoutsCards');


        }
        catch (error) {
            console.error("Error updating profile:", error);
        }
    };



    return (
        <div>
            <div style={{
                marginTop: "18vh",
                marginRight: "8vw",
                height: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "row",
                flexWrap: "nowrap"
            }}>

                < form onSubmit={handleSubmit(onSubmit)} style={{ width: "60vw" }} >
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
                        type="text"
                        id="height"
                        placeholder="Height"
                        {...control.register('height')}
                    />
                    {errors.height && <span className="error">{errors.height.message}</span>}

                    <input
                        type="text"
                        id="weight"
                        placeholder="Weight"
                        {...control.register('weight')}
                    />
                    {errors.weight && <span className="error">{errors.weight.message}</span>}

                    <Controller
                        name="fitnessLevel"
                        control={control}
                        render={({ field }) => (
                            <select {...field}>
                                <option value={FitnessLevel.BEGINNER}>Beginner</option>
                                <option value={FitnessLevel.INTERMEDIATE}>Intermediate</option>
                                <option value={FitnessLevel.ADVANCED}>Advanced</option>
                            </select>
                        )}
                    />
                    {errors.fitnessLevel && <span className="error">{errors.fitnessLevel.message}</span>}

                    <button type="submit">Update</button>
                </form >
                <BmiBar></BmiBar>

            </div >
            <h3
                style={{
                    marginTop: "-30vh",
                    width: "30vw",
                    marginLeft: "55vw",
                }}
            >To succeed, stay dedicated, believe in yourself, and make the most of every opportunity to learn and improve. Success comes from hard work and perseverance!</h3>

        </div>

    );
};

export default Profile;
