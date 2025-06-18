import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/API";
import { fetchFeedbacks } from "./feedbacks";
import { Feedback } from "../../models/Feedback";
import { Box, Typography, Avatar } from "@mui/material";

type FeedbacksProps = {
  workoutId: number;
};

const FeedBacksWorkout = ({ workoutId }: FeedbacksProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const feedBacks = useSelector((state: RootState) => state.feedback.feedbacks);

  const feedbacksByWorkoutId = feedBacks.filter(
    (f) => f.workoutFeedback.id === workoutId
  );





  useEffect(() => {
    if (feedBacks.length == 0) {
      dispatch(fetchFeedbacks());
    }
  }, [dispatch]);



  return (
    <>
      {feedbacksByWorkoutId.length === 0 && (
        <h1>no feedBacks!</h1>
      )}

      {feedbacksByWorkoutId.length > 0 &&
        feedbacksByWorkoutId.map((f: Feedback) => {

          return (
            <>
              <Box
                key={f.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: 2,
                  marginBottom: 2,
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Avatar
                  src={`data:image;base64,${f.traineeUserFeedback.profileImage}`}

                  alt={f.traineeUserFeedback.userName}
                  sx={{ marginRight: 2, width: 48, height: 48 }}
                />
                <Box>
                  <Typography variant="body2" color="textSecondary" sx={{ textAlign: "left" }}>
                    <strong>{f.traineeUserFeedback.userName}</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    {f.feedbackText}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1, textAlign: "left" }}>
                    {f.date}
                  </Typography>
                </Box>
              </Box>

            </>
          );
        })}
    </>
  );
};

export default FeedBacksWorkout;
