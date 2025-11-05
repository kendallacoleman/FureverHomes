import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import FavoriteButton from "../components/FavoriteButton";
import CommentSection from "../components/CommentSection";

export default function AnimalDetail() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      const res = await fetch(`http://localhost:8000/api/search/?id=${id}`);
      const data = await res.json();
      setPet(data.animals ? data.animals[0] : null);
    };
    fetchPet();
  }, [id]);

  if (!pet) return <div>Loading...</div>;

  return (
    <div style={{ padding: "2em" }}>
      <h1>{pet.name}</h1>
      {pet.photos?.[0]?.medium && (
        <img src={pet.photos[0].medium} alt={pet.name} />
      )}
      <p>{pet.breeds?.primary}</p>
      <p>{pet.age} • {pet.gender}</p>
      <p>{pet.contact?.address?.city}</p>

      <FavoriteButton petId={id} />
      <CommentSection petId={id} />
    </div>
  );
}
