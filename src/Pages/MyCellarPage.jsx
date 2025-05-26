import { useEffect, useState } from "react";
import axios from "axios";

function MyCellarPage() {
  const [wines, setWines] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/wine/my-cellar`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      })
      .then((response) => {
        setWines(response.data);
      })
      .catch((error) => {
        console.error("Error fetching your wines:", error);
      });
  }, []);

  return (
    <div>
      <h2>My Cellar</h2>
      {wines.length === 0 ? (
        <p>You haven't saved any wines yet.</p>
      ) : (
        <ul>
          {wines.map((wine) => (
            <li key={wine._id}>
              <strong>{wine.name}</strong> ({wine.year}) - Rating: {wine.rating}/10
              <p>{wine.notes}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyCellarPage;