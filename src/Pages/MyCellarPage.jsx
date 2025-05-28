import { useEffect, useState } from "react";
import api from "../services/api";

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
      })
      .catch((err) => {
        console.error("Error deleting wine:", err);
        alert("Failed to remove wine.");
      });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">My Wine Cellar</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Filter by Region:
        </label>
        <select
          className="p-2 border border-gray-300 rounded w-full"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredWines.map((wine) => (
          <div
            key={wine._id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-200 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{wine.name}</h2>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Region:</span>{" "}
                {wine.regionId?.region || "Unknown"}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Grapes:</span>{" "}
                {wine.grapeIds?.map((grape) => grape.name).join(", ") || "N/A"}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Year:</span> {wine.year}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Rating:</span> {wine.rating}/10
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Notes:</span> {wine.notes}
              </p>
            </div>

            <button
              onClick={() => handleRemove(wine._id)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded shadow self-start"
            >
              Remove from Cellar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}