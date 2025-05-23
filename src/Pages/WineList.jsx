import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import WineCard from "../components/WineCard";

export default function WineList() {
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const res = await api.get(
          `${import.meta.env.VITE_API_URL}/api/wine`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        setWines(res.data);
      } catch (err) {
        console.error("Error fetching wines:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWines();
  }, []);

  const handleDelete = async (wineId) => {
    try {
      await api.delete(
        `${import.meta.env.VITE_API_URL}/api/wine/${wineId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      setWines((prev) => prev.filter((wine) => wine._id !== wineId));
    } catch (err) {
      console.error("Error deleting wine:", err);
      alert("Failed to delete wine.");
    }
  };

  const handleEdit = (wine) => {
    navigate(`/wines/${wine._id}/edit`);
  };

  if (loading) return <p className="p-6">Loading wines...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">All Wines</h1>
      {wines.length === 0 ? (
        <p>No wines in the cellar yet</p>
      ) : (
        wines.map((wine) => (
          <WineCard
            key={wine._id}
            wine={wine}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}