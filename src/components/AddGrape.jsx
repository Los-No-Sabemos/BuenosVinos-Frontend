import { useState } from "react";
import api from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate} from "react-router-dom";


export default function AddGrapeForm({ onAdd }) {

 const [name, setName] = useState("");
 const [description , setDescription] = useState("");
  const [origin, setOrigin] = useState("");
  const [yearFirstCultivated, setYearFirstCultivated] = useState("");
  const [color, setColor] = useState("");
  const [acidity, setAcidity] = useState("");
  const [flavorProfile, setFlavorProfile] = useState("");
  const [aroma, setAroma] = useState("");
  const [foodPairing, setFoodPairing] = useState("");
  const [popularWines, setPopularWines] = useState("");
  const [servingTemperature, setServingTemperature] = useState("");
  const [imageGrape, setImageGrape] = useState("");
  const [imageWineGlass, setImageWineGlass] = useState("");
 const [error, setError] = useState(null);

 const navigate = useNavigate();

 const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !description || !origin || !yearFirstCultivated || !color || !acidity || !flavorProfile || !aroma || !foodPairing || !popularWines || !servingTemperature || !imageGrape || !imageWineGlass) {
      setError("Please fill all required fields");
      return;
    }
    
    try {
      setError(null);
      const res = await api.post("/api/grapes", {
        name,
        description,
        origin,
        yearFirstCultivated,
        color,
        acidity,
        flavorProfile,
        aroma,
        foodPairing,
        popularWines,
        servingTemperature,
        imageGrape,
        imageWineGlass
      });

      if (onAdd) onAdd(res.data);

      setName("");
      setDescription("");
      setOrigin("");
      setYearFirstCultivated("");
      setColor("");
      setAcidity("");
      setFlavorProfile("");
      setAroma("");
      setFoodPairing("");
      setPopularWines("");
      setServingTemperature("");
      setImageGrape("");
      setImageWineGlass("");
      toast.success("🎉 New grape added!");
          setTimeout(() => {
            navigate(`/grapes`);
          }, 2000);
    
    } catch (err) {
      setError("Failed to add grape. Are you logged in?");
    }
  };

  return (
      
  <form
      onSubmit={handleSubmit}
      className="bg-[#fdf7f2] border border-[#e6d3c5] p-6 rounded-2xl shadow-md max-w-2xl mx-auto space-y-5"
    >
      <h2 className="text-2xl font-serif font-bold text-[#4b2e2e]">
        Add a New Grape
      </h2>

      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Grape Name*</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Description*</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Origin*</label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Year First Cultivated*</label>
        <input
          type="text"
          value={yearFirstCultivated}
          onChange={(e) => setYearFirstCultivated(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Color*</label>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Acidity*</label>
        <input
          type="text"
          value={acidity}
          onChange={(e) => setAcidity(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Flavor Profile*</label>
        <input
          type="text"
          value={flavorProfile}
          onChange={(e) => setFlavorProfile(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Aroma*</label>
        <input
          type="text"
          value={aroma}
          onChange={(e) => setAroma(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Food Pairing*</label>
        <input
          type="text"
          value={foodPairing}
          onChange={(e) => setFoodPairing(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Popular Wines*</label>
        <input
          type="text"
          value={popularWines}
          onChange={(e) => setPopularWines(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Serving Temperature*</label>
        <input
          type="text"
          value={servingTemperature}
          onChange={(e) => setServingTemperature(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Image Grape (URL)*</label>
        <input
          type="url"
          value={imageGrape}
          onChange={(e) => setImageGrape(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#4b2e2e]">Image Wine Glass (URL)*</label>
        <input
          type="url"
          value={imageWineGlass}
          onChange={(e) => setImageWineGlass(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:border-[#9a6c4a] focus:ring-[#9a6c4a]"
        />
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-[#764134] text-white px-6 py-2 rounded-lg hover:bg-[#5e332a] transition"
        >
          Add Grape
        </button>
        <ToastContainer position="bottom-left" autoClose={1800} hideProgressBar={false}> New Grape Added! </ToastContainer>
      </div>
    </form>
  );
}
