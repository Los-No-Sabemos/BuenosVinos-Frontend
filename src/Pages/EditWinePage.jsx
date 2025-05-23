import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/auth.context";

export default function EditWinePage() {
  const { wineId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [wineData, setWineData] = useState({
    name: "",
    year: "",
    rating: "",
    notes: "",
  });

  const [loading, setLoading] = useState(true);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    // Fetch wine data by id
    api
      .get(`${import.meta.env.VITE_API_URL}/api/wine/${wineId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        
        if (res.data.userId !== user?._id) {
          alert("You are not authorized to edit this wine.");
          navigate("/");
          return;
        }

        setWineData({
          name: res.data.name,
          year: res.data.year,
          rating: res.data.rating,
          notes: res.data.notes,
        });
      })
      .catch((err) => {
        console.error("Error loading wine :", err);
        alert("Failed to load wine ");
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [wineId, navigate, storedToken, user?._id]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWineData((prev) => ({ ...prev, [name]: value }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        `${import.meta.env.VITE_API_URL}/api/wine/${wineId}`,
        {
          ...wineData,
          year: Number(wineData.year),
          rating: Number(wineData.rating),
        },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      alert("Wine updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error updating wine:", err);
      alert("Failed to update wine.");
    }
  };

  if (loading) return <p className="p-6">Loading wine data...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Wine</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Name:
          <input
            type="text"
            name="name"
            value={wineData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block">
          Year:
          <input
            type="number"
            name="year"
            value={wineData.year}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block">
          Rating (1-10):
          <input
            type="number"
            name="rating"
            value={wineData.rating}
            min="1"
            max="10"
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block">
          Notes:
          <textarea
            name="notes"
            value={wineData.notes}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            rows={4}
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}