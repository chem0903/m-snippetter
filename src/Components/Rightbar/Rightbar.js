import React from "react";
import "./Rightbar.css";
import { Link } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";
import LogoutIcon from "@mui/icons-material/Logout";

const Rightbar = () => {
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear(); // 全てのデータを削除
    window.location.reload();
  };

  return (
    <div className="rightbar">
      <Link to="/post">
        <PostAddIcon className="icon" />
      </Link>
      <Link to="/login">
        <LogoutIcon className="icon" onClick={(e) => handleLogout(e)} />
      </Link>
    </div>
  );
};

export default Rightbar;
