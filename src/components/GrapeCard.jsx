import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import GrapeList from "../Pages/GrapeList";
import api from "../services/api";

export default function GrapeCard({ grape}) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleCardClick = () => {
    if (grape?._id) {
      navigate(`/grapes/${grape._id}`);
    }
  };

  return (
    <div 
      className="bg-[#fdfaf6] border border-[#e2d6c5] rounded-xl shadow-md p-6 space-y-2 cursor-pointer hover:shadow-lg transition"
      onClick={handleCardClick}
    >
      <h2 className="text-2xl font-serif text-[#800020] font-semibold">
        {grape.name} <span className="text-gray-600 text-lg">({grape.description})</span>
      </h2>
    </div>
  );
}