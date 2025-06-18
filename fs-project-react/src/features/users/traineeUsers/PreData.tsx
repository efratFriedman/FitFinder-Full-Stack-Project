import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField, Typography, Fade } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { FitnessLevel } from "../../../models/enums/FitnessLevel";
import { TraineeUser } from "../../../models/TraineeUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/API";
import { Gender } from "../../../models/enums/Gender";
import { UpdateTraineeUser } from "./traineeUsers";
import { useNavigate } from "react-router-dom";

const PreData: React.FC = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const currentUser = useSelector((state: RootState) => state.traineeUser.currentTraineeUser);

  const { control, handleSubmit, formState: { errors } } = useForm<TraineeUser>({
    defaultValues: {
      id: currentUser ? currentUser.id : 0,
      userName: currentUser ? currentUser.userName : "",
      password: currentUser ? currentUser.password : "",
      email: currentUser ? currentUser.email : "",
      birthdate: currentUser ? currentUser.birthdate : "",
      phoneNumber: currentUser ? currentUser.phoneNumber : "",
      profilPhoto: currentUser ? currentUser.profilPhoto : "",
      height: currentUser ? currentUser.height : 0,
      weight: currentUser ? currentUser.weight : 0,
      bmi: currentUser ? currentUser.bmi : 0,
      fitnessLevel: currentUser ? currentUser.fitnessLevel : FitnessLevel.BEGINNER,
      gender: currentUser ? currentUser.gender : Gender.FEMALE,
    },
  });

  useEffect(() => {
    setOpen(true);
  }, [location.pathname]);

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: TraineeUser) => {
    try {
      const response=await dispatch(UpdateTraineeUser({updatedTraineeUser:data,traineeUserId:data.id})).unwrap();
      if(response.status==200){
        navigate('/WorkoutsCards')
      }
      handleClose(); 
    } catch (err) {
      console.log("Error updating trainee:", err);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Fade in={open} timeout={500}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
              width: 400,
            }}
          >
            <Typography variant="h6" align="center" gutterBottom>
              Enter Your Details
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Controller
                  name="height"
                  control={control}
                  rules={{ required: "Height is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Height"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      error={!!errors.height}
                      helperText={errors.height?.message}
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name="weight"
                  control={control}
                  rules={{ required: "Weight is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Weight (kg)"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      error={!!errors.weight}
                      helperText={errors.weight?.message}
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  name="fitnessLevel"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Fitness Level"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      select
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value={FitnessLevel.BEGINNER}>Beginner</option>
                      <option value={FitnessLevel.INTERMEDIATE}>Intermediate</option>
                      <option value={FitnessLevel.ADVANCED}>Advanced</option>
                    </TextField>
                  )}
                />
              </div>

              <div style={{ marginTop: 20 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default PreData;
