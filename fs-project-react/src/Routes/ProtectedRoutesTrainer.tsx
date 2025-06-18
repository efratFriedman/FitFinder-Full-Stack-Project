import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/API";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { signOutTrainee } from "../features/users/traineeUsers/traineeUsers";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoutesTrainer: React.FC<ProtectedRouteProps> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const trainer = useSelector((state: RootState) => state.trainerUser.selectedTrainer);
    
    const isConect =  (trainer.userName!=""&&trainer.userName!=undefined) ? true : false;
    
    useEffect(() => {
        if (!isConect) {
             dispatch(signOutTrainee());
            navigate("/");
        }
    }, [isConect, dispatch, navigate]);
    return isConect ? children : <Navigate to="/" />;
}

export default ProtectedRoutesTrainer;
