package com.example.fs_project.enums;

public enum FitnessLevel {
    BEGINNER(1, "Suitable for new exercisers or those returning after a break."),//מתחילים
    INTERMEDIATE(2, "Designed for individuals with a good fitness foundation."),//ביניים
    ADVANCED(3, "For experienced exercisers aiming for maximum intensity.");//מתקדמים

    private final int difficulty;
    private final String description;

    // Constructor
    FitnessLevel(int difficulty, String description) {
        this.difficulty = difficulty;
        this.description = description;
    }

    // Getters
    public int getDifficulty() {
        return difficulty;
    }

    public String getDescription() {
        return description;
    }
}
