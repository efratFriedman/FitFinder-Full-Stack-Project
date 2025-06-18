import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/API';
import { fetchCustomizedWorkouts, fetchWorkouts } from './workouts';
import React, { useEffect, useState } from 'react';
import { Workout } from '../../models/Workout';
import { Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const WorkoutsCards: React.FC = () => {
    const isCustomized = useSelector((state: RootState) => state.workout.isCustomized);
    const category = useSelector((state: RootState) => state.workout.category);

    const trainee = useSelector((state: RootState) => state.traineeUser.currentTraineeUser);
    var workouts;
    if (!isCustomized) {
        workouts = useSelector((state: RootState) => state.workout.workouts);
        workouts = workouts.filter(w => {
            return w?.category?.categoryName.toLowerCase().startsWith(category.toLowerCase());
        });
        
    }
    else {
        workouts = useSelector((state: RootState) => state.workout.customizedWorkouts);

    }
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (!isCustomized) {
            dispatch(fetchWorkouts());
        }
        else {
            dispatch(fetchCustomizedWorkouts(trainee));
        }
    }, [dispatch]);

    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const current = new Date();


    const WorkoutsFromNow = workouts.filter((workout: Workout) => {
        const workoutDayIndex = days.indexOf(workout.dayOfWeek.trim().toUpperCase());
        const currentDayIndex = current.getDay();

        if (workoutDayIndex === -1) {
            console.error(`Invalid dayOfWeek: ${workout.dayOfWeek}`);
            return false;
        }

       else if (workoutDayIndex > currentDayIndex) {
            return true;
        }

       else if (workoutDayIndex === currentDayIndex) {
            const [workoutHour, workoutMinute] = workout.startHour.split(':').map(Number);
            if (isNaN(workoutHour) || isNaN(workoutMinute)) {
                console.error(`Invalid startHour: ${workout.startHour}`);
                return false;
            }

            const currentHour = current.getHours();
            const currentMinute = current.getMinutes();

            if ((workoutHour > currentHour )|| (workoutHour === currentHour && workoutMinute > currentMinute)) {
                return true;
            }
        }

        return false;
    });
    

    const [query, setQuery] = useState("");
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const inputValue = (e.target as HTMLInputElement).value;
            setQuery(inputValue);
        }
    };

    const filterWorkouts = WorkoutsFromNow.filter(w => w.city.toUpperCase().startsWith(query.toUpperCase()));






    return (
        <>

             <TextField
                variant="outlined"
                placeholder="Search by city"
                onKeyDown={handleSearch}
                sx={{ marginTop: "17vh", marginBottom: "-31vh" }}
            />
            <Grid container spacing={2} sx={{
                 padding: '1%',
                 maxWidth: '100%',
                 maxHeight:'57vh',
                 '&::-webkit-scrollbar': {
                     height:0
                 },
                 overflowX: 'hidden',
                  marginTop: "24vh", 
                  height: "69vh",
                   scrollbarWidth: 'none', 
                   msOverflowStyle: 'none' }}>
                {filterWorkouts.length == 0 && <h1>not found workouts! </h1>}
                {filterWorkouts.length > 0 && filterWorkouts.map((workout: Workout) => (
                    <Grid item xs={12} sm={6} md={3} key={workout.id} onClick={() => navigate(`/Workout/${workout.id}`)}
                    sx={{
                        display:'flex',
                        justifyContent:'center'
                    }}
                    >
                        <Card sx={{ width: "90vw", maxWidth: "90vw", height: "45vh" }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={workout.picture ? `data:image;base64,${workout.workoutImage}` : '/gym-with-indoor-cycling-equipment.jpg'}
                                    alt="workout"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {workout.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {workout.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default WorkoutsCards;
