import { useState } from "react";
import api from "../services/api";


export default function AddGrapeForm({ onAdd }) {

 const [name, setName] = useState("");
 const [description , setDescription] = useState("");
 const [error, setError] = useState(null);

 const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !description) {
      setError("Please fill all required fields");
      return;
    }
    
    try {
      setError(null);
      const res = await api.post("/api/grapes", {
         name,
         description,
      });
    
      if (onAdd) onAdd(res.data);
    
      setName("");
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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

