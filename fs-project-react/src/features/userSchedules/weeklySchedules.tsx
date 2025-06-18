import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/API";
import { fetchCurrentTraineeUserSchedules } from "./userSchedules";


const WeeklyScheduler: React.FC = () => {
    const [weekDays, setWeekDays] = useState<Date[]>([]);
    const scheduleUser = useSelector((state: RootState) => state.userSchedule.userSchedules)
    const trainee = useSelector((state: RootState) => state.traineeUser.currentTraineeUser)

    const dispatch = useDispatch<AppDispatch>();
    //A function to calculate the dates of the current week
    useEffect(() => {
        const getCurrentWeek = (startDay: Date, daysToShow: number) => {
            const days: Date[] = [];
            for (let i = 0; i < daysToShow; i++) {
                const day = new Date(startDay);
                day.setDate(startDay.getDate() + i);
                days.push(day);
            }
            return days;
        };
        // Calculate the current week from Sunday
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Adjust the first day of the week (Sunday)
        setWeekDays(getCurrentWeek(startOfWeek, 6)); // 6 day show
        dispatch(fetchCurrentTraineeUserSchedules(trainee.id))

    }, []);

    //Time strips for each day of the week
    const timeSlots = [
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
        "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
    ];

    //A function to check whether a certain cell has a training start time
    const isStartExistInTime = (day: Date, time: string) => {
        const dayString = day.toISOString().split('T')[0];
        const hour = time.split(':')[0];
        const percent = scheduleUser.map(s => {
            const currentDate = new Date(s.date);
            const currentDateString = currentDate.toISOString().split('T')[0];
            const currentTime = s.workout.startHour.split(':');
            const currentHour = currentTime[0];

            if (currentDateString === dayString && hour === currentHour) {
                const currentMinute = currentTime[1];
                return [100 - Math.round((Number(currentMinute) / 60) * 100), s.workout.name];
            }
        });

        if (percent == undefined) {
            return -1;
        }

        return percent.find(p => p !== undefined) ?? -1;
    };


    // Function to calculate the end time of the workout
    const calculateEndTime = (startTime: string, duration: number, date: Date) => {


        const [hours, minutes] = startTime.split(":").map(Number);
        const startDate = new Date(date);
        startDate.setHours(hours, minutes, 0, 0);

        const endDate = new Date(startDate);
        endDate.setMinutes(startDate.getMinutes() + duration); // הוספת משך הזמן לאימון

        return endDate;
    }

    //A function to check whether a certain cell has an end time for training
    const isEndExistInTime = (day: Date, time: string) => {
        const dayString = day.toISOString().split('T')[0];
        const hour = time.split(':')[0];
        return scheduleUser.map(s => {
            const endDate = calculateEndTime(s.workout.startHour, s.workout.duration, s.date);
            const endHour = endDate.getHours().toString();
            const endMinutes = endDate.getMinutes();
            const endDayString = endDate.toISOString().split('T')[0];


            if (endDayString === dayString && hour === endHour) {
                return Math.round((Number(endMinutes) / 60) * 100);
            }
        }).find(p => p !== undefined) ?? -1;
    };



    // Handle clicking on a cell with training
    const handleCellClick = (day: Date, time: string) => {
        const timeParts = time.split(":");
        const hour = parseInt(timeParts[0], 10);
        const minute = parseInt(timeParts[1], 10);

        const schedule = scheduleUser.find(s => {
            const scheduleDate = new Date(s.date);
            const scheduleTime = scheduleDate.getHours();
            const scheduleMinute = scheduleDate.getMinutes();

            const isSameDay = scheduleDate.toLocaleDateString() === day.toLocaleDateString();
            const isSameTime = scheduleTime === hour && scheduleMinute === minute;

            return isSameDay && isSameTime;
        });

        if (schedule) {
            alert(`Workout: ${schedule.workout.name}\nInstructor: ${schedule.traineeUser.userName}\nDescription: ${schedule.workout.description}`);
        }
    };

    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                padding: "20px",
                backgroundColor: "#f9f9f9",
                color: "#333",
                marginTop: '19vh',
                width: '60vw'
            }}
        >
            <table
                style={{
                    width: "100%",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    borderCollapse: "collapse",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: "grey", color: "white" }}>
                        <th
                            style={{
                                border: "1px solid #ddd",
                                textAlign: "center",
                                verticalAlign: "middle",
                                fontSize: "16px",
                                width: '6.5vw'
                            }}
                        >
                        </th>
                        {weekDays.map((day, index) => (
                            <th
                                key={index}
                                style={{
                                    padding: "6px 10px",
                                    border: "1px solid #ddd",
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                    fontSize: "16px",
                                    width: '8vw'
                                }}
                            >
                                {day.toLocaleDateString("en-US", { weekday: "long" })}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map((timeSlot, index) => (
                        <tr key={index}>
                            <td
                                style={{
                                    padding: "6px 10px",
                                    border: "1px solid #ddd",
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                    fontSize: "14px",
                                    backgroundColor: "#f0f0f0",
                                }}
                            >
                                {timeSlot}
                            </td>
                            {weekDays.map((day, index) => {
                                const startWorkoutAppointment = isStartExistInTime(day, timeSlot);
                                const start = startWorkoutAppointment != -1 ? startWorkoutAppointment[0] : -1;
                                const end = isEndExistInTime(day, timeSlot);
                                const name = startWorkoutAppointment != -1 ? startWorkoutAppointment[1] : "";

                                return (
                                    <td
                                        key={index}
                                        onClick={() => handleCellClick(day, timeSlot)}
                                        style={{
                                            border: "1px solid #ddd",
                                            textAlign: "center",
                                            verticalAlign: "top",
                                            fontSize: "14px",
                                            width: "5vw",
                                            height: "2vh",
                                            background: start != -1 ? `linear-gradient(to top, #fe7474 ${start}%, transparent ${start}%)` : end != -1 ? `linear-gradient(to bottom,  #fe7474 ${end}%, transparent ${end}%)` : 'linear-gradient(to bottom,  #fe7474 0%, transparent 0%)',
                                            position: "relative",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: "5px", /* Positioning it at the bottom of the cell */
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                                                color: "white",
                                                padding: "5px 10px",
                                                borderRadius: "5px",
                                                fontSize: "12px",
                                                opacity: 0,
                                                pointerEvents: "none",
                                                transition: "opacity 0.3s ease",
                                            }}
                                            className="name-label"
                                        >
                                            {name}
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WeeklyScheduler;

