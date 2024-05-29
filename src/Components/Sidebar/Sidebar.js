import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useAllUsers } from "../../Contexts/AllUsersContext";

const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

const Sidebar = ({ profileUser }) => {
  const { allUsers } = useAllUsers();

  const followings = allUsers.filter((user) => {
    return profileUser.followings.some(
      (followingId) => followingId === user._id
    );
  });

  const followers = allUsers.filter((user) => {
    return profileUser.followers.some((followerId) => followerId === user._id);
  });

  return (
    <div className="sidebar">
      <p>{profileUser.followings.length} Followings</p>
      <div className="user-list">
        {followings.map((user) => (
          <div key={user._id} className="user-item">
            <Link to={`/profile/${user._id}`}>
              <img src={PUBLIC_FOLDER + user.profileImage} alt={user.name} />
            </Link>
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.profile?.bio}</p>
            </div>
          </div>
        ))}
      </div>
      <p>{profileUser.followers.length} Followers</p>
      <div className="user-list">
        {followers.map((user) => (
          <div key={user._id} className="user-item">
            <Link to={`/profile/${user._id}`}>
              <img src={PUBLIC_FOLDER + user.profileImage} alt={user.name} />
            </Link>
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.profile?.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
