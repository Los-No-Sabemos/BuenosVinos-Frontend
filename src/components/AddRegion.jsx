import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddWineForm({ onAdd }) {
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [climate, setClimate] = useState("");
  const [signatureWine, setSignatureWine] = useState("");
  const [history, setHistory] = useState("");
  const [bestTimeToVisit, setBestTimeToVisit] = useState("");
  const [wineFestivals, setWineFestivals] = useState("");
  const [image, setImage] = useState("");
  const [map, setMap] = useState("");

  
 
  
  const [error, setError] = useState(null);

 const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!region || !country || !description || !climate || !signatureWine || !history || !bestTimeToVisit || !wineFestivals || !image || !map) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setError(null);
      const res = await api.post("/api/regions", {
        region,
        country,
        description,
        climate,
        signatureWine,
        history,
        bestTimeToVisit,
        wineFestivals,
        image,
        map,
       
      });

      if (onAdd) onAdd(res.data);

        setRegion("");
        setCountry("");
        setDescription("");
        setClimate("");
        setSignatureWine("");
        setHistory("");
        setBestTimeToVisit("");
        setWineFestivals("");
        setImage("");
        setMap("");
      
     
    
    } catch (err) {
      setError("Failed to add region. Are you logged in?");
    }
  };

 

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#fdf7f2] border border-[#e6d3c5] p-6 rounded-2xl shadow-md max-w-2xl mx-auto space-y-5"
    >
      <h2 className="text-2xl font-serif font-bold text-[#4b2e2e]">
        Add a New Region
      </h2>
 
      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Region Name*</label>
        <input
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>
        <div>
            <label className="block text-sm font-medium text-[#4b2e2e]">Country*</label>
            <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
            />
        </div>
      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Description*</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Climate*</label>
        <input
          type="text"
          value={climate}
          onChange={(e) => setClimate(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Signature Wine*</label>
        <input
          type="text"
          value={signatureWine}
          onChange={(e) => setSignatureWine(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">History*</label>
        <textarea
          value={history}
          onChange={(e) => setHistory(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Best Time to Visit*</label>
        <input
          type="text"
          value={bestTimeToVisit}
          onChange={(e) => setBestTimeToVisit(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Wine Festivals*</label>
        <input
          type="text"
          value={wineFestivals}
          onChange={(e) => setWineFestivals(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Image URL*</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Map Link (please insert an embeded link)*</label>
        <input
          type="text"
          value={map}
          onChange={(e) => setMap(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>
       
       <div className="text-right">
        <button
          type="submit"
          className="bg-[#764134] text-white px-6 py-2 rounded-lg hover:bg-[#5e332a] transition"
        >
          Add Region
        </button>
      </div>
    </form>
  );
}