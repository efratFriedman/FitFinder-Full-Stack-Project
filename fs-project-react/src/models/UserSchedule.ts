import { TraineeUser } from "./TraineeUser";
import { Workout } from "./Workout";

export interface UserSchedule{
    id:number,
    workout:Workout,
    traineeUser:TraineeUser,
    date:Date,
}