import { Routes, Route } from "react-router-dom";
import WineList from "./Pages/WineList";
import AddWine from "./components/AddWine";
import SignupPage from "./Pages/SignupPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import LoginPage from "./Pages/LoginPage"
import AddRegion from "./components/AddRegion";
import AddGrape from "./components/AddGrape";

import EditWinePage from "./Pages/EditWinePage";
import NavBar from "./components/NavBar";



export default function App() {
  return (
    <>
       <NavBar />
      <Routes>
       <Route path="/add-wine" element={<IsPrivate><AddWine /></IsPrivate>} />
        <Route path="/add-region" element={<IsPrivate><AddRegion /></IsPrivate>} />
        <Route path="/add-grape" element={<IsPrivate><AddGrape /></IsPrivate>} />
        <Route path="/" element={<IsPrivate><WineList /></IsPrivate>} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
          <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
          <Route path="/wines/:wineId/edit" element={<IsPrivate><EditWinePage /></IsPrivate>} />
      </Routes>
      </>
  );
}