import { Routes, Route } from "react-router-dom";
import WineList from "./Pages/WineList";
import AddWine from "./components/AddWine";
import SignupPage from "./Pages/SignupPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import LoginPage from "./Pages/LoginPage";
import AddRegion from "./components/AddRegion";
import AddGrape from "./components/AddGrape";
<<<<<<< HEAD
=======
import GrapeList from "./Pages/GrapeList";
import GrapeDetails from "./Pages/GrapeDetails";
>>>>>>> 1e5824c685048f2aad35fa1b264c6b4ef7fb5cd8
import EditWinePage from "./Pages/EditWinePage";
import MyCellarPage from "./Pages/MyCellarPage"; 
import NavBar from "./components/NavBar";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
<<<<<<< HEAD
        <Route path="/add-wine" element={<IsPrivate><AddWine /></IsPrivate>} />
=======
       <Route path="/add-wine" element={<IsPrivate><AddWine /></IsPrivate>} />
       <Route path="/grapes" element={<IsPrivate><GrapeList /></IsPrivate>} />
>>>>>>> 1e5824c685048f2aad35fa1b264c6b4ef7fb5cd8
        <Route path="/add-region" element={<IsPrivate><AddRegion /></IsPrivate>} />
        <Route path="/add-grape" element={<IsPrivate><AddGrape /></IsPrivate>} />
        <Route path="/" element={<WineList />} />
        <Route path="/my-cellar" element={<IsPrivate><MyCellarPage /></IsPrivate>} />  
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
<<<<<<< HEAD
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path="/wines/:wineId/edit" element={<IsPrivate><EditWinePage /></IsPrivate>} />
=======
          <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
          <Route path="/wines/:wineId/edit" element={<IsPrivate><EditWinePage /></IsPrivate>} />
        <Route path="/grapes/:grapeId" element={<IsPrivate><GrapeDetails /></IsPrivate>} />
>>>>>>> 1e5824c685048f2aad35fa1b264c6b4ef7fb5cd8
      </Routes>
    </>
  );
}