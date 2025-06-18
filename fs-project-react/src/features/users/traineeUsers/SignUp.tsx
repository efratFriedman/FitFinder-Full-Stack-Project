

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FitnessLevel } from '../../../models/enums/FitnessLevel';
import { Gender } from '../../../models/enums/Gender';
import { TraineeUser } from '../../../models/TraineeUser';
import { useForm } from 'react-hook-form';
import { SignUpTraineeUser } from './traineeUsers';
import { AppDispatch } from '../../../store/API';


const SignUp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors }, setError } = useForm<TraineeUser>({
        defaultValues: {
            id: 0,
            userName: '',
            password: '',
            email: '',
            birthdate: '',
            phoneNumber: '',
            profilPhoto: '',
            height: 0,
            weight: 0,
            bmi: 0,
            fitnessLevel: FitnessLevel.BEGINNER,
            gender: Gender.FEMALE,
        },
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);



    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };


    const onSubmitSignUp = async (data: TraineeUser) => {
        try {
            const response = await dispatch(SignUpTraineeUser(data)).unwrap();
            if (response.status === 409) {
                setError('userName', {
                    type: 'manual',
                    message: 'Username already exists. Please choose a different one.',
                });
            } else if (response.status === 200) {
                navigate('/PreData');
            }
        } catch (err) {
            console.error('Error submitting form', err);
        }
    };


    return (
        <div className="form-container sign-up-container">

            <form onSubmit={handleSubmit(onSubmitSignUp)}>
                <h2>Create Account</h2>

                <input
                    type="text"
                    id="userNameSignUp"
                    placeholder="Username"
                    {...control.register('userName', {
                        required: 'Username is required',
                        minLength: {
                            value: 3,
                            message: 'Username must be at least 3 characters',
                        },
                    })}
                />
                {errors.userName && <span className="error">{errors.userName.message}</span>}

                <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    {...control.register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                            message: 'Invalid email address',
                        },
                    })}
                />
                {errors.email && <span className="error">{errors.email.message}</span>}

                <div className="password-container">
                    <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        id="passwordSignUp"
                        placeholder="Password"
                        {...control.register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters',
                            },
                            pattern: {
                                value: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
                                message: 'Password must contain at least 8 characters, including 1 letter and numbers',
                            },
                        })}
                    />
                    <span className="password-icon" onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                {errors.password && <span className="error">{errors.password.message}</span>}

                <input
                    type="text"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    {...control.register('phoneNumber', {
                        required: 'Phone number is required',
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: 'Phone number must be 10 digits',
                        },
                    })}
                />
                {errors.phoneNumber && <span className="error">{errors.phoneNumber.message}</span>}

                <input
                    type="date"
                    id="birthdate"
                    placeholder="Birthdate"
                    {...control.register('birthdate', {
                        required: 'Birthdate is required',
                        validate: (value) => {
                            const birthDate = new Date(value);
                            const currentDate = new Date();
                            const minAgeDate = new Date();
                            minAgeDate.setFullYear(currentDate.getFullYear() - 1); 

                            if (birthDate > currentDate) {
                                return 'Birthdate cannot be in the future';
                            } else if (birthDate > minAgeDate) {
                                return 'Birthdate must be at least 1 year ago';
                            }
                            return true;
                        },
                    })}
                />
                {errors.birthdate && <span className="error">{errors.birthdate.message}</span>}


                <div className="gender-select" style={{ width: '21.5vw' }}>
                    <select>
                        <option value={Gender.FEMALE}>female</option>
                        <option value={Gender.MALE}>male</option>
                    </select>
                </div>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};
export default SignUp;