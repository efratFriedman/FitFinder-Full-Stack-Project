package com.example.fs_project.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class UserSchedule {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    private Workout workout;

    @ManyToOne
    private TraineeUser traineeUser;
    private LocalDate date;

    public UserSchedule() {
    }

    public UserSchedule(LocalDate date, long id, TraineeUser traineeUser, Workout workout) {
        this.date = date;
        this.id = id;
        this.traineeUser = traineeUser;
        this.workout = workout;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public TraineeUser getTraineeUser() {
        return traineeUser;
    }

    public void setTraineeUser(TraineeUser traineeUser) {
        this.traineeUser = traineeUser;
    }

    public Workout getWorkout() {
        return workout;
    }

    public void setWorkout(Workout workout) {
        this.workout = workout;
    }
}
