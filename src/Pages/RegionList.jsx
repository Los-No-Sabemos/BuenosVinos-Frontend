import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import RegionCard from "../components/RegionCard";

export default function RegionList() {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
 

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await api.get(
          `${import.meta.env.VITE_API_URL}/api/regions`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        setRegions(res.data);
      } catch (err) {
        console.error("Error fetching regions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);



  if (loading) return <p className="p-6">Loading grapes...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">All regions</h1>
      <Link 
        to="/add-region"
        className="bg-[#764134] text-white px-6 py-2 rounded-lg hover:bg-[#5e332a] transition">Add New Region</Link>
      {regions.length === 0 ? (
        <p>No regions yet</p>
      ) : (
        regions.map((region) => (
          <RegionCard
            key={region._id}
            region={region}
           
          />
        ))
      )}
    </div>
  );
}