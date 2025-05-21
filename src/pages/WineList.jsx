import { useEffect, useState } from "react";
import api from "../services/api";
import WineCard from "../components/WineCard";

export default function Dashboard() {
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const res = await api.get("/wine");
        setWines(res.data);
      } catch (err) {
        console.error("Error fetching wines:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWines();
  }, []);

  if (loading) return <p className="p-6">Loading wines...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">All Wines</h1>
      {wines.length === 0 ? (
        <p>No wines in the cellar yet. 🍷</p>
      ) : (
        wines.map(wine => <WineCard key={wine._id} wine={wine} />)
      )}
    </div>
  );
}