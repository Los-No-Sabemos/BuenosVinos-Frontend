import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import WineList from "./pages/WineList";
import AddWine from "./components/AddWine";
=======
import WineList from "../Pages/WineList";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";


>>>>>>> 715387950d3df18e11df0bd04a12eedaea8786f3

export default function App() {
  return (
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<WineList />} />
        <Route path="/add-wine" element={<AddWine />} />
=======
        <Route path="/" element={<IsPrivate><WineList /></IsPrivate>} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
          <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
>>>>>>> 715387950d3df18e11df0bd04a12eedaea8786f3
      </Routes>
  );
}