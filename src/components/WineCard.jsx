import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function WineCard({ wine, onEdit, onDelete }) {
  const { user } = useContext(AuthContext);
  const isCreator = user?._id === wine.userId;

  return (
    <div className="bg-[#fdfaf6] border border-[#e2d6c5] rounded-xl shadow-md p-6 space-y-2">
      <h2 className="text-2xl font-serif text-[#800020] font-semibold">
        {wine.name} <span className="text-gray-600 text-lg">({wine.year})</span>
      </h2>

      <p className="text-gray-700">
        <span className="font-medium text-[#5b3b3b]">Rating:</span> {wine.rating}/10
      </p>

      <p className="text-sm text-gray-600 italic">{wine.notes}</p>

      {isCreator && (
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => onEdit(wine)}
            className="bg-[#800020] text-white px-4 py-1 rounded hover:bg-[#a52a2a] transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(wine._id)}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}