import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import GrapeList from "../Pages/GrapeList";
import api from "../services/api";

export default function RegionCard({ region}) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleCardClick = () => {
    if (region?._id) {
      navigate(`/regions/${region._id}`);
    }
  };


  return (
   
        <div className="region-card">
      <header className="mb-4">
        <h2 className="mt-8 text-2xl font-serif text-[#800020] font-semibold">
          {region.region}
          <span className="text-gray-600 text-lg ml-2">({region.country})</span>
        </h2>
      </header>
      <figure className="mb-4">
        <img 
          src={region.image} 
          alt={region.region} 
          className="w-full h-48 object-cover rounded-md" 
        />
      </figure>

      <div className="region-details space-y-2 mb-4">
        {region.description && (
          <p className="text-gray-500 text-sm">{region.description}</p>
        )}
        
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-500 text-sm">
          {region.climate && (
            <li><strong>Climate:</strong> {region.climate}</li>
          )}
          {region.signatureWines && (
            <li><strong>Signature Wines:</strong> {region.signatureWines}</li>
          )}
          {region.history && (
            <li><strong>History:</strong> {region.history}</li>
          )}
          {region.bestTimeToVisit && (
            <li><strong>Best Time to Visit:</strong> {region.bestTimeToVisit}</li>
          )}
          {region.wineFestivals && (
            <li><strong>Wine Festivals:</strong> {region.wineFestivals}</li>
          )}
        </ul>
      </div>

      <section className="mt-4">
        <h3 className="font-medium text-[#800020] mb-2">Location</h3>
        <div 
          className="w-full h-70 rounded-lg overflow-hidden"
          dangerouslySetInnerHTML={{ __html: region.map }}
        ></div>
        <a 
          href={region.map || `https://www.google.com/maps?q=${region.region},${region.country}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm hover:underline mt-2 inline-block"
        >
          Open in Google Maps
        </a>
      </section>
    </div>
  );
    
}