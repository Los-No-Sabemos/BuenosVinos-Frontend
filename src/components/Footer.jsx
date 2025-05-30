import { useEffect, useState } from "react";
import api from "../services/api";

export default function Footer() {
  const [featuredWines, setFeaturedWines] = useState([]);

  useEffect(() => {
    const fetchFeaturedWines = async () => {
      try {
        const res = await api.get(`${import.meta.env.VITE_API_URL}/api/wine`);
        setFeaturedWines(res.data.slice(0, 4));
      } catch (err) {
        console.error("Error fetching featured wines:", err);
      }
    };
    fetchFeaturedWines();
  }, []);

  return (
    <footer className="bg-[#800020] text-white py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <h2 className="text-3xl font-serif font-bold">Buenos Vinos</h2>
            <span className="ml-2 text-xl">🍷</span>
          </div>
          <p className="text-lg">
            Buenos Vinos is your ultimate wine collection companion, helping enthusiasts
            catalog, discover, and share their favorite wines from around the world.
          </p>
        </div>

        <div className="relative w-full h-40 md:h-64 rounded-lg overflow-hidden mt-6">
          <img
            src="https://tampamagazines.com/wp-content/uploads/2021/05/iX19U8fA.jpeg"
            alt="Wine background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 rounded-lg pointer-events-none" />
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-serif font-semibold border-b pb-2 mb-4 text-center">
            Featured Wines
          </h3>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {featuredWines.map((wine) => (
              <div
                key={wine._id}
                className="flex items-center space-x-3 group bg-[#a9736e33] rounded-lg px-4 py-2 max-w-xs w-full sm:w-auto"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-[#e9dbd0] rounded-lg flex items-center justify-center">
                    <span className="text-[#a78a7f] text-xs">No image</span>
                  </div>
                  <span className="absolute -top-2 -right-2 bg-white text-[#800020] text-xs font-bold px-2 py-1 rounded-full">
                    ⭐{wine.rating}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium group-hover:underline mr-8 mb-1 text-[#f3e5e1]">
                    {wine.name}{" "}
                    <p className="text-white/70 inline">({wine.year})</p>
                  </h4>
                  <p className="text-sm text-white/80">{wine.region}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center mt-12 px-4 sm:px-6 max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-serif font-semibold border-b pb-2 mb-4">About The Team</h3>
          <p className="text-justify text-white/90">
            Buenos Vinos was created by Florian Wunsch and Eliana Depietri, two passionate web development students
            who share a love for both technology and fine wines. We combined our technical skills with our appreciation
            for viticulture to build this platform for wine enthusiasts.
          </p>
        </div>
      </div>

      <div className="container mx-auto text-center mt-10 px-4 sm:px-6">
        <p className="text-sm text-white/80">
          &copy; {new Date().getFullYear()} Buenos Vinos. All rights reserved.
        </p>
        <p className="text-xs mt-2 text-white/60">
          Built with ❤️ by the Buenos Vinos Team
        </p>
      </div>
    </footer>
  );
}