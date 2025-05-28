import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import GrapeList from "../Pages/GrapeList";
import api from "../services/api";

export default function GrapeCard({ grape}) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleCardClick = () => {
    if (grape?._id) {
      navigate(`/grapes/${grape._id}`);
    }
  };

  return (
    <article 
      className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      onClick={handleCardClick}
    >
      <div className="p-6">
        <header className="mb-4">
          <h2 className="text-2xl font-serif text-[#800020] font-semibold mb-1">
            {grape.name}
          </h2>
          <p className="text-gray-600 italic">{grape.description}</p>
        </header>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="md:w-1/2">
            <img 
              src={grape.imageGrape} 
              alt={grape.name} 
              className="w-full h-64 object-cover rounded-lg" 
            />
          </div>
          <div className="md:w-1/2">
            <img 
              src={grape.imageWineGlass} 
              alt={`${grape.name} wine glass`} 
              className="w-full h-64 object-cover rounded-lg" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-[#800020]">Origin</h3>
              <p className="text-gray-700">{grape.origin}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#800020]">Year First Cultivated</h3>
              <p className="text-gray-700">{grape.yearFirstCultivated}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#800020]">Color</h3>
              <p className="text-gray-700">{grape.color}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#800020]">Acidity</h3>
              <p className="text-gray-700">{grape.acidity}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-[#800020]">Flavor Profile</h3>
              <p className="text-gray-700">{grape.flavorProfile}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#800020]">Aroma</h3>
              <p className="text-gray-700">{grape.aroma}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#800020]">Food Pairing</h3>
              <p className="text-gray-700">{grape.foodPairing}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#800020]">Serving Temperature</h3>
              <p className="text-gray-700">{grape.servingTemperature}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#800020]">Popular Wines</h3>
              <p className="text-gray-700">{grape.popularWines}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}