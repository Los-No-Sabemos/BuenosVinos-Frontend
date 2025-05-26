import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddWineForm({ onAdd }) {
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");

  
 
  
  const [error, setError] = useState(null);

 const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!region || !country ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setError(null);
      const res = await api.post("/api/regions", {
        region,
        country,
       
      });

      if (onAdd) onAdd(res.data);

        setRegion("");
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
            value={region}
            onChange={(e) => setRegion(e.target.value)}
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