package com.example.fs_project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

@Entity
public class Feedback {
    @Id
    @GeneratedValue
    private long id;

    private String feedbackText;
    private LocalDate date;

    @ManyToOne
    private Workout workoutFeedback;

    @ManyToOne
    private TraineeUser traineeUserFeedback;

    public Feedback() {
    }

    public Feedback(String feedbackText, long id, TraineeUser traineeUserFeedback, Workout workoutFeedback,LocalDate date) {
        this.feedbackText = feedbackText;
        this.id = id;
        this.traineeUserFeedback = traineeUserFeedback;
        this.workoutFeedback = workoutFeedback;
        this.date=date;
    }

    public String getFeedbackText() {
        return feedbackText;
    }

    public void setFeedbackText(String feedbackText) {
        this.feedbackText = feedbackText;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public TraineeUser getTraineeUserFeedback() {
        return traineeUserFeedback;
    }

    public void setTraineeUserFeedback(TraineeUser traineeUserFeedback) {
        this.traineeUserFeedback = traineeUserFeedback;
    }

    public Workout getWorkoutFeedback() {
        return workoutFeedback;
    }

    public void setWorkoutFeedback(Workout workoutFeedback) {
        this.workoutFeedback = workoutFeedback;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
