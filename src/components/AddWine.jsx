import { useEffect, useState } from "react";
import api from "../services/api";

export default function AddWineForm({ onAdd }) {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState(10);
  const [notes, setNotes] = useState("");
  const [regionId, setRegionId] = useState("");
  const [grapeIds, setGrapeIds] = useState([]);

  const [regions, setRegions] = useState([]);
  const [grapes, setGrapes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [regionRes, grapeRes] = await Promise.all([
          api.get("/api/regions"),
          api.get("/api/grapes"),
        ]);
        setRegions(regionRes.data);
        setGrapes(grapeRes.data);
      } catch (err) {
        setError("Failed to load regions or grapes");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !year || !regionId || grapeIds.length === 0) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setError(null);

      // 1. Create the wine
      const res = await api.post("/api/wine", {
        name,
        year: Number(year),
        rating: Number(rating),
        notes,
        regionId,
        grapeIds,
      });

      const createdWine = res.data;

      // 2. Save to cellar (with separate try/catch for better error clarity)
      try {
        await api.post(`/api/wine/save/${createdWine._id}`);
      } catch (saveErr) {
        console.error(
          "Failed to save wine to cellar:",
          saveErr.response?.data || saveErr.message
        );
        setError("Wine created, but failed to save to cellar.");
        return;
      }

      // Success: notify parent and reset form
      if (onAdd) onAdd(createdWine);

      setName("");
      setYear("");
      setRating(10);
      setNotes("");
      setRegionId("");
      setGrapeIds([]);
      setError(null);
    } catch (err) {
      console.error("Failed to add wine:", err.response?.data || err.message);
      setError("Failed to add wine or save to cellar. Are you logged in?");
    }
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading form data...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#fdf7f2] border border-[#e6d3c5] p-6 rounded-2xl shadow-md max-w-2xl mx-auto space-y-5"
    >
      <h2 className="text-2xl font-serif font-bold text-[#4b2e2e]">
        Add a New Wine
      </h2>

      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">
          Wine Name*
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Year*</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          min="1900"
          max={new Date().getFullYear()}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">
          Rating (1–10)*
        </label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="10"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Region*</label>
        <select
          value={regionId}
          onChange={(e) => setRegionId(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 bg-white focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        >
          <option value="" disabled>
            Select a region
          </option>
          {regions.map((region) => (
            <option key={region._id} value={region._id}>
              {region.region} ({region.country})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Grapes*</label>
        <select
          multiple
          value={grapeIds}
          onChange={(e) =>
            setGrapeIds(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 bg-white focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        >
          {grapes.map((grape) => (
            <option key={grape._id} value={grape._id}>
              {grape.name}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Hold Ctrl or ⌘ to select multiple
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="3"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-[#764134] text-white px-6 py-2 rounded-lg hover:bg-[#5e332a] transition"
        >
          Add Wine
        </button>
      </div>
    </form>
  );
}