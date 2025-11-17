import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/ProfilePage.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);

  // Dynamically get BASE_URL from api.js for media URLs
  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  // Fetch profile when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profiles/me/"); 
        setProfile(res.data);
        setBio(res.data.bio || "");
      } catch (err) {
        console.error("Failed to fetch profile", err);
        setMessage("Error: Could not load your profile.");
      }
    };
    fetchProfile();
  }, []);

  // Handle form submission to update bio/avatar
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile) return;

    const formData = new FormData();
    formData.append("bio", bio);
    // if (avatarFile) formData.append("avatar", avatarFile);

    if (avatarFile) {
      console.log("Avatar file:", avatarFile);
      formData.append("avatar", avatarFile);
    }

    try {
      setLoading(true);

      // const res = await api.patch(`/profiles/me/`, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      const res = await api.patch(`/profiles/me/`, formData);
      setProfile(res.data);
      setMessage("Profile updated successfully!");
      setEditing(false); 
      setAvatarFile(null); 
    } catch (err) {
      console.error("Error updating profile", err);
      setMessage(
        err.response?.data?.avatar
          ? `Avatar Error: ${err.response.data.avatar}`
          : "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return <div className="profile-page"><p>Loading profile...</p></div>;
  }

  return (
    <div className="profile-page">
      <h2 className="profile-title">My Profile</h2>

      <div className="profile-container">
        {/* Avatar */}
        <div className="profile-avatar-section">
          <img
            src={
              profile.avatar
                ? `${BASE_URL}${profile.avatar}` // use dynamic BASE_URL
                : "https://placehold.co/150x150?text=No+Avatar"
            }
            alt="Profile avatar"
            className="profile-avatar"
          />
        </div>

        {/* Info Section */}
        <div className="profile-info-section">
          <p className="profile-username"><strong>Username:</strong> {profile.user?.username}</p>
          <p className="profile-bio"><strong>Bio:</strong> {profile.bio || "No bio yet."}</p>

          {/* Settings Button */}
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="edit-profile-btn"
            >
              Settings
            </button>
          )}

          {/* Edit Form */}
          {editing && (
            <form onSubmit={handleSubmit} className="edit-profile-form">
              <label>
                Update Bio:
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows="4"
                  placeholder="Write something about yourself..."
                />
              </label>

              <label>
                Update Avatar:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatarFile(e.target.files[0])}
                />
              </label>

              <div className="form-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button type="button" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>

              {message && <p className="profile-message">{message}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
