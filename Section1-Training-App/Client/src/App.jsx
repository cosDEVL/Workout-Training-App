import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";
// import CreateWorkout from "./pages/ManageWorkout";
import ManageWorkout from "./pages/ManageWorkout";
import WorkoutList from "./pages/WorkoutList";
import WorkoutDetails from "./pages/WorkoutDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route
          path="/create-workout"
          element={<CreateWorkout editMode={true} />}
        /> */}
        <Route path="/create-workout" element={<ManageWorkout />} />
        <Route
          path="/edit-workout/:workoutID"
          element={<ManageWorkout editMode={true} />}
        />
        <Route path="/workout-list" element={<WorkoutList />} />
        <Route path="/workout/:workoutID" element={<WorkoutDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
