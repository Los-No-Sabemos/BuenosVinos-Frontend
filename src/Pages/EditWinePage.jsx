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
    image: "", // existing image path
    userId: "", // for auth check
  });

  const [newImage, setNewImage] = useState(null); // new image file
  const [previewUrl, setPreviewUrl] = useState(null); // local preview
  const [loading, setLoading] = useState(true);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    api
      .get(`/api/wine/${wineId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        const wine = res.data;
        if (wine.userId !== user?._id) {
          alert("You are not authorized to edit this wine.");
          navigate("/");
          return;
        }

        setWineData({
          name: wine.name,
          year: wine.year,
          rating: wine.rating,
          notes: wine.notes,
          image: wine.image || "",
          userId: wine.userId,
        });
      })
      .catch((err) => {
        console.error("Error loading wine:", err);
        alert("Failed to load wine");
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [wineId, navigate, storedToken, user?._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWineData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", wineData.name);
      formData.append("year", wineData.year);
      formData.append("rating", wineData.rating);
      formData.append("notes", wineData.notes);
      if (newImage) {
        formData.append("image", newImage);
      }

      await api.put(`/api/wine/${wineId}`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Wine updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error updating wine:", err);
      alert("Failed to update wine.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-8">Loading wine data...</p>;
  }

  const existingImageUrl = wineData.image
    ? `${import.meta.env.VITE_API_URL}${wineData.image}`
    : null;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#fdf7f2] border border-[#e6d3c5] rounded-2xl shadow-md">
      <h1 className="text-3xl font-serif font-bold text-[#4b2e2e] mb-6">
        Edit Wine
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-[#4b2e2e] mb-1">Name*</label>
          <input
            type="text"
            name="name"
            value={wineData.name}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#4b2e2e] mb-1">Year*</label>
          <input
            type="number"
            name="year"
            value={wineData.year}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#4b2e2e] mb-1">Rating (1–10)*</label>
          <input
            type="number"
            name="rating"
            value={wineData.rating}
            onChange={handleChange}
            min="1"
            max="10"
            required
            className="w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#4b2e2e] mb-1">Notes</label>
          <textarea
            name="notes"
            value={wineData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-md border border-gray-300 shadow-sm p-2"
          />
        </div>

        {previewUrl ? (
          <div>
            <p className="text-[#4b2e2e] font-medium mb-1">New Image Preview:</p>
            <img src={previewUrl} alt="Preview" className="w-40 h-auto rounded mb-2" />
          </div>
        ) : existingImageUrl ? (
          <div>
            <p className="text-[#4b2e2e] font-medium mb-1">Current Image:</p>
            <img src={existingImageUrl} alt="Wine" className="w-40 h-auto rounded mb-2" />
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No image uploaded yet.</p>
        )}

        <div>
          <label className="block text-sm font-medium text-[#4b2e2e] mb-1">
            Upload New Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-[#764134] text-white px-6 py-2 rounded-lg hover:bg-[#5e332a] transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}