import { useState } from "react";
import TrainerWorkoutsList from "./TrainerWorkoutsList";
import UpdateTrainer from "./UpdateTrainer";
import AddWorkout from "./AddWorkout";
import '../LoginAndSignUp.css'
const PersonalArea: React.FC = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
    <>
        <div style={{
            marginTop: "18vh",
            // marginLeft: "-47vw",
            marginRight: "8vw",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            flexWrap: "nowrap"
        }}>
            {/* עדכון פרטי מתאמן */}
            <UpdateTrainer></UpdateTrainer>
            {/* רשימת האימונים של אותו מאמן ופרטים */}
            <TrainerWorkoutsList></TrainerWorkoutsList>
        </div>
        <button onClick={() => { setOpenDialog(true) }} style={{ marginRight: "-57vw", marginTop: "-5vh" }}>add workout</button>
        
        {openDialog&&
        <AddWorkout 
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        ></AddWorkout>}
    
        

    </>);
}

export default PersonalArea;