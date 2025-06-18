import { Route, Routes } from "react-router-dom";
import Login from "../features/users/Login";
import PreData from "../features/users/traineeUsers/PreData";
import SignUp from "../features/users/traineeUsers/SignUp";
import WorkoutsCards from "../features/workouts/WorkoutsCards";
import Workout from "../features/workouts/Workout";
import BmiBar from "../features/users/traineeUsers/BmiBar";
import Profile from "../features/users/traineeUsers/Profile";
import PersonalArea from "../features/users/trainerUsers/PersonalArea";
import CategoriesList from "../features/categories/CategoriesList";
import WeeklyScheduler from "../features/userSchedules/weeklySchedules";
import ProtectedRoutesTrainee from "./ProtectedRoutesTrainee";
import ProtectedRoutesTrainer from "./ProtectedRoutesTrainer";
import LoginAndSignUp from "../features/users/LoginAndSignUp";

const Routing: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginAndSignUp />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/SignUp" element={<ProtectedRoutesTrainee><SignUp /></ProtectedRoutesTrainee>}></Route>
        <Route path="/PreData" element={<ProtectedRoutesTrainee><PreData /></ProtectedRoutesTrainee>}></Route>
        <Route path="/WorkoutsCards" element={<WorkoutsCards />}> </Route>
        <Route path="/Workout/:wId" element={<ProtectedRoutesTrainee><Workout /></ProtectedRoutesTrainee>}></Route>
        <Route path="/ProfileTrainee" element={<ProtectedRoutesTrainee><Profile /></ProtectedRoutesTrainee>}></Route>
        <Route path="/PersonalAreaTrainer" element={<ProtectedRoutesTrainer><PersonalArea /></ProtectedRoutesTrainer>}></Route>
        <Route path="/Categories" element={<CategoriesList />}></Route>
        <Route path="/AppointmentTrainee" element={<ProtectedRoutesTrainee><WeeklyScheduler /></ProtectedRoutesTrainee>}></Route>
        <Route path="/Bmi" element={<ProtectedRoutesTrainee><BmiBar /></ProtectedRoutesTrainee>}></Route>


      </Routes>
    </>
  );
};

export default Routing;
