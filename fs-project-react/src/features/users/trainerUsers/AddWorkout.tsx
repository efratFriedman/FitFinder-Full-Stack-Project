import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { Workout } from '../../../models/Workout';
import { FitnessLevel } from '../../../models/enums/FitnessLevel';
import { Gender } from '../../../models/enums/Gender';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/API';
import { addNewWorkout, upload } from '../../workouts/workouts';
import { fetchCategories } from '../../categories/categories';
import { Navigate, useNavigate } from 'react-router-dom';

interface props {
    openDialog: boolean,
    handleCloseDialog: () => void
}
const AddWorkout: React.FC<props> = ({ openDialog, handleCloseDialog }) => {
    const categories = useSelector((state: RootState) => state.category.categories);
    const trainer = useSelector((state: RootState) => state.trainerUser.selectedTrainer);
    const dispatch = useDispatch<AppDispatch>();
    // const [openDialog, setOpenDialog] = useState<boolean>(open);
    const { profileImage, ...filterTrainer } = trainer
    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [categories, dispatch]);

    // useForm hook to manage form state
    const { control, handleSubmit, formState: { errors }, reset } = useForm<Workout>({
        defaultValues: {
            id: 0,
            name: "",
            description: "",
            trainerWorkout: filterTrainer,
            price: 0,
            phoneNumber: "",
            city: "",
            street: "",
            numberStreet: 0,
            startAge: 0,
            endAge: 0,
            maximumParticipants: 0,
            currentParticipants: 0,
            dayOfWeek: "MONDAY", // Set default value here
            targetDate: new Date(),
            startHour: "",
            duration: 0,
            fitnessLevel: FitnessLevel.BEGINNER,
            gender: filterTrainer.gender,
            picture: "",
            category: categories[0],

        }
    });

    const [file, setFile] = useState<File | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        setFile(selectedFile || null);
    };
    const onSubmit = (data: Workout) => {
        console.log(data);
        //     const fileInput = document.querySelector<HTMLInputElement>("input[type='file']");
        // console.log(fileInput?.files,"fileInput");

        //     const file = fileInput?.files?.[0];

        if (file) {//קריאה להוספת אימון בלי תמונה
            dispatch(upload({ newWorkout: data, file: file }))
        }
        else {
            dispatch(addNewWorkout(data));

        }
        handleCloseDialog();
    };

    return (


        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md" >
            <DialogTitle>
                <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                    Add Workout
                </Typography>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Workout name is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Workout Name"
                                fullWidth
                                margin="normal"
                                error={!!errors.name}
                                helperText={errors.name ? errors.name.message : ''}
                                InputLabelProps={{
                                    shrink: true, // Ensures label is always on top
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: "Description is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Description"
                                fullWidth
                                margin="normal"
                                error={!!errors.description}
                                helperText={errors.description ? errors.description.message : ''}
                                InputLabelProps={{
                                    shrink: true, // Ensures label is always on top
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="price"
                        control={control}
                        rules={{
                            required: "Price is required",
                            min: { value: 1, message: "Price must be greater than 0" }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Price"
                                type="number"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    inputProps: { min: 1 }
                                }}
                                error={!!errors.price}
                                helperText={errors.price ? errors.price.message : ''}
                                InputLabelProps={{
                                    shrink: true, // Ensures label is always on top
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="phoneNumber"
                        control={control}
                        rules={{
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{9,10}$/,
                                message: "Phone number must be 9 or 10 digits"
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Phone Number"
                                fullWidth
                                margin="normal"
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
                                InputLabelProps={{
                                    shrink: true, // Ensures label is always on top
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="city"
                        control={control}
                        rules={{ required: "City is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="City"
                                fullWidth
                                margin="normal"
                                error={!!errors.city}
                                helperText={errors.city ? errors.city.message : ''}
                                InputLabelProps={{
                                    shrink: true, // Ensures label is always on top
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="street"
                        control={control}
                        rules={{ required: "Street is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Street"
                                fullWidth
                                margin="normal"
                                error={!!errors.street}
                                helperText={errors.street ? errors.street.message : ''}
                                InputLabelProps={{
                                    shrink: true, // Ensures label is always on top
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="numberStreet"
                        control={control}
                        rules={{
                            required: "Street number is required",
                            min: { value: 1, message: "Street number must be greater than 0" }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Street Number"
                                type="number"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    inputProps: { min: 1 }
                                }}
                                error={!!errors.numberStreet}
                                helperText={errors.numberStreet ? errors.numberStreet.message : ''}
                                InputLabelProps={{
                                    shrink: true, // Ensures label is always on top
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="startAge"
                        control={control}
                        rules={{
                            required: "Start age is required",
                            min: { value: 1, message: "Age must be greater than 0" }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Start Age"
                                type="number"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    inputProps: { min: 1 }
                                }}
                                error={!!errors.startAge}
                                helperText={errors.startAge ? errors.startAge.message : ''}
                                InputLabelProps={{
                                    shrink: true, // Ensures label is always on top
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="endAge"
                        control={control}
                        rules={{
                            required: "End age is required",
                            min: { value: 1, message: "Age must be greater than 0" }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="End Age"
                                type="number"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    inputProps: { min: 1 }
                                }}
                                error={!!errors.endAge}
                                helperText={errors.endAge ? errors.endAge.message : ''}
                                InputLabelProps={{
                                    shrink: true, // Ensures label is always on top
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="maximumParticipants"
                        control={control}
                        rules={{
                            required: "  field required",
                            min: { value: 1, message: "value must be greater than 0" }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Maximum Participants"
                                type="number"
                                fullWidth
                                margin="normal"
                                InputProps={{
                                    inputProps: { min: 1 }
                                }}
                                error={!!errors.maximumParticipants}
                                helperText={errors.maximumParticipants ? errors.maximumParticipants.message : ''}
                                InputLabelProps={{
                                    shrink: true, // Ensures label is always on top
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="fitnessLevel"
                        control={control}
                        rules={{ required: "Fitness level is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Fitness Level"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                select
                                error={!!errors.fitnessLevel}
                                helperText={errors.fitnessLevel ? errors.fitnessLevel.message : ''}
                                InputLabelProps={{
                                    shrink: true, // Ensures label is always on top
                                }}
                            >
                                <MenuItem value={FitnessLevel.BEGINNER}>Beginner</MenuItem>
                                <MenuItem value={FitnessLevel.INTERMEDIATE}>Intermediate</MenuItem>
                                <MenuItem value={FitnessLevel.ADVANCED}>Advanced</MenuItem>
                            </TextField>
                        )}
                    />
                    {/* Day of the Week */}
                    <Controller
                        name="dayOfWeek"
                        control={control}
                        rules={{ required: "Day of the week is required" }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.dayOfWeek}>
                                <InputLabel shrink>Day of the Week</InputLabel>
                                <Select
                                    {...field}
                                    label="Day of the Week"
                                >
                                    <MenuItem value="SUNDAY">Sunday</MenuItem>
                                    <MenuItem value="MONDAY">Monday</MenuItem>
                                    <MenuItem value="TUESDAY">Tuesday</MenuItem>
                                    <MenuItem value="WEDNESDAY">Wednesday</MenuItem>
                                    <MenuItem value="THURSDAY">Thursday</MenuItem>
                                    <MenuItem value="FRIDAY">Friday</MenuItem>
                                </Select>
                                {errors.dayOfWeek && <Typography color="error">{errors.dayOfWeek.message}</Typography>}
                            </FormControl>
                        )}
                    />
                    {/* Start Hour */}
                    <Controller
                        name="startHour"
                        control={control}
                        rules={{ required: "Start hour is required" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Start Hour"
                                type="time"
                                fullWidth
                                margin="normal"
                                error={!!errors.startHour}
                                helperText={errors.startHour ? errors.startHour.message : ''}
                                InputLabelProps={{
                                    shrink: true, // Ensures label is always on top
                                }}
                            />
                        )}
                    />

                    {/* Duration */}
                    <Controller
                        name="duration"
                        control={control}
                        rules={{
                            required: "Duration is required",
                            min: { value: 1, message: "Duration must be greater than 0" }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Duration (Minutes)"
                                type="text"
                                fullWidth
                                margin="normal"
                                error={!!errors.duration}
                                helperText={errors.duration ? errors.duration.message : ''}
                                InputLabelProps={{
                                    shrink: true, // Ensures label is always on top
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.category}>
                                <InputLabel shrink>Category</InputLabel>
                                <Select
                                    {...field}
                                    onChange={(e) => field.onChange(categories[Number(e.target.value)])}
                                >
                                    {categories.map((category, index) => (
                                        <MenuItem key={category.id} value={index}>
                                            {category.categoryName}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.category && <Typography color="error">{errors.category.message}</Typography>}
                            </FormControl>
                        )}
                    />

                    {/* File upload */}
                    <InputLabel htmlFor="workoutImage">Upload Image</InputLabel>
                    <input type="file"
                        onChange={handleFileChange}
                    />


                    <button type='submit'>submit</button>
                </form>        </DialogContent>
            <DialogActions>
                <button onClick={handleCloseDialog} color="primary">
                    Cancel
                </button>

            </DialogActions>
        </Dialog >

    );
};

export default AddWorkout;
