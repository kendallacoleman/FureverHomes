import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import FavoriteButton from "../components/FavoriteButton";
import CommentSection from "../components/CommentSection";
import '../styles/AnimalDetail.css';

export default function AnimalDetail() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await api.get(`/animal/${id}/`);
        setPet(res.data.animal);
      } catch (err) {
        console.error("Failed to fetch pet details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!pet) return <div>Pet not found.</div>;

  const imageUrl = pet.photos?.[0]?.medium || 'https://placehold.co/400x400?text=No+Image';

  return (
    <div className="animal-detail-container">
      <h1>{pet.name}</h1>
      <img src={imageUrl} alt={pet.name} className="animal-detail-image" />
      <p><b>Breed:</b> {pet.breeds?.primary}</p>
      <p><b>Age:</b> {pet.age}</p>
      <p><b>Gender:</b> {pet.gender}</p>
      <p><b>Size:</b> {pet.size}</p>
      <p><b>Location:</b> {pet.contact?.address?.city}, {pet.contact?.address?.state}</p>

      <FavoriteButton petId={pet.id} petName={pet.name} />
      <CommentSection petId={id} />
    </div>
  );
}
