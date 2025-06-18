//package com.example.fs_project.service;
//
//import com.example.fs_project.DTO.TraineeUserDTO;
//import com.example.fs_project.DTO.TrainerUserDTO;
//import com.example.fs_project.DTO.WorkoutDTO;
//import com.example.fs_project.model.TraineeUser;
//import com.example.fs_project.model.TrainerUser;
//import com.example.fs_project.model.Workout;
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.List;
//import javax.annotation.processing.Generated;
//import org.springframework.stereotype.Component;
//
//@Generated(
//    value = "org.mapstruct.ap.MappingProcessor",
//    date = "2024-12-03T16:34:43+0200",
//    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 22.0.1 (Oracle Corporation)"
//)
//@Component
//public class MapStructImpl implements MapStruct {
//
//    @Override
//    public List<TraineeUserDTO> traineeUsersToDTO(List<TraineeUser> traineeUsers) {
//        if ( traineeUsers == null ) {
//            return null;
//        }
//
//        List<TraineeUserDTO> list = new ArrayList<TraineeUserDTO>( traineeUsers.size() );
//        for ( TraineeUser traineeUser : traineeUsers ) {
//            try {
//                list.add( TraineeUserToDTO( traineeUser ) );
//            }
//            catch ( IOException e ) {
//                throw new RuntimeException( e );
//            }
//        }
//
//        return list;
//    }
//
//    @Override
//    public List<TrainerUserDTO> TrainerUsersToDTO(List<TrainerUser> trainerUsers) {
//        if ( trainerUsers == null ) {
//            return null;
//        }
//
//        List<TrainerUserDTO> list = new ArrayList<TrainerUserDTO>( trainerUsers.size() );
//        for ( TrainerUser trainerUser : trainerUsers ) {
//            try {
//                list.add( TrainerUserToDTO( trainerUser ) );
//            }
//            catch ( IOException e ) {
//                throw new RuntimeException( e );
//            }
//        }
//
//        return list;
//    }
//
//    @Override
//    public List<WorkoutDTO> WorkoutsToDTO(List<Workout> workouts) {
//        if ( workouts == null ) {
//            return null;
//        }
//
//        List<WorkoutDTO> list = new ArrayList<WorkoutDTO>( workouts.size() );
//        for ( Workout workout : workouts ) {
//            try {
//                list.add( workoutToDTO( workout ) );
//            }
//            catch ( IOException e ) {
//                throw new RuntimeException( e );
//            }
//        }
//
//        return list;
//    }
//}
