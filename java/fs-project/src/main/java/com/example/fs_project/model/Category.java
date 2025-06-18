package com.example.fs_project.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Category {

  @Id
  @GeneratedValue
  private long id;
  private String categoryName;
  private String description;

  @JsonIgnore
  @OneToMany(mappedBy = "category")
  private List<Workout> workouts;
  public Category() {}




  public Category(String categoryName, String description, long id, List<Workout> workouts) {
    this.categoryName = categoryName;
    this.description = description;
    this.id = id;
    this.workouts = workouts;
  }

  public String getCategoryName() {
    return categoryName;
  }

  public void setCategoryName(String categoryName) {
    this.categoryName = categoryName;
  }




  public List<Workout> getWorkouts() {
    return workouts;
  }

  public void setWorkouts(List<Workout> workouts) {
    this.workouts = workouts;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }
}
