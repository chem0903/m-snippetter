import React from "react";
import "./Comment.css";
import { format } from "timeago.js";

const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

const Comment = ({ comment, commenter }) => {
  const passTime = format(comment.createdAt);

  return (
    <div className="snippet-comment">
      <img
        src={PUBLIC_FOLDER + commenter.profileImage}
        alt={commenter.name}
        className="commenter-img"
      />
      <p>
        <strong>{commenter.name}:</strong> {comment.text}
      </p>
      <p className="comment-time">{passTime}</p>
    </div>
  );
};

export default Comment;
