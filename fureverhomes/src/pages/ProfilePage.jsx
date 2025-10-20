import React, { useEffect, useState } from "react";
import api from "../api";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    api.get("profiles/me/")
      .then(res => {
        setProfile(res.data);
        setFormData(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    api.put("profiles/me/", formData)
      .then(res => {
        setProfile(res.data);
        setEditing(false);
      })
      .catch(err => console.error(err));
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {editing ? (
        <>
          <input
            type="text"
            name="bio"
            value={formData.bio || ""}
            onChange={handleChange}
            placeholder="Bio"
            className="w-full mb-2 border p-2 rounded"
          />
          <input
            type="text"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            placeholder="Location"
            className="w-full mb-2 border p-2 rounded"
          />
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </>
      ) : (
        <>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Bio:</strong> {profile.bio || "No bio yet"}</p>
          <p><strong>Location:</strong> {profile.location || "No location set"}</p>
          <button onClick={() => setEditing(true)} className="mt-4 bg-gray-800 text-white px-4 py-2 rounded">
            Edit
          </button>
        </>
      )}
    </div>
  );
}
