import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WineList from "./Pages/WineList";
import AddWine from "./components/AddWine";
import SignupPage from "./Pages/SignupPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import LoginPage from "./Pages/LoginPage"




export default function App() {
  return (
      <Routes>
       <Route path="/add-wine" element={<IsPrivate><AddWine /></IsPrivate>} />
        <Route path="/" element={<IsPrivate><WineList /></IsPrivate>} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
          <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
      </Routes>
  );
}