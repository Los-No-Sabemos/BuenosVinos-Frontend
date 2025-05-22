import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WineList from "./pages/WineList";
import AddWine from "./components/AddWine";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<WineList />} />
        <Route path="/add-wine" element={<AddWine />} />
      </Routes>
  );
}