import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await api.get("/api/favorites/");
      setFavorites(res.data);
    };
    fetchFavorites();
  }, []);

  if (favorites.length === 0) return <div>No favorites yet!</div>;

  return (
    <div>
      <h1>Your Favorite Pets</h1>
      <ul>
        {favorites.map((f) => (
          <li key={f.id}>
            <Link to={`/animal/${f.pet_id}`}>Pet ID: {f.pet_id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
