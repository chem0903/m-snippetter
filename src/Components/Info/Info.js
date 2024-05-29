import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useUser } from "../../Contexts/AuthUserContext";
import "./Info.css";
import axios from "axios";

const ORIGIN_API = process.env.REACT_APP_ORIGIN_API;

const Info = ({ profileUser }) => {
  const { authUser } = useUser();

  const [isEditName, setIsEditName] = useState(false);
  const [isEditMail, setIsEditMail] = useState(false);
  const [isEditBio, setIsEditBio] = useState(false);
  const [isEditLanguages, setIsEditLanguages] = useState(false);
  const [isEditComment, setIsEditComment] = useState(false);

  const [name, setName] = useState(profileUser.name);
  const [email, setEmail] = useState(profileUser.email);
  const [bio, setBio] = useState(profileUser.profile.bio);
  const [languages, setLanguages] = useState(profileUser.profile.languages);
  const [comment, setComment] = useState(profileUser.profile.comment);

  useEffect(() => {
    setIsEditName(false);
    setIsEditMail(false);
    setIsEditBio(false);
    setIsEditLanguages(false);
    setIsEditComment(false);
  }, [profileUser]);

  const toggleEditName = () => {
    setIsEditName(!isEditName);
  };

  const toggleEditMail = () => {
    setIsEditMail(!isEditMail);
  };

  const toggleEditBio = () => {
    setIsEditBio(!isEditBio);
  };

  const toggleEditLanguages = () => {
    setIsEditLanguages(!isEditLanguages);
  };

  const toggleEditComment = () => {
    setIsEditComment(!isEditComment);
  };

  const editName = async () => {
    if (!name) return;
    const reqBody = {
      authId: authUser._id,
      name: name,
    };
    await axios.put(ORIGIN_API + "/users/edit/name", reqBody);
    window.location.reload();
  };

  const editEmail = async () => {
    if (!email) return;
    const reqBody = {
      authId: authUser._id,
      email: email,
    };
    await axios.put(ORIGIN_API + "/users/edit/email", reqBody);
    window.location.reload();
  };

  const editBio = async () => {
    if (!bio) return;
    const reqBody = {
      authId: authUser._id,
      profile: {
        bio: bio,
        languages: languages,
        comment: comment,
      },
    };
    await axios.put(ORIGIN_API + "/users/edit/bio", reqBody);
    window.location.reload();
  };

  const editLanguages = async () => {
    if (!languages) return;
    const reqBody = {
      authId: authUser._id,
      profile: {
        bio: bio,
        languages: languages,
        comment: comment,
      },
    };
    await axios.put(ORIGIN_API + "/users/edit/languages", reqBody);
    window.location.reload();
  };

  const editComment = async () => {
    if (!comment) return;
    const reqBody = {
      authId: authUser._id,
      profile: {
        bio: bio,
        languages: languages,
        comment: comment,
      },
    };
    await axios.put(ORIGIN_API + "/users/edit/comment", reqBody);
    window.location.reload();
  };

  return (
    <>
      <div className="profile-info-container">
        <form className="profile-info-item" onSubmit={editName}>
          <h2>Name:</h2>
          {isEditName ? (
            <input value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            <h2>{profileUser.name}</h2>
          )}
          {profileUser._id === authUser._id && (
            <EditIcon onClick={toggleEditName} className="edit-icon" />
          )}
        </form>
        <form className="profile-info-item" onSubmit={editEmail}>
          <h2>Email:</h2>
          {isEditMail ? (
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          ) : (
            <h2>{profileUser.email}</h2>
          )}
          {profileUser._id === authUser._id && (
            <EditIcon onClick={toggleEditMail} className="edit-icon" />
          )}
        </form>
        <form className="profile-info-item" onSubmit={editBio}>
          <h2>Bio:</h2>
          {isEditBio ? (
            <input value={bio} onChange={(e) => setBio(e.target.value)} />
          ) : (
            <h2>{profileUser.profile?.bio}</h2>
          )}
          {profileUser._id === authUser._id && (
            <EditIcon onClick={toggleEditBio} className="edit-icon" />
          )}
        </form>
        <form className="profile-info-item" onSubmit={editLanguages}>
          <h2>Languages:</h2>
          {isEditLanguages ? (
            <input
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
            />
          ) : (
            <h2>{profileUser.profile?.languages}</h2>
          )}
          {profileUser._id === authUser._id && (
            <EditIcon onClick={toggleEditLanguages} className="edit-icon" />
          )}
        </form>
        <form className="profile-info-item" onSubmit={editComment}>
          {isEditComment ? (
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          ) : (
            <h2 className="comment">{profileUser.profile?.comment}</h2>
          )}
          {profileUser._id === authUser._id && (
            <EditIcon onClick={toggleEditComment} className="edit-icon" />
          )}
        </form>
      </div>
    </>
  );
};

export default Info;
