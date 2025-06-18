package com.example.fs_project.controller;


import com.example.fs_project.model.UserSchedule;
import com.example.fs_project.service.UserScheduleRepository;
import com.example.fs_project.service.WorkoutRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/userSchedule")
public class UserScheduleController {
    private UserScheduleRepository userScheduleRepository;
    private WorkoutRepository workoutRepository;
    public UserScheduleController(UserScheduleRepository userScheduleRepository,WorkoutRepository workoutRepository) {
        this.userScheduleRepository = userScheduleRepository;
        this.workoutRepository=workoutRepository;
    }

    @GetMapping("/getUserSchedules")
    public ResponseEntity<List<UserSchedule>> getAllUserSchedules() {
        try{
        return new ResponseEntity(userScheduleRepository.findAll(), HttpStatus.OK);}
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/getUserScheduleByTraineeId/{id}")
    public ResponseEntity<UserSchedule> getUserScheduleByTraineeId(@PathVariable("id") Long tId) {
        try{
        List<UserSchedule> trainees = userScheduleRepository.findByUserId(tId);
        return new ResponseEntity(trainees, HttpStatus.OK);}
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/addUserSchedule")
    public ResponseEntity<UserSchedule> addUserSchedule(@RequestBody UserSchedule u) {
        try{
        u.getWorkout().setCurrentParticipants(u.getWorkout().getCurrentParticipants() + 1);
        workoutRepository.save(u.getWorkout());

        UserSchedule newUserSchedule = userScheduleRepository.save(u);
        System.out.println(newUserSchedule.getWorkout().getCurrentParticipants());
        return new ResponseEntity<>(newUserSchedule, HttpStatus.CREATED);}
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/deleteUserSchedule/{id}")
    public ResponseEntity deleteUserSchedule(@PathVariable long id) {
        try{
        UserSchedule u = userScheduleRepository.findById(id).orElse(null);
        if (u == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        u.getWorkout().setCurrentParticipants(u.getWorkout().getCurrentParticipants() - 1);
        userScheduleRepository.delete(u);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);}
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
