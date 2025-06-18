package com.example.fs_project.model;

import com.example.fs_project.enums.FitnessLevel;
import com.example.fs_project.enums.Gender;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
@Entity
public class Workout {
    @Id
    @GeneratedValue
    private long id;

    private String name;
    private String description;
    private double price;
    private String phoneNumber;
    private String city;
    private String street;
    private int numberStreet;
    private int startAge;
    private int endAge;
    private int maximumParticipants;
    private int currentParticipants;
    private DayOfWeek dayOfWeek;
    private LocalDate targetDate;
    private LocalTime startHour;
    private int duration;
    @Enumerated
    private FitnessLevel fitnessLevel;
    @Enumerated
    private Gender gender;
    private String picture;

    @ManyToOne
    private Category category;

    @JsonIgnore
    @OneToMany(mappedBy = "workoutFeedback")
    private List<Feedback> feedbacks;

    @JsonIgnore
    @OneToMany(mappedBy = "workout")
    private  List<UserSchedule> appointments;

    @ManyToOne
    private TrainerUser trainerWorkout;



    public Workout() {
    }

    public Workout(List<UserSchedule> appointments, Category category, String city, int currentParticipants, DayOfWeek dayOfWeek, String description, int duration, int endAge, List<Feedback> feedbacks, FitnessLevel fitnessLevel, Gender gender, long id, int maximumParticipants, String name, int numberStreet, String phoneNumber, String picture, double price, int startAge, LocalTime startHour, String street, LocalDate targetDate, TrainerUser trainerWorkout) {
        this.appointments = appointments;
        this.category = category;
        this.city = city;
        this.currentParticipants = currentParticipants;
        this.dayOfWeek = dayOfWeek;
        this.description = description;
        this.duration = duration;
        this.endAge = endAge;
        this.feedbacks = feedbacks;
        this.fitnessLevel = fitnessLevel;
        this.gender = gender;
        this.id = id;
        this.maximumParticipants = maximumParticipants;
        this.name = name;
        this.numberStreet = numberStreet;
        this.phoneNumber = phoneNumber;
        this.picture = picture;
        this.price = price;
        this.startAge = startAge;
        this.startHour = startHour;
        this.street = street;
        this.targetDate = targetDate;
        this.trainerWorkout = trainerWorkout;
    }

    public List<UserSchedule> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<UserSchedule> appointments) {
        this.appointments = appointments;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getCurrentParticipants() {
        return currentParticipants;
    }

    public void setCurrentParticipants(int currentParticipants) {
        this.currentParticipants = currentParticipants;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getEndAge() {
        return endAge;
    }

    public void setEndAge(int endAge) {
        this.endAge = endAge;
    }

    public List<Feedback> getFeedbacks() {
        return feedbacks;
    }

    public void setFeedbacks(List<Feedback> feedbacks) {
        this.feedbacks = feedbacks;
    }

    public FitnessLevel getFitnessLevel() {
        return fitnessLevel;
    }

    public void setFitnessLevel(FitnessLevel fitnessLevel) {
        this.fitnessLevel = fitnessLevel;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getMaximumParticipants() {
        return maximumParticipants;
    }

    public void setMaximumParticipants(int maximumParticipants) {
        this.maximumParticipants = maximumParticipants;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNumberStreet() {
        return numberStreet;
    }

    public void setNumberStreet(int numberStreet) {
        this.numberStreet = numberStreet;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStartAge() {
        return startAge;
    }

    public void setStartAge(int startAge) {
        this.startAge = startAge;
    }

    public LocalTime getStartHour() {
        return startHour;
    }

    public void setStartHour(LocalTime startHour) {
        this.startHour = startHour;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public LocalDate getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(LocalDate targetDate) {
        this.targetDate = targetDate;
    }

    public TrainerUser getTrainerWorkout() {
        return trainerWorkout;
    }

    public void setTrainerWorkout(TrainerUser trainerWorkout) {
        this.trainerWorkout = trainerWorkout;
    }
}