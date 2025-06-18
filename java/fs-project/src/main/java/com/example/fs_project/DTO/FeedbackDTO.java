package com.example.fs_project.DTO;

import com.example.fs_project.model.Workout;


import java.time.LocalDate;

public class FeedbackDTO {
    private long id;
    private String feedbackText;
    private Workout workoutFeedback;
    private LocalDate date;
    private TraineeUserDTO traineeUserFeedback;

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

    public TraineeUserDTO getTraineeUserFeedback() {
        return traineeUserFeedback;
    }

    public void setTraineeUserFeedback(TraineeUserDTO traineeUserFeedback) {
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
