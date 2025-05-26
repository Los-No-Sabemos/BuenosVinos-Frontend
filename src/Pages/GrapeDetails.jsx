import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function GrapeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [grape, setGrape] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchGrape = async () => {
      try {
        const res = await api.get(
          `${import.meta.env.VITE_API_URL}/api/grapes/${id}`,
         
        );
        setGrape(res.data);
      } catch (err) {
        console.error("Error fetching grape details:", err);
       
      } finally {
        setLoading(false);
      }
    };

    fetchGrape();
  }, []);

   if (loading) {
    return <div className="max-w-3xl mx-auto p-6">Loading grape details...</div>;
  }



  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 text-[#800020] hover:underline"
      >
        &larr; Back to grapes
      </button>
      
      <h1 className="text-3xl font-bold">{grape.name}</h1>
      <p className="text-xl text-gray-600">{grape.description}</p>
    
    </div>
  );
}