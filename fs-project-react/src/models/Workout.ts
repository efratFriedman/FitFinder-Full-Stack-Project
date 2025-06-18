import { Category } from "./Category";
import { FitnessLevel } from "./enums/FitnessLevel";
import { Gender } from "./enums/Gender";
import { TrainerUser } from "./TrainerUser";

export interface Workout{
    id:number,
    name:String,
    description:String,
    trainerWorkout:TrainerUser
    price:number,
    phoneNumber:string,
    city:string,
    street:string,
    numberStreet:number,
    startAge:number,
    endAge:number,
    maximumParticipants:number,
    currentParticipants:number,
    dayOfWeek:string,
    targetDate:Date,
    startHour:string,
    duration:number,
    fitnessLevel:FitnessLevel,
    gender:Gender,
    picture?:string,
    workoutImage?:string,
    category:Category  
}