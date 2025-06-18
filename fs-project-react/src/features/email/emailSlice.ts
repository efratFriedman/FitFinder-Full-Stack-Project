import { EmailDetails } from "../../models/EmailDetails";
import { sendEmail} from "../../services/EmailSend";
import { TraineeUser } from "../../models/TraineeUser";
import { UserSchedule } from "../../models/UserSchedule";

export const SendEmailForUser = async ({ trainee, app }: { trainee: TraineeUser, app: UserSchedule }) => {
    try {
        const emailContain: EmailDetails = {
            recipient: trainee.email,
            msgBody: `
            Hello ${trainee.userName},
            
            Your training session has been successfully scheduled!
            
            Details of your session:
            - Trainer: ${app.workout?.trainerWorkout?.userName}
            - Training Type: ${app.workout.category.categoryName}
            - Date: ${new Date(app.date).toLocaleDateString()}
            - Time: ${app.workout.startHour}
            - Location: ${app.workout.city}, ${app.workout.street} ${app.workout.numberStreet}
            - Contact Number: ${app.workout.phoneNumber}
            
            For more details, please visit our website.

            Thank you,  
            FitFinder Team
        `,
        subject: `Training Session Confirmation`
        }
        const ans = await sendEmail(emailContain)
        
        return ans;
    }
    catch (error) {
        throw (error);
    }
}
   



