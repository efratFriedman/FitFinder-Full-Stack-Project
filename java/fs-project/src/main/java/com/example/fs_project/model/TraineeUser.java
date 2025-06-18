package com.example.fs_project.model;


import com.example.fs_project.enums.FitnessLevel;
import com.example.fs_project.enums.Gender;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@DiscriminatorValue("trainee")

public class TraineeUser extends User {
    @Id
    @GeneratedValue
    private long id;

     private double height;
     private double weight;
     private double bmi;
     @Enumerated
     private FitnessLevel fitnessLevel;//רמה של המתאמן


     @JsonIgnore
     @OneToMany(mappedBy = "traineeUserFeedback")
     private List<Feedback> userFeedbacks;

     @JsonIgnore
     @OneToMany(mappedBy = "traineeUser")
     private List<UserSchedule> userSchedule;

    public TraineeUser() {
        super();
    }

    public TraineeUser(LocalDate birthdate, String email, String password, String phoneNumber, String profilPhoto, String userName, double bmi, double height, long id, double weight, FitnessLevel fitnessLevel, Gender gender) {
        super(birthdate, email, password, phoneNumber, profilPhoto, userName,gender);
        this.bmi = bmi;
        this.height = height;
        this.id = id;
        this.weight = weight;
        this.fitnessLevel = fitnessLevel;

    }

    public double getBMI() {
        return bmi;
    }

    public void setBMI() {
        if (this.height > 0 && this.weight > 0) {
            this.bmi = this.weight / (this.height * this.height);
            this.bmi = Double.parseDouble(String.format("%.2f", this.bmi));
        } else {
            this.bmi = 0;
        }
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public FitnessLevel getFitnessLevel() {
        return fitnessLevel;
    }

    public void setFitnessLevel(FitnessLevel fitnessLevel) {
        this.fitnessLevel = fitnessLevel;
    }



    public List<Feedback> getUserFeedbacks() {
        return userFeedbacks;
    }

    public void setUserFeedbacks(List<Feedback> user_feedbacks) {
        this.userFeedbacks = user_feedbacks;
    }

    public List<UserSchedule> getUserSchedule() {
        return userSchedule;
    }

    public void setUserSchedule(List<UserSchedule> user_schedule) {
        this.userSchedule = user_schedule;
    }

}
