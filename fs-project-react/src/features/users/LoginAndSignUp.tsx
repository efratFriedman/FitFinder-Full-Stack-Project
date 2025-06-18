import React from 'react';
import './LoginAndSignUp.css';
import Login from './Login';
import SignUp from './traineeUsers/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/API';
import { setIsSignUp } from './traineeUsers/traineeUsers';

const LoginAndSignUp: React.FC = () => {
  const isSignUp=useSelector((state:RootState)=>state.traineeUser.isSignUp);
  
  const dispatch=useDispatch<AppDispatch>();
    const handleSignUp = () => {
        dispatch(setIsSignUp(true));
    };

    const handleSignIn = () => {
        dispatch(setIsSignUp(false));
    };


return (
        <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
            {/* טופס ההרשמה */}
            <SignUp></SignUp>

            {/* טופס התחברות  */}
            <Login></Login>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start your journey with us</p>
                        <button className="ghost" onClick={handleSignIn}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us, please log in with your personal info</p>
                        <button className="ghost" onClick={handleSignUp}>Sign Up</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginAndSignUp;
