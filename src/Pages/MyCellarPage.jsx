import { useEffect, useState } from "react";
import api from "../services/api";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function MyCellarPage() {
  const [wines, setWines] = useState([]);
  const [filteredRegion, setFilteredRegion] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/api/wine/my-cellar")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const validWines = response.data.filter(
            (wine) => wine && wine.regionId
          );
          setWines(validWines);
        } else {
          console.error("Unexpected response:", response.data);
          setError("Unexpected server response.");
        }
      })
      .catch((err) => {
        console.error("Error fetching your wines:", err);
        setError("Could not load your wine cellar.");
      });
  }, []);

  const uniqueRegions = Array.from(
    new Set(
      wines.map((wine) =>
        wine?.regionId?.region ? wine.regionId.region : "Unknown"
      )
    )
  );

  const filteredWines = filteredRegion
    ? wines.filter((wine) => wine.regionId?.region === filteredRegion)
    : wines;

  const handleRemove = (wineId) => {
    api
      .delete(`/api/wine/${wineId}`)
      .then(() => {
        setWines((prevWines) => prevWines.filter((wine) => wine._id !== wineId));
        alert("Wine removed from cellar.");
      })
      .catch((err) => {
        console.error("Error deleting wine:", err);
        alert("Failed to remove wine.");
      });
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-6xl mx-auto font-serif">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-8 text-center text-[#4b2e2e] tracking-wide">
        My Wine Cellar
      </h1>

      {error && (
        <p className="text-red-600 text-center mb-4">{error}</p>
      )}

      <div className="mb-8">
        <label className="block mb-2 text-lg font-medium text-[#5a3d31]">
          Filter by Region:
        </label>
        <select
          className="p-3 border border-[#ccb7a1] bg-[#fdf8f4] text-[#4b2e2e] rounded-lg w-full focus:ring-[#9a6c4a] focus:border-[#9a6c4a]"
          value={filteredRegion}
          onChange={(e) => setFilteredRegion(e.target.value)}
        >
          <option value="">All Regions</option>
          {uniqueRegions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      {filteredWines.length === 0 ? (
        <p className="text-center text-gray-600 italic">
          No wines to display.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWines.map((wine) => {
            const imageUrl = wine.image ? `${baseURL}${wine.image}` : null;

            return (
              <div
                key={wine._id}
                className="bg-[#fffaf5] border border-[#e6d3c5] p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={wine.name}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                )}

                <div>
                  <h2 className="text-xl font-semibold mb-2 text-[#5a3d31]">
                    {wine.name}
                  </h2>
                  <p className="text-[#4b2e2e] mb-1">
                    <span className="font-medium">Region:</span>{" "}
                    {wine.regionId?.region || "Unknown"}
                  </p>
                  <p className="text-[#4b2e2e] mb-1">
                    <span className="font-medium">Grapes:</span>{" "}
                    {wine.grapeIds?.map((grape) => grape.name).join(", ") || "N/A"}
                  </p>
                  <p className="text-[#4b2e2e] mb-1">
                    <span className="font-medium">Year:</span> {wine.year}
                  </p>
                  <p className="text-[#4b2e2e] mb-1">
                    <span className="font-medium">Rating:</span> {wine.rating}/10
                  </p>
                  <p className="text-[#4b2e2e]">
                    <span className="font-medium">Notes:</span> {wine.notes}
                  </p>
                </div>

                <button
                  onClick={() => handleRemove(wine._id)}
                  className="mt-4 bg-[#b03a2e] hover:bg-[#922d23] text-white py-2 px-4 rounded-lg shadow-md transition duration-200 self-start"
                >
                  Remove from Cellar
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}