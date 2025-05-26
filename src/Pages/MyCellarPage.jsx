import { useEffect, useState } from "react";
import axios from "axios";

function MyCellarPage() {
  const [wines, setWines] = useState([]);
  const [filteredWines, setFilteredWines] = useState([]);
  const [regions, setRegions] = useState([]);
  const [filterRegion, setFilterRegion] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/wine/my-cellar`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setWines(response.data);
        setLoading(false);

        const uniqueRegions = Array.from(
          new Set(response.data.map((wine) => wine.region?.region || "Unknown"))
        );
        setRegions(uniqueRegions);
      })
      .catch((error) => {
        console.error("Error fetching your wines:", error);
        setError("Failed to load your wines.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let tempWines = [...wines];

    // Filter by region
    if (filterRegion) {
      tempWines = tempWines.filter(
        (wine) => (wine.region?.region || "Unknown") === filterRegion
      );
    }


    tempWines.sort((a, b) => {
      if (sortKey === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortKey === "year") {
        return b.year - a.year; 
      }
      if (sortKey === "rating") {
        return b.rating - a.rating; 
      }
      return 0;
    });

    setFilteredWines(tempWines);
  }, [wines, filterRegion, sortKey]);


  const handleRemove = (wineId) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/wine/${wineId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then(() => {
       
        setWines((prev) => prev.filter((wine) => wine._id !== wineId));
      })
      .catch((error) => {
        console.error("Error removing wine:", error);
        alert("Failed to remove wine from cellar.");
      });
  };

  if (loading)
    return (
      <div className="text-center text-gray-500 mt-20">Loading your cellar...</div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 mt-20">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fdf7f2] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-[#4b2e2e] mb-8 text-center">
          🍷 My Wine Cellar
        </h2>

        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <label
              htmlFor="regionFilter"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Filter by Region:
            </label>
            <select
              id="regionFilter"
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="border rounded p-2"
            >
              <option value="">All Regions</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="sortKey"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Sort by:
            </label>
            <select
              id="sortKey"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="border rounded p-2"
            >
              <option value="name">Name (A-Z)</option>
              <option value="year">Year (Newest)</option>
              <option value="rating">Rating (Highest)</option>
            </select>
          </div>
        </div>

        {filteredWines.length === 0 ? (
          <p className="text-center text-gray-600 italic">
            No wines match your selection.
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWines.map((wine) => (
              <li
                key={wine._id}
                className="bg-white rounded-xl shadow-md border border-[#e6d3c5] p-6 hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-[#4b2e2e] mb-2">
                    {wine.name}{" "}
                    <span className="text-gray-500">({wine.year})</span>
                  </h3>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Rating:</span> {wine.rating}/10
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Region:</span>{" "}
                    {wine.region?.region || "Unknown"}
                  </p>
                  {wine.notes && (
                    <p className="text-gray-600 text-sm italic mt-2">
                      "{wine.notes}"
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleRemove(wine._id)}
                  className="mt-4 self-start bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded shadow transition"
                >
                  Remove from Cellar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyCellarPage;