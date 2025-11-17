import { useState, useEffect } from "react";
import api from "../api";

export default function CommentSection({ petId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/`, { params: { pet_id: petId } });
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [petId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    try {
      await api.post(`/comments/`, { pet_id: petId, text: newComment });
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: "2em" }}>
      <h3>Comments</h3>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            <b>{c.user.username}:</b> {c.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Leave a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{ width: "70%", padding: "6px" }}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
