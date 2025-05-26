import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function WineCard({ wine, onEdit, onDelete, onSave }) {
  const { user, isLoggedIn } = useContext(AuthContext);
  const isCreator = user?._id === wine.userId;

  return (
    <div className="flex gap-6 bg-[#fdf7f2] border border-[#e6d3c5] rounded-2xl shadow-md p-4 hover:shadow-lg transition">
      
      {/*placeholder for now need to update model backend */}
      <div className="w-32 h-32 bg-[#e9dbd0] rounded-lg flex items-center justify-center text-[#a78a7f] text-sm italic">
        {/* <img src={wine.image} /> */}
        No image
      </div>

      
      <div className="flex-1">
        <h2 className="text-2xl font-serif font-semibold text-[#4b2e2e]">
          {wine.name} <span className="text-[#a78a7f] text-lg">({wine.year})</span>
        </h2>

        <p className="mt-1 text-[#7c4a3a] font-medium">Rating: {wine.rating}/10</p>

        <p className="text-[#4b3b38] italic text-sm mt-2">{wine.notes}</p>

        {isLoggedIn && (
          <div className="pt-4 flex flex-wrap gap-3">
            {isCreator ? (
              <>
                <button
                  onClick={() => onEdit(wine)}
                  className="px-4 py-2 bg-[#764134] text-white rounded-lg hover:bg-[#5e332a] transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(wine._id)}
                  className="px-4 py-2 bg-[#9a2c2c] text-white rounded-lg hover:bg-[#7f2323] transition"
                >
                  Delete
                </button>
              </>
            ) : (
              <button
                onClick={() => onSave(wine._id)}
                className="px-4 py-2 bg-[#556b2f] text-white rounded-lg hover:bg-[#445522] transition"
              >
                Save to My Cellar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}