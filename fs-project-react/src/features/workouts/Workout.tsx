import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/API";
import './Workout.css';
import { FaDumbbell, FaUserAlt, FaClock, FaUsers, FaArrowDown, FaCalendarAlt, FaArrowsAltH, FaMars, FaVenus } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { useParams } from "react-router-dom";
import FeedBacksWorkout from "../feedbacks/FeedBacksWorkout";
import { UserSchedule } from "../../models/UserSchedule";
import { Dialog, DialogContent, DialogContentText, TextField } from "@mui/material";
import { addNewUserSchedule, fetchCurrentTraineeUserSchedules } from "../userSchedules/userSchedules";
import { fetchWorkouts } from "./workouts";
import { addNewFeedback } from "../feedbacks/feedbacks";
import { SendEmailForUser } from "../email/emailSlice";

const Workout: React.FC = () => {
  const workouts = useSelector((state: RootState) => state.workout.workouts);
  const dispatch = useDispatch<AppDispatch>();

  const { wId } = useParams();
  const workout = workouts.find(w => w.id === Number(wId))!;

  const trainee = useSelector((state: RootState) => state.traineeUser.currentTraineeUser);
  const appointments = useSelector((state: RootState) => state.userSchedule.userSchedules);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    dispatch(fetchWorkouts());
    dispatch(fetchCurrentTraineeUserSchedules(trainee.id));
  }, []);






  const updateDateToWorkout = (dayOfWeek: string, hour: string) => {
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

    const workoutDate = new Date();

    const currentDay = workoutDate.getDay();



    const daysToAdd = days.indexOf(dayOfWeek.toUpperCase()) - currentDay;
    workoutDate.setDate(workoutDate.getDate() + daysToAdd);

    const time = hour.split(':').map(Number);

    workoutDate.setHours(time[0]);
    workoutDate.setMinutes(time[1]);
    workoutDate.setSeconds(0);
    workoutDate.setMilliseconds(0);

    return workoutDate;
  };

  const userScheduleData: UserSchedule = {
    id: -1,
    workout: workout!,
    traineeUser: trainee!,
    date: (workout?.dayOfWeek && workout?.startHour) ?
      updateDateToWorkout(workout.dayOfWeek, workout.startHour)
      : new Date(),
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const [OpenDialog, setOpenDialog] = useState(false);
  const [openSucces, setOpenSucces] = useState(false);

  const calculateEndTime = (start: string, duration: number): string => {
    const [hours, minutes] = start.split(':').map(Number);

    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);

    startDate.setMinutes(startDate.getMinutes() + duration);

    const endHours = String(startDate.getHours()).padStart(2, '0');
    const endMinutes = String(startDate.getMinutes()).padStart(2, '0');
    return `${endHours}:${endMinutes}`;
  };

  const checkAppointment = async () => {
    let appointmentConflict = false;

    for (const a of appointments) {
      if (a.workout.dayOfWeek === workout?.dayOfWeek) {
        const end = calculateEndTime(a.workout.startHour, a.workout.duration);
        const endHour = end.split(':').map(Number);
        const startHour = workout.startHour.split(':').map(Number);

        // If the time of the current workout coincides with another workout of the same day
        if (endHour[0] > startHour[0] || (endHour[0] === startHour[0] && endHour[1] > startHour[1])) {
          appointmentConflict = true;
          break;
        }
      }
    }
    if (workout?.gender != trainee?.gender) {
      appointmentConflict = true;
    }

    if (!appointmentConflict) {
      const res = await dispatch(addNewUserSchedule(userScheduleData));
      if (res) {
        SendEmailForUser({ trainee: trainee, app: userScheduleData });
      }
      setOpenSucces(true);
      setTimeout(() => {
        setOpenSucces(false);
      }, 2000);
    } else {
      setOpenDialog(true);
      setTimeout(() => {
        setOpenDialog(false);
      }, 3000);
    }

  }


  const handleAddFeedback = () => {


    if (newMessage.trim()) {
      const newFeedback = {
        id: -1,
        workoutFeedback: workout,
        traineeUserFeedback: trainee,
        feedbackText: newMessage,
        date: new Date().toISOString()
      };

      dispatch(addNewFeedback(newFeedback));
      setNewMessage('');
    }

  }


  return (
    <>

      <div style={{ display: "flex", justifyContent: " space-between", marginTop: "20vh" }}>
        <div className="cardDetails">
          <div>
            <img
              src={workout?.picture ? `data:image;base64,${workout?.workoutImage}` : '/gym-with-indoor-cycling-equipment.jpg'}
              alt="תמונת אימון כושר"
              style={{ width: "26vw", height: "100%", marginRight: "5vw", borderRadius: "6px" }}
            />
          </div>
          {/* workout details */}
          <div style={{ marginRight: "5vw", alignItems: "flex-start", textAlign: "left" }}>
            <div className="icon-container">
              <div className="icon">
                <FaUserAlt size={20}></FaUserAlt>
                <div className="label">trainer</div>
              </div>
              <p>:{workout?.trainerWorkout?.userName}</p>
            </div>
            <div className="icon-container">
              <div className="icon">
                <FaUsers size={20}></FaUsers>
                <div className="label">participants</div>
              </div>
              <p>:{workout?.maximumParticipants}</p>
            </div>
            <div className="icon-container">
              <div className="icon">
                <FaCalendarAlt size={20}></FaCalendarAlt>
                <div className="label">time</div>
              </div>
              <p>:{workout?.dayOfWeek.toLowerCase()},{workout.startHour}</p>
            </div>
            <div className="icon-container">
              <div className="icon">
                <FaClock size={20}></FaClock>
                <div className="label">duration</div>
              </div>
              <p>:{workout?.duration} minutes</p>
            </div>
            <div className="icon-container">
              <div className="icon">
                <FaArrowsAltH size={20}></FaArrowsAltH>
                <div className="label">ageRange</div>
              </div>
              <p>:{workout?.startAge}-{workout?.endAge}</p>
            </div>
            <div className="icon-container">
              <div className="icon" >
                <FaDumbbell size={20}></FaDumbbell>
                <div className="label">fitnessLevel</div>
              </div>
              <p>:{workout?.fitnessLevel.toString().toLowerCase()}</p>
            </div>
            <div className="icon-container">
              <div className="icon">
                <MdLocationOn size={20}></MdLocationOn>
                <div className="label">address</div>
              </div>
              <p>:{workout?.street} {workout?.numberStreet} {workout?.city}</p>
            </div>
          </div>
          {workout?.gender.toString() == "FEMALE" ? <FaVenus size={20}></FaVenus> : <FaMars size={20}></FaMars>}

        </div>

        <div>
          {/* contact */}
          <div className="contact-container">
            <div className="contact-header" onClick={toggleDetails}>
              <span className={`arrow ${isOpen ? 'open' : ''}`}><FaArrowDown /></span> {/* חץ */}
              <span>contact</span>
            </div>
            {isOpen && (
              <div className="contact-details">
                <div className="phone">
                  <i className="fas fa-phone-alt"></i> {workout?.phoneNumber}
                  <i className="fas fa-phone-alt"></i> {workout?.phoneNumber}
                </div>
              </div>
            )}
          </div>
          {/* schedule workout*/}
          {workout?.currentParticipants < workout?.maximumParticipants ? <button onClick={checkAppointment}>Schedule a workout</button> :
            <p>Training is full !</p>
          }
        </div>
        <div>
          {/* feedbacks */}
          <div className="feedback-container">
            <FeedBacksWorkout workoutId={Number(wId)} />
          </div>
        </div>
      </div>
      <Dialog
        open={OpenDialog}
        aria-labelledby="success-dialog-title"
        aria-describedby="success-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="success-dialog-description" sx={{ textAlign: "center" }}>
            "This workout overlaps with a time where you already have a session. Please choose a different time."          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog open={openSucces}>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }}>
            The workout has been set successfully
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="add feedback"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAddFeedback();
          }
        }}
        sx={{ width: "43vw", marginTop: "1vh", marginLeft: "-43.4vw", backgroundColor: "white" }}
      />
    </>
  );
};

export default Workout;
