import { TraineeUser } from "./TraineeUser";
import { Workout } from "./Workout";

export interface Feedback{
    id:number,
    workoutFeedback:Workout,
    traineeUserFeedback:TraineeUser
    feedbackText:string,
    date:string
}