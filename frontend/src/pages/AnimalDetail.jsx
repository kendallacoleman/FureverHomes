import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import FavoriteButton from "../components/FavoriteButton";
import '../styles/AnimalDetail.css';

export default function AnimalDetail() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pet details
        const petRes = await api.get(`/animal/${id}/`);
        setPet(petRes.data.animal);

        // Fetch comments
        const commentsRes = await api.get(`/comments/?pet_id=${id}`);
        setComments(commentsRes.data);

        // Fetch current user profile
        try {
          const profileRes = await api.get('/profiles/me/');
          setCurrentUser(profileRes.data);
        } catch (err) {
          console.log("User not logged in");
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      const res = await api.post('/comments/', {
        pet_id: id,
        text: newComment
      });
      
      // Add new comment to list
      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment:", err);
      alert("Failed to post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="animal-detail-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="animal-detail-page">
        <div className="error">Pet not found.</div>
      </div>
    );
  }

  const imageUrl = pet.photos?.[0]?.large || pet.photos?.[0]?.medium || 'https://placehold.co/600x600?text=No+Image';

  return (
    <div className="animal-detail-page">
      <div className="detail-container">
        {/* Pet Info Section */}
        <div className="pet-info-section">
          <div className="pet-image-container">
            <img src={imageUrl} alt={pet.name} className="pet-detail-image" />
          </div>

          <div className="pet-details-container">
            <div className="pet-header">
              <h1 className="pet-name">{pet.name}</h1>
              <FavoriteButton petId={pet.id} petName={pet.name} />
            </div>

            <div className="pet-info-grid">
              <div className="info-item">
                <span className="info-label">Breed</span>
                <span className="info-value">{pet.breeds?.primary || "Unknown"}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Age</span>
                <span className="info-value">{pet.age}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Gender</span>
                <span className="info-value">{pet.gender}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Size</span>
                <span className="info-value">{pet.size}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Color</span>
                <span className="info-value">{pet.colors?.primary || "Unknown"}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Location</span>
                <span className="info-value">
                  {pet.contact?.address?.city}, {pet.contact?.address?.state}
                </span>
              </div>
            </div>

            {pet.description && (
              <div className="pet-description">
                <h3>About {pet.name}</h3>
                <p>{pet.description}</p>
              </div>
            )}

            {pet.contact?.email && (
              <div className="contact-info">
                <h3>Contact Information</h3>
                <p>Email: {pet.contact.email}</p>
                {pet.contact.phone && <p>Phone: {pet.contact.phone}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          <h2 className="comments-title">Comments ({comments.length})</h2>

          {/* Comment Form */}
          {currentUser ? (
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <div className="comment-input-wrapper">
                <img
                  src={
                    currentUser.avatar
                      ? `${BASE_URL}${currentUser.avatar}`
                      : "https://placehold.co/50x50?text=User"
                  }
                  alt="Your avatar"
                  className="comment-avatar"
                />
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Leave a comment..."
                  className="comment-textarea"
                  rows="3"
                />
              </div>
              <button 
                type="submit" 
                disabled={submitting || !newComment.trim()}
                className="comment-submit-btn"
              >
                {submitting ? "Posting..." : "Post Comment"}
              </button>
            </form>
          ) : (
            <div className="login-prompt">
              Please log in to leave a comment.
            </div>
          )}

          {/* Comments List */}
          <div className="comments-list">
            {comments.length === 0 ? (
              <div className="no-comments">
                No comments yet. Be the first to comment!
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <img
                    src={
                      comment.user_avatar
                        ? `${BASE_URL}${comment.user_avatar}`
                        : "https://placehold.co/50x50?text=User"
                    }
                    alt={comment.user?.username || "User"}
                    className="comment-avatar"
                  />
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-username">
                        {comment.user?.username || "Anonymous"}
                      </span>
                      <span className="comment-date">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}