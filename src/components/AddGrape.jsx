import { useState } from "react";
import api from "../services/api";


export default function AddGrapeForm({ onAdd }) {

 const [grapeName, setGrapeName] = useState("");
 const [description , setDescription] = useState("");
 const [error, setError] = useState(null);

 const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!grapeName || !description) {
      setError("Please fill all required fields");
      return;
    }
    
    try {
      setError(null);
      const res = await api.post("/api/grapes", {
         grapeName,
         description,
      });
    
      if (onAdd) onAdd(res.data);
    
      setGrapeName("");
      setDescription("");
    
    } catch (err) {
      setError("Failed to add grape. Are you logged in?");
    }
     }
    
      return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Grape Name*</label>
        <input
            type="text"
            value={grapeName}
            onChange={(e) => setGrapeName(e.target.value)}
            required
        />
      </div>
        <div>
            <label>Description*</label>
            <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            />
        </div>
       
      <button type="submit">Add Grape</button>
    </form>
  );
}

