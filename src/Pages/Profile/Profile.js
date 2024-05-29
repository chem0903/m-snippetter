import React, { useEffect, useState } from "react";
import "./Profile.css";
import Snippet from "../../Components/Snippet/Snippet";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../../Contexts/AuthUserContext";
import Info from "../../Components/Info/Info";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useAllUsers } from "../../Contexts/AllUsersContext";

const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
const ORIGIN_API = process.env.REACT_APP_ORIGIN_API;

const Profile = () => {
  const { authUser, setAuthUser } = useUser();
  const { allUsers, setAllUsers } = useAllUsers();
  const profileUserId = useParams().id;
  const profileUser = allUsers.find((user) => profileUserId === user._id);

  const [allSnippets, setAllSnippets] = useState([]);

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    const res = await axios.get(ORIGIN_API + "/posts/all");
    setAllSnippets(res.data);
  };

  const profileUserSnippets = allSnippets.filter(
    (snippet) => profileUser._id === snippet.authorId
  );

  const isFollowing = () => {
    if (authUser?.followings.includes(profileUser._id)) return true;
    else return false;
  };

  // ! バグ：出現条件：フォローした状態でリロードをかけるとなぜか、authUserのfollowingsのidがfollowersに移動している。
  // console.log(authUser);
  // console.log(profileUser);
  // console.log(isFollowing());

  const toggleFollow = async () => {
    const reqBody = {
      authId: authUser._id,
    };
    await axios.put(ORIGIN_API + `/users/${profileUserId}/follow`, reqBody);
    fetchAuthUser();
    fetchAllUser();
  };

  const fetchAuthUser = async () => {
    const res = await axios.get(ORIGIN_API + `/users/${authUser._id}`);
    setAuthUser(res.data);
  };

  const fetchAllUser = async () => {
    const res = await axios.get(ORIGIN_API + "/users/all/users");
    setAllUsers(res.data);
  };

  const [profileImage, setProfileImage] = useState(profileUser.profileImage);
  const editProfileImage = async (e) => {
    e.preventDefault();
    await uploadFile(e.target.files[0], e.target.files[0].name);
    setProfileImage(e.target.files[0].name);
    await fetchProfileImage(e.target.files[0].name);
    // ローカルストレージのユーザーを更新するための処理
    const res = await axios.get(ORIGIN_API + `/users/${authUser._id}`);
    localStorage.setItem("user", JSON.stringify(res.data));
    window.location.reload();
  };

  const fetchProfileImage = async (profileImage) => {
    const reqBody = {
      authId: authUser._id,
      profileImage: profileImage,
    };
    await axios.put(ORIGIN_API + "/users/edit/profileImg", reqBody);
  };

  const uploadFile = async (file, fileName) => {
    const fileData = new FormData();
    fileData.append("name", fileName);
    fileData.append("file", file);

    await axios.post(`${ORIGIN_API}/upload`, fileData);
  };

  return (
    <div className="home-wrapper">
      <div className="container">
        <header className="header">
          <h1>
            {authUser._id === profileUser._id
              ? "My profile"
              : "Profile of " + profileUser.name}
          </h1>
          <Link to="/">
            <img
              src={PUBLIC_FOLDER + authUser.profileImage}
              alt="Profile"
              className="profile-img"
            />
          </Link>
        </header>
        <section className="profile-info">
          <div className="profile-info-left">
            <label htmlFor="file">
              <img
                src={
                  authUser._id === profileUser._id
                    ? PUBLIC_FOLDER + profileImage
                    : PUBLIC_FOLDER + profileUser.profileImage
                }
                alt={profileUser.name}
                className="profile-info-img"
              />
              {authUser._id === profileUser._id && (
                <input
                  id="file"
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  style={{ display: "none" }}
                  onChange={(e) => editProfileImage(e)}
                />
              )}
            </label>
            {authUser._id === profileUser._id ||
              (isFollowing() ? (
                <FavoriteIcon
                  className="favorite-icon"
                  onClick={toggleFollow}
                />
              ) : (
                <FavoriteBorderIcon
                  className="favorite-icon"
                  onClick={toggleFollow}
                />
              ))}
          </div>
          <div className="profile-info-right">
            <Info profileUser={profileUser} />
          </div>
        </section>
        <main className="main">
          <Sidebar profileUser={profileUser} />
          <div className="content">
            <ul className="snippet-list">
              {profileUserSnippets.map((snippet) => (
                <Snippet
                  snippet={snippet}
                  key={snippet._id}
                  fetchSnippets={fetchSnippets}
                />
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
