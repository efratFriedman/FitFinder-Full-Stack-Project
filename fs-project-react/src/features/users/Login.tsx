import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AppDispatch } from '../../store/API';
import { LoginTraineeUser, setIsSignUp } from './traineeUsers/traineeUsers';
import { logInTrainerUser } from './trainerUsers/trainerUsers';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { setIsCustomized } from '../workouts/workouts';

interface LoginFormValues {
    userName: string;
    password: string;
}

const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } ,reset} = useForm<LoginFormValues>();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    const submit = async (data: LoginFormValues) => {
        const { userName, password } = data;
        try {
            const trainee = await dispatch(LoginTraineeUser({ userName, password })).unwrap();
            if (trainee?.status === 200) {
               await dispatch(setIsCustomized(true));
                 navigate('/WorkoutsCards');
            } else if (trainee?.status === 401) {
                alert('Incorrect password, please try again.');
                reset({password:''})

            } else {
                const trainer = await dispatch(logInTrainerUser({ userName, password })).unwrap();
                if (trainer.status === 200) {
                    navigate('/PersonalAreaTrainer')
                } else if (trainer.status === 401) {
                    alert('Incorrect password, please try again.');
                    reset({password:''})
                } else {
                   await reset({password:''})
                   await reset({userName:''})
                    dispatch(setIsSignUp(true));
                }
            }
        } catch (err) {
            console.error('Error signing in:', err);
        }
    };

    return (
        <div>
            <div className="form-container sign-in-container">
                <form onSubmit={handleSubmit(submit)}>
                    <h1>Sign in</h1>

                    {/* Username Input */}
                    <input
                        type="text"
                        id="userNameLogin"
                        placeholder="Username"
                        {...register('userName', {
                            required: 'Username is required',
                            minLength: {
                                value: 3,
                                message: 'Username must be at least 3 characters',
                            },
                        })}
                    />
                    {errors.userName && <span className="error">{errors.userName.message}</span>}

                    {/* Password Input */}
                    <div className="password-container">
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            id="passwordLogin"
                            placeholder="Password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters',
                                },
                                pattern: {
                                    value: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
                                    message: 'Password must contain at least 8 characters, including 1 letter and 1 number',
                                },
                            })}
                        />
                        <span className="password-icon" onClick={togglePasswordVisibility}>
                            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.password && <span className="error">{errors.password.message}</span>}

                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
