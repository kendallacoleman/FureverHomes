import React from "react";
import "../styles/PetCard.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

const placeholderImage = "https://placehold.co/400x400?text=Image+Not+Available";

function PetCard({ pet }) {
  const imageUrl =
    pet.photos && pet.photos.length > 0 ? pet.photos[0].medium : placeholderImage;

  const location = pet.contact?.address?.city
    ? `${pet.contact.address.city}, ${pet.contact.address.state}`
    : "Location Unknown";

  return (
    <div className="pet-card">
      <div className="pet-card-image-container">
        <img src={imageUrl} alt={pet.name} className="pet-image" />
      </div>

      <div className="pet-card-content">
        <h3 className="pet-name">{pet.name}</h3>
        <p className="pet-details">
          {pet.type} &bull; {pet.age} &bull; {pet.gender}
        </p>
        <p className="pet-location">
          <FaMapMarkerAlt /> {location}
        </p>

        <div className="pet-actions">
          {/* Link to Animal Detail page */}
          <Link to={`/animal/${pet.id}`}>
            <button className="details-button">View Details</button>
          </Link>

          {/* Favorite toggle button */}
          <FavoriteButton petId={pet.id} petName={pet.name} />
        </div>
      </div>
    </div>
  );
}

export default PetCard;
