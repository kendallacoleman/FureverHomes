import React, { useEffect, useState } from "react";
import api from "../api";
import CommentItem from "./CommentItem";

function CommentList() {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const res = await api.get("/comments/");
      setComments(res.data);
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="comment-list">
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} refresh={fetchComments} />
        ))
      )}
    </div>
  );
}

export default CommentList;
