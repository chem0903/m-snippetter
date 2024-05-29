import React, { useState } from "react";
import "./Snippet.css";
import Comment from "../Comment/Comment";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { Link } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
import { useUser } from "../../Contexts/AuthUserContext";
import { useAllUsers } from "../../Contexts/AllUsersContext";
// eslint-disable-next-line
import { format } from "timeago.js";

const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
const ORIGIN_API = process.env.REACT_APP_ORIGIN_API;

const Snippet = ({ snippet, fetchSnippets }) => {
  const { authUser } = useUser();
  const { allUsers } = useAllUsers();

  const author = allUsers.find((user) => snippet.authorId === user._id);

  const [isShowComments, setIsShowComments] = useState(false);

  const toggleComments = () => {
    setIsShowComments(!isShowComments);
  };

  const handleLike = async () => {
    const reqBody = {
      authId: authUser._id,
    };
    await axios.put(ORIGIN_API + `/posts/${snippet._id}/like`, reqBody);
    fetchSnippets();
  };

  const [commnetText, setCommentText] = useState("");
  const handleComment = async (e) => {
    e.preventDefault();
    const now = Date.now();
    const reqBody = { authId: authUser._id, text: commnetText, createdAt: now };
    await axios.put(ORIGIN_API + `/posts/${snippet._id}/comment`, reqBody);
    fetchSnippets();
    setCommentText("");
  };

  return (
    <li className="snippet-item">
      <div className="snippet-content">
        <div className="snippet-info">
          <div className="snippet-title">
            <h2>{snippet.title}</h2>
            <p>{format(snippet.createdAt)}</p>
          </div>
          <p>
            <strong>Language:</strong> {snippet.language}
          </p>
          <p>
            <strong>Environment:</strong> {snippet.environment}
          </p>
          <div className="snippet-author">
            <Link to={`/profile/${snippet.authorId}`}>
              <img
                src={PUBLIC_FOLDER + author?.profileImage}
                alt={author?.name}
              />
            </Link>
            <p>{author?.name}</p>
          </div>
          <pre>{snippet.code}</pre>
          <p>{snippet.description}</p>
        </div>
      </div>
      <div className="snippet-interactions">
        <ThumbUpIcon onClick={handleLike} />
        <p>{snippet.likes.length} Likes</p>
        <ModeCommentIcon onClick={toggleComments} />
        <p>{snippet.comments.length} Comments</p>
      </div>
      {isShowComments && (
        <>
          <form className="comment-form" onSubmit={(e) => handleComment(e)}>
            <input
              type="text"
              placeholder="write comment for this snippet"
              className="comment-input"
              value={commnetText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit"></button>
          </form>

          <div className="snippet-comments">
            {snippet.comments.map((comment, index) => {
              const commenter = allUsers.find(
                (user) => comment.authId === user._id
              );
              return (
                <Comment comment={comment} commenter={commenter} key={index} />
              );
            })}
          </div>
        </>
      )}
    </li>
  );
};

export default Snippet;
