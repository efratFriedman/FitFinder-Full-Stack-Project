import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/API';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { signOutTrainee } from '../../features/users/traineeUsers/traineeUsers';
import { signOutTrainer } from '../../features/users/trainerUsers/trainerUsers';

const NavBar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const trainer = useSelector((state: RootState) => state.trainerUser.selectedTrainer);
    const trainee = useSelector((state: RootState) => state.traineeUser.currentTraineeUser);




    const nameLog = trainer?.id != undefined ? trainer.userName : trainee?.id != undefined ? trainee.userName : null;
    const imgLog = trainer?.id != undefined ? trainer.profileImage : trainee?.id != undefined ? trainee.profileImage : null;







    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const menuTrainee = [{ label: "Profile", path: "/ProfileTrainee" },
    { label: "Appointments", path: "/AppointmentTrainee" },
    { label: "Categories", path: "/Categories" },
    { label: "Logout", path: "" }];
    const menuTrainer = [{ label: "Logout", path: "" }];



    useEffect(() => {

    }, [navigate]);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }


    return (
        <div >
            <AppBar position="fixed" sx={{ backgroundColor: 'wheat' }} >
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
                    >
                        <img
                            src="public/logoblur.png"
                            alt="Logo"
                            style={{ height: '12vh', marginRight: '10vw' }}
                        />
                    </Typography>
                    {nameLog && <Avatar
                        src={`data:image;base64,${imgLog}`}
                        alt={nameLog}
                        sx={{ marginRight: 2, width: 55, height: 55 }}
                        onClick={handleMenuClick}
                    />}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        {trainee.id != undefined && menuTrainee.map((option, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => {
                                    if (option.label === 'Logout') {
                                        dispatch(signOutTrainee())
                                        navigate('/');
                                    } else {
                                        navigate(option.path); 
                                    }
                                    handleMenuClose();
                                }}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                        {trainer.id != undefined && menuTrainer.map((option, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => {
                                    if (option.label === 'Logout') {
                                        dispatch(signOutTrainer());
                                        navigate('/');

                                    } else {
                                        navigate(option.path);
                                    }
                                    handleMenuClose();
                                }}
                            >
                                <Typography variant="body1">{option.label}</Typography>
                            </MenuItem>
                        ))}


                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;