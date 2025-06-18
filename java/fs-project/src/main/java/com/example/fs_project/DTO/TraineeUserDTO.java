package com.example.fs_project.DTO;

import com.example.fs_project.enums.FitnessLevel;
import com.example.fs_project.enums.Gender;
import com.example.fs_project.model.Feedback;
import com.example.fs_project.model.UserSchedule;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;

import java.time.LocalDate;
import java.util.List;

public class TraineeUserDTO extends  UserDTO{

    private long id;
    private double height;
    private double weight;
    private double BMI;
    private FitnessLevel fitnessLevel;
    private List<Feedback> userFeedbacks;
    private List<UserSchedule> userSchedule;

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public List<UserSchedule> getUserSchedule() {
        return userSchedule;
    }

    public void setUserSchedule(List<UserSchedule> userSchedule) {
        this.userSchedule = userSchedule;
    }

    public List<Feedback> getUserFeedbacks() {
        return userFeedbacks;
    }

    public void setUserFeedbacks(List<Feedback> userFeedbacks) {
        this.userFeedbacks = userFeedbacks;
    }

    @Override
    public long getId() {
        return id;
    }

    @Override
    public void setId(long id) {
        this.id = id;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public FitnessLevel getFitnessLevel() {
        return fitnessLevel;
    }

    public void setFitnessLevel(FitnessLevel fitnessLevel) {
        this.fitnessLevel = fitnessLevel;
    }

    public double getBMI() {
        return BMI;
    }

    public void setBMI(double BMI) {
        this.BMI = BMI;
    }
}
