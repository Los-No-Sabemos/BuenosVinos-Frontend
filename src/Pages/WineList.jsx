import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import WineCard from "../components/WineCard";
import Footer from "../components/Footer";

export default function WineList() {
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const res = await api.get(`${import.meta.env.VITE_API_URL}/api/wine`);
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

  const handleSaveToCellar = async (wineId) => {
    try {
      await api.post(
        `${import.meta.env.VITE_API_URL}/api/wine/save/${wineId}`,
        null,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      alert("Wine saved to your cellar!");
    } catch (err) {
      console.error("Error saving wine:", err);
      alert("Could not save wine.");
    }
  };

  if (loading)
    return (
      <p className="p-6 text-center italic text-[#a78a7f]" style={{ fontFamily: "'Merriweather', serif" }}>
        Loading wines...
      </p>
    );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#fdf7f2] rounded-xl shadow-inner">
        <h1
          className="text-3xl sm:text-4xl font-bold text-center mb-6 text-[#4b2e2e]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          All Wines
        </h1>

        {wines.length === 0 ? (
          <p
            className="text-center text-gray-600"
            style={{ fontFamily: "'Merriweather', serif" }}
          >
            No wines in the cellar yet
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wines.map((wine) => (
              <WineCard
                key={wine._id}
                wine={wine}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSave={handleSaveToCellar}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}