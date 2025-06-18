import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/API";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {signOutTrainer } from "../features/users/trainerUsers/trainerUsers";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoutesTrainee: React.FC<ProtectedRouteProps> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const trainee = useSelector((state: RootState) => state.traineeUser.currentTraineeUser);
    
    const isConect = (trainee.userName!=""&&trainee.userName!=undefined)? true : false;
    
    useEffect(() => {
        if (!isConect) {
             dispatch(signOutTrainer());
            navigate("/");
        }
    }, [isConect, dispatch, navigate]);
    return isConect ? children : <Navigate to="/" />;
}

export default ProtectedRoutesTrainee;
