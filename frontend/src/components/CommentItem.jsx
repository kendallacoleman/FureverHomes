import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function CommentItem({ comment, refresh }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.text);

  const handleDelete = async () => {
    try {
      await api.delete(`/comments/${comment.id}/`);
      refresh();
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  const handleEdit = async () => {
    try {
      await api.patch(`/comments/${comment.id}/`, { text });
      setEditing(false);
      refresh();
    } catch (err) {
      console.error("Failed to edit comment", err);
    }
  };

  return (
    <div className="comment-item">
      {editing ? (
        <>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p className="comment-text">{comment.text}</p>
          <Link to={`/animal/${comment.pet_id}`}>View Pet</Link>
          <div className="comment-actions">
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CommentItem;
