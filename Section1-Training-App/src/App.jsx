import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";
import CreateWorkout from "./pages/CreateWorkout";
import WorkoutList from "./pages/WorkoutList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-workout" element={<CreateWorkout />} />
        <Route path="/workout-list" element={<WorkoutList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
