import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddWineForm({ onAdd }) {
  const [regionName, setRegionName] = useState("");
  const [country, setCountry] = useState("");

  
 
  
  const [error, setError] = useState(null);

 const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!regionName || !country ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setError(null);
      const res = await api.post("/regions", {
        regionName,
        country,
       
      });

      if (onAdd) onAdd(res.data);

        setRegionName("");
        setCountry("");
      
     
    
    } catch (err) {
      setError("Failed to add region. Are you logged in?");
    }
  };

 

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Region Name*</label>
        <input
            type="text"
            value={regionName}
            onChange={(e) => setRegionName(e.target.value)}
            required
        />
      </div>
        <div>
            <label>Country*</label>
            <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            />
        </div>
       
      <button type="submit">Add Region</button>
    </form>
  );
}