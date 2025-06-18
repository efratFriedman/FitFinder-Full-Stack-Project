export enum FitnessLevel {
    BEGINNER = 1,
    INTERMEDIATE = 2,
    ADVANCED = 3,
}

export const FitnessLevelDescriptions: { [key in FitnessLevel]: string } = {
    [FitnessLevel.BEGINNER]: "Suitable for new exercisers or those returning after a break.", // מתאים למתחילים
    [FitnessLevel.INTERMEDIATE]: "Designed for individuals with a good fitness foundation.", // מתאים לביניים
    [FitnessLevel.ADVANCED]: "For experienced exercisers aiming for maximum intensity.", // מתאים למתקדמים
};
