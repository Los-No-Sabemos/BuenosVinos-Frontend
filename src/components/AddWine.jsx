import { useEffect, useState } from "react";
import api from "../services/api";
import { Navigate } from "react-router-dom";

export default function AddWineForm({ onAdd }) {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState(5);
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
      const res = await api.post("/api/wine", {
        name,
        year: Number(year),
        rating: Number(rating),
        notes,
        regionId,
        grapeIds,
      });

      if (onAdd) onAdd(res.data);

      setName("");
      setYear("");
      setRating(5);
      setNotes("");
      setRegionId("");
      setGrapeIds([]);
    } catch (err) {
      setError("Failed to add wine. Are you logged in?");
    }
  };

  if (loading) return <p>Loading form data...</p>;

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Wine Name*</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Year*</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          min="1900"
          max={new Date().getFullYear()}
        />
      </div>

      <div>
        <label>Rating (1–10)*</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
          min="1"
          max="10"
        />
      </div>

      <div>
        <label>Region*</label>
        <select
          value={regionId}
          onChange={(e) => setRegionId(e.target.value)}
          required
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
        <label>Grapes*</label>
        <select
          multiple
          value={grapeIds}
          onChange={(e) =>
            setGrapeIds(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          required
        >
          {grapes.map((grape) => (
            <option key={grape._id} value={grape._id}>
              {grape.name}
            </option>
          ))}
        </select>
        <small>Hold Ctrl to select multiple</small>
      </div>

      <div>
        <label>Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="3"
        />
      </div>

      <button type="submit">Add Wine</button>
    </form>
  );
}