import React from 'react';
import '../styles/PetCard.css';
import { FaHeart, FaMapMarkerAlt } from 'react-icons/fa';

const placeholderImage = 'https://placehold.co/400x400?text=Image+Not+Available';

function PetCard({ pet, onFavoriteToggle }) {
    // determine primary photo URL
    const imageUrl = (pet.photos && pet.photos.length > 0)
                     ? pet.photos[0].medium
                     : placeholderImage;

    // determine the location
    const location = pet.contact.address.city
                     ? `${pet.contact.address.city}, ${pet.contact.address.state}`
                     : 'Location Unknown';
    
    return (
        <div className="pet-card">
            <div className="pet-card-image-container">
                <img 
                    src={imageUrl} 
                    alt={pet.name} 
                    className="pet-image" 
                />
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
                    {/* Placeholder for the detail view link */}
                    <button className="details-button">
                        View Details
                    </button>

                    {/* Button to handle favoriting (will call Django API) */}
                    <button 
                        className={`favorite-button ${pet.is_favorite ? 'favorited' : ''}`}
                        onClick={() => onFavoriteToggle(pet.id)}
                    >
                        <FaHeart /> 
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PetCard;