import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/API";
import { fetchWorkouts } from "../../workouts/workouts";
import "./TrainerWorkoutsList.scss";

const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

const TrainerWorkoutsList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const trainer = useSelector((state: RootState) => state.trainerUser.selectedTrainer);
    const workouts = useSelector((state: RootState) =>
        state.workout.workouts?.filter((w) => w.trainerWorkout?.id === trainer?.id)
    );

    useEffect(() => {
        if (!workouts || workouts.length === 0) {
            dispatch(fetchWorkouts());
        }
    }, [dispatch, workouts]);

    const getDateOfWeekday = (dayIndex: number) => {
        const today = new Date();
        const currentDayIndex = today.getDay();
        const diff = dayIndex - currentDayIndex;
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + diff);
        return targetDate;
    };

    return (
        <>
        <div className="cards-container">
            {workouts?.map((w, index) => (
                <div key={index} className="workout-card alt">
                    <div className="meta">
                        <div className="photo">
                            <img
                                src={w?.picture ? `data:image;base64,${w?.workoutImage}` : "/gym-with-indoor-cycling-equipment.jpg"}
                                alt="תמונת אימון כושר"
                                style={{ width: "26vw", height: "100%", marginRight: "5vw", borderRadius: "6px" }}
                            />
                        </div>
                    </div>
                    <div className="description">
                        <h1>{w.name}</h1>
                        <p>{w.description}</p>
                        <ul className="details">
                            <li className="date">
                                {w.dayOfWeek &&
                                    getDateOfWeekday(daysOfWeek.indexOf(w.dayOfWeek.toUpperCase())).toLocaleDateString()
                                }
                            </li>
                            <li>{w.startAge}-{w.endAge}</li>
                            <li className="">{w.currentParticipants}</li>
                        </ul>
                    </div>
                </div>
            ))}
            </div>
        </>
    );
};

export default TrainerWorkoutsList;
