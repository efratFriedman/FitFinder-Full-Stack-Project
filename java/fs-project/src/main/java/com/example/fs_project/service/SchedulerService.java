package com.example.fs_project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class SchedulerService {

    @Autowired
    private WorkoutRepository workoutRepository;
    @Scheduled(cron = "0 59 23 ? * SAT", zone = "Asia/Jerusalem")
    public void initializeValues() {
       workoutRepository.resetAllParticipants();
    }
}
