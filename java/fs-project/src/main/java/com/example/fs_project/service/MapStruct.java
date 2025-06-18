package com.example.fs_project.service;


import com.example.fs_project.DTO.*;
import com.example.fs_project.model.*;
import org.mapstruct.Mapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;


@Mapper(componentModel = "spring")
public interface MapStruct {

    static String DIRECTORY_URL=System.getProperty("user.dir")+"\\images\\";

    //User

    List<UserDTO> usersToDto(List<User> users);

    default UserDTO UserToDTO(User user) throws IOException {
        UserDTO userDTO=new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setBirthdate(user.getBirthdate());
        userDTO.setEmail(user.getEmail());
        userDTO.setUserName(user.getUserName());
        userDTO.setGender(user.getGender());
        userDTO.setPassword(user.getPassword());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setProfilPhoto(user.getProfilPhoto());

        if(user.getProfilPhoto()!=null&&!user.getProfilPhoto().isEmpty()){
            Path file= Paths.get(DIRECTORY_URL+user.getProfilPhoto());
            if(Files.exists(file)){
                byte [] fileBytes=Files.readAllBytes(file);
                String base64Image= Base64.getEncoder().encodeToString(fileBytes);
                userDTO.setProfileImage(base64Image);
            }
        }
        else{
            userDTO.setProfileImage("");
        }

        return userDTO;
    }

    //Trainee User
    List<TraineeUserDTO> traineesToDTO(List<TraineeUser> trainees);

    default TraineeUserDTO traineeToDTO(TraineeUser trainee) throws IOException {
        // יצירת אובייקט TraineeUserDTO חדש
        TraineeUserDTO traineeUserDTO = new TraineeUserDTO();

        // מיפוי השדות מ-User ל-UserDTO
        UserDTO userDTO = UserToDTO(trainee);

        // העברת ערכים משדות UserDTO ל-TraineeUserDTO
        traineeUserDTO.setId(userDTO.getId());
        traineeUserDTO.setBirthdate(userDTO.getBirthdate());
        traineeUserDTO.setEmail(userDTO.getEmail());
        traineeUserDTO.setUserName(userDTO.getUserName());
        traineeUserDTO.setGender(userDTO.getGender());
        traineeUserDTO.setPassword(userDTO.getPassword());
        traineeUserDTO.setPhoneNumber(userDTO.getPhoneNumber());
        traineeUserDTO.setProfileImage(userDTO.getProfileImage());
        traineeUserDTO.setProfilPhoto(userDTO.getProfilPhoto());
        // מיפוי השדות הייחודיים ל-TraineeUserDTO
        traineeUserDTO.setUserSchedule(trainee.getUserSchedule());
        traineeUserDTO.setHeight(trainee.getHeight());
        traineeUserDTO.setBMI(trainee.getBMI());
        traineeUserDTO.setUserFeedbacks(trainee.getUserFeedbacks());
        traineeUserDTO.setFitnessLevel(trainee.getFitnessLevel());
        System.out.println(trainee.getWeight());
        traineeUserDTO.setWeight(trainee.getWeight());
        return traineeUserDTO;
    }

    //Trainer User
    List<TrainerUserDTO> trainersToDTO(List<TrainerUser> trainers);

   default   TrainerUserDTO trainerToDTO(TrainerUser trainer) throws IOException {
       TrainerUserDTO trainerUserDTO=new TrainerUserDTO();

       UserDTO userDTO=UserToDTO(trainer);
       // העברת ערכים משדות UserDTO ל-TraineeUserDTO
       trainerUserDTO.setId(userDTO.getId());
       trainerUserDTO.setBirthdate(userDTO.getBirthdate());
       trainerUserDTO.setEmail(userDTO.getEmail());
       trainerUserDTO.setUserName(userDTO.getUserName());
       trainerUserDTO.setGender(userDTO.getGender());
       trainerUserDTO.setPassword(userDTO.getPassword());
       trainerUserDTO.setPhoneNumber(userDTO.getPhoneNumber());
       trainerUserDTO.setProfileImage(userDTO.getProfileImage());
       trainerUserDTO.setProfilPhoto(userDTO.getProfilPhoto());

       trainerUserDTO.setExperience(trainer.getExperience());
       trainerUserDTO.setBio(trainer.getBio());
       trainerUserDTO.setWorkouts(trainer.getWorkouts());


       return trainerUserDTO;


   }


   //Workout
    List<WorkoutDTO> workoutsToDTO(List<Workout>workouts);

   default WorkoutDTO workoutToDTO(Workout workout) throws IOException {
        WorkoutDTO workoutDTO=new WorkoutDTO();

        workoutDTO.setCategory(workout.getCategory());
        workoutDTO.setAppointments(workout.getAppointments());
        workoutDTO.setCity(workout.getCity());
        workoutDTO.setDescription(workout.getDescription());
        workoutDTO.setDuration(workout.getDuration());
        workoutDTO.setTrainerWorkout(workout.getTrainerWorkout());
        workoutDTO.setCurrentParticipants(workout.getCurrentParticipants());
        workoutDTO.setMaximumParticipants(workout.getMaximumParticipants());
        workoutDTO.setDayOfWeek(workout.getDayOfWeek());
        workoutDTO.setEndAge(workout.getEndAge());
        workoutDTO.setStartAge(workout.getStartAge());
        workoutDTO.setStreet(workout.getStreet());
        workoutDTO.setStartHour(workout.getStartHour());
        workoutDTO.setNumberStreet(workout.getNumberStreet());
        workoutDTO.setPhoneNumber(workout.getPhoneNumber());
        workoutDTO.setPrice(workout.getPrice());
        workoutDTO.setFeedbacks(workout.getFeedbacks());
        workoutDTO.setFitnessLevel(workout.getFitnessLevel());
        workoutDTO.setGender(workout.getGender());
        workoutDTO.setId(workout.getId());
        workoutDTO.setTargetDate(workout.getTargetDate());
        workoutDTO.setName(workout.getName());
        workoutDTO.setPicture(workout.getPicture());

       if(workout.getPicture()!=null&&!workout.getPicture().isEmpty()){
           Path file= Paths.get(DIRECTORY_URL+workout.getPicture());
           if(Files.exists(file)){
               byte [] fileBytes=Files.readAllBytes(file);
               String base64Image= Base64.getEncoder().encodeToString(fileBytes);
               workoutDTO.setWorkoutImage(base64Image);           }
       }
       else{
           workoutDTO.setWorkoutImage("");
       }


       return workoutDTO;

    }

    List<FeedbackDTO> feedbacksToDTO(List<Feedback> feedbacks);

   default FeedbackDTO feedbackToDTO(Feedback feedback) throws IOException {
       FeedbackDTO feedbackDTO=new FeedbackDTO();
       feedbackDTO.setFeedbackText(feedback.getFeedbackText());
       feedbackDTO.setWorkoutFeedback(feedback.getWorkoutFeedback());
       feedbackDTO.setDate(feedback.getDate());
       feedbackDTO.setId(feedback.getId());
       feedbackDTO.setTraineeUserFeedback(traineeToDTO(feedback.getTraineeUserFeedback()));

       return feedbackDTO;

   }



}
