import { Gender } from "./enums/Gender";

export interface TrainerUser{
    id:number,
    userName:string,
    password:string,
    email:string,
    gender:Gender,
    birthdate:Date,
    phoneNumber:string,
    profilPhoto?:string,
    profileImage?:string,
    experience:number,
    bio:string,
    user_type:string

    
}