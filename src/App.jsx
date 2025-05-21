import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WineList from "./pages/WineList";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<WineList />} />
      </Routes>
  );
}