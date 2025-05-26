import { useEffect, useState } from "react";

import api from "../services/api";
import GrapeCard from "../components/GrapeCard";

export default function GrapeList() {
  const [grapes, setGrapes] = useState([]);
  const [loading, setLoading] = useState(true);
 

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchGrapes = async () => {
      try {
        const res = await api.get(
          `${import.meta.env.VITE_API_URL}/api/grapes`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        setGrapes(res.data);
      } catch (err) {
        console.error("Error fetching grapes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrapes();
  }, []);



  if (loading) return <p className="p-6">Loading grapes...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">All grapes</h1>
      {grapes.length === 0 ? (
        <p>No grapes in the cellar yet</p>
      ) : (
        grapes.map((grape) => (
          <GrapeCard
            key={grape._id}
            grape={grape}
           
          />
        ))
      )}
    </div>
  );
}