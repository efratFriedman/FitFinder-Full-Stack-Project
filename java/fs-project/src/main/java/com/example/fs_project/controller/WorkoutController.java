package com.example.fs_project.controller;


import com.example.fs_project.DTO.WorkoutDTO;
import com.example.fs_project.enums.Gender;
import com.example.fs_project.model.TraineeUser;
import com.example.fs_project.model.Workout;
import com.example.fs_project.service.MapStruct;
import com.example.fs_project.service.WorkoutRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/workout")
public class WorkoutController {
    private WorkoutRepository workoutRepository;
    private MapStruct mapper;

    private static String DIRECTORY_URL = System.getProperty("user.dir") + "\\images\\";

    public WorkoutController(WorkoutRepository workoutRepository, MapStruct mapper) {
        this.workoutRepository = workoutRepository;
        this.mapper = mapper;
    }

    @GetMapping("/getWorkouts")
    public ResponseEntity<List<WorkoutDTO>> getAllWorkouts() {
        try{
        return new ResponseEntity(mapper.workoutsToDTO(workoutRepository.findAll()), HttpStatus.OK);}
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getWorkoutsByGender")
    public ResponseEntity<List<WorkoutDTO>> getAllWorkoutsByGender(@RequestBody Gender gender) {
        try{
        return new ResponseEntity(mapper.workoutsToDTO(workoutRepository.findAllByGender(gender)), HttpStatus.OK);}
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/getCustomizedWorkouts")
    public ResponseEntity<List<WorkoutDTO>> getAllCustomizedWorkouts(@RequestBody TraineeUser traineeUser) {
        try{
        LocalDate currentDate = LocalDate.now();
        Period period = Period.between(traineeUser.getBirthdate(), currentDate);
        int userAge = period.getYears();

        if (period.getMonths() < 0 || (period.getMonths() == 0 && period.getDays() < 0)) {
            userAge -= 1;
        }


        System.out.println(traineeUser.getGender());
        List<Workout> workouts = workoutRepository.findSuitableWorkouts(userAge, traineeUser.getFitnessLevel(), traineeUser.getGender());
        return new ResponseEntity<>(mapper.workoutsToDTO(workouts), HttpStatus.OK);}
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/getWorkoutById/{id}")
    public ResponseEntity<WorkoutDTO> getWorkoutById(@PathVariable long id) throws IOException {
        try{
        Workout w = workoutRepository.findById(id).orElse(null);
        if (w == null) {
            return new ResponseEntity(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(mapper.workoutToDTO(w), HttpStatus.OK);}
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/addWorkout")
    public ResponseEntity<Workout> addWorkout(@RequestBody Workout w) {
        try{
        Workout newWorkout = workoutRepository.save(w);
        return new ResponseEntity(newWorkout, HttpStatus.CREATED);}
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping("/uploadWorkout")
    public ResponseEntity<WorkoutDTO> uploadTraineeUserWithImg(@RequestPart("workout") String workoutJSON,
                                                               @RequestPart("image") MultipartFile file) throws IOException {
        try{
        System.out.println(workoutJSON);
        System.out.println(file);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        Workout workout = objectMapper.readValue(workoutJSON, Workout.class);
        String imageUrl = DIRECTORY_URL + file.getOriginalFilename();
        Path filePath = Paths.get(imageUrl);
        Files.write(filePath, file.getBytes());
        workout.setPicture(file.getOriginalFilename());
        Workout newWorkout = workoutRepository.save(workout);
        return new ResponseEntity<>(mapper.workoutToDTO(newWorkout), HttpStatus.CREATED);}
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
