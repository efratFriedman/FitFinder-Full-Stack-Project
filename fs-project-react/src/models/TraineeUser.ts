import { FitnessLevel } from "./enums/FitnessLevel";
import { Gender } from "./enums/Gender";

export interface TraineeUser{
    id:number,
    userName:string,
    password:string,
    email:string,
    birthdate:string,
    phoneNumber:string,
    profilPhoto?:string,
    profileImage?:string,
    height:number,
    weight:number,
    bmi:number,
    fitnessLevel:FitnessLevel,
    gender:Gender,
    user_type:string
}



