import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function WineCard({ wine, onEdit, onDelete }) {
  const { user } = useContext(AuthContext);
  const isCreator = user?._id === wine.userId;

  return (
    <div >
      <h2 >{wine.name} ({wine.year})</h2>
      <p><strong>Rating:</strong> {wine.rating}/10</p>
      <p>{wine.notes}</p>

      {isCreator && (
        <div>
          <button onClick={() => onEdit(wine)} >Edit</button>
          <button onClick={() => onDelete(wine._id)} >Delete</button>
        </div>
      )}
    </div>
  );
}