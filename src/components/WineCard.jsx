import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function WineCard({ wine, onEdit, onDelete, onSave }) {
  const { user, isLoggedIn } = useContext(AuthContext);
  const isCreator = user?._id === wine.userId;

  return (
    <div className="wine-card">
      <h2>{wine.name} ({wine.year})</h2>
      <p>Rating: {wine.rating}/10</p>
      <p>{wine.notes}</p>

      {isLoggedIn && (
        <div className="action-buttons">
          {isCreator && (
            <>
              <button onClick={() => onEdit(wine)}>Edit</button>
              <button onClick={() => onDelete(wine._id)}>Delete</button>
            </>
          )}
          {!isCreator && (
            <button onClick={() => onSave(wine._id)}>Save to My Cellar</button>
          )}
        </div>
      )}
    </div>
  );
}