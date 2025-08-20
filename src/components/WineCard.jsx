import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function WineCard({ wine, onEdit, onDelete, onSave }) {
  const { user, isLoggedIn } = useContext(AuthContext);
  const isCreator = user?._id === wine.userId;
  const imageUrl = wine.image || null; 

  const handleImageError = (e) => {
    e.target.src = "/placeholder.png"; // fallback image
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-[#f9f5f1] border border-[#cbbba0] rounded-3xl shadow-lg p-6 hover:shadow-xl transition w-full">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={wine.name || "Wine image"}
          onError={handleImageError}
          className="w-full sm:w-36 h-44 sm:h-36 rounded-xl object-cover"
        />
      ) : (
        <div className="w-full sm:w-36 h-44 sm:h-36 bg-[#d9cfc4] rounded-xl flex items-center justify-center text-[#a88b7a] text-sm italic shrink-0 font-serif">
          No image
        </div>
      )}

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2
            className="text-3xl font-semibold text-[#5a3a2b] tracking-wide"
            style={{ fontFamily: "'Great Vibes', cursive", lineHeight: 1.2 }}
          >
            {wine.name}{" "}
            <span
              className="text-[#b2947d] text-xl"
              style={{ fontFamily: "'Lora', serif", fontWeight: "500" }}
            >
              ({wine.year})
            </span>
          </h2>

          <p
            className="mt-2 text-[#7a5b47] text-lg"
            style={{ fontFamily: "'Lora', serif", fontWeight: "600" }}
          >
            Rating: {wine.rating}/10
          </p>

          {wine.notes && (
            <p
              className="text-[#6f5a44] italic text-base mt-3 leading-relaxed"
              style={{ fontFamily: "'Lora', serif", fontStyle: "italic" }}
            >
              {wine.notes.length > 150 ? `${wine.notes.slice(0, 150)}...` : wine.notes}
            </p>
          )}
        </div>

        {isLoggedIn && (
          <div
            className="mt-6 flex flex-col sm:flex-row sm:justify-start sm:items-center gap-3 sm:gap-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {isCreator ? (
              <>
                <button
                  onClick={() => onEdit(wine)}
                  className="px-6 py-2 sm:py-2.5 bg-[#8c6846] text-white rounded-full shadow hover:bg-[#7a5738] transition duration-300 font-semibold text-base sm:text-lg"
                  aria-label={`Edit wine ${wine.name}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(wine._id)}
                  className="px-6 py-2 sm:py-2.5 bg-[#a53834] text-white rounded-full shadow hover:bg-[#872b2a] transition duration-300 font-semibold text-base sm:text-lg"
                  aria-label={`Delete wine ${wine.name}`}
                >
                  Delete
                </button>
              </>
            ) : (
              <button
                onClick={() => onSave(wine._id)}
                className="px-6 py-2 sm:py-2.5 bg-[#5a7836] text-white rounded-full shadow hover:bg-[#48632b] transition duration-300 font-semibold text-base sm:text-lg"
                aria-label={`Save wine ${wine.name} to My Cellar`}
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