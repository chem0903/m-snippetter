import React, { useEffect, useState } from "react";
import "./Home.css";
import Snippet from "../../Components/Snippet/Snippet";
import Rightbar from "../../Components/Rightbar/Rightbar";
import { Link } from "react-router-dom";
import { useUser } from "../../Contexts/AuthUserContext";
import axios from "axios";

const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
const ORIGIN_API = process.env.REACT_APP_ORIGIN_API;

// ホーム画面コンポーネント
const Home = () => {
  const { authUser } = useUser();
  const [allSnippets, setAllSnippets] = useState([]);
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    const res = await axios.get(ORIGIN_API + "/posts/all");
    setAllSnippets(res.data);
    setSnippets(
      res.data.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt);
      })
    );
  };

  const followingSnippets = snippets.filter((snippet) => {
    return authUser.followings.some(
      (followingId) => snippet.authorId === followingId
    );
  });

  const toggleShowSnippets = (which) => {
    if (which === "all") setSnippets(allSnippets);
    else setSnippets(followingSnippets);
  };

  return (
    <div className="home-wrapper">
      <div className="container">
        <header className="header">
          <h1>Snippetter</h1>
          <Link to={`/profile/${authUser._id}`}>
            <img
              src={PUBLIC_FOLDER + authUser.profileImage}
              alt="Profile"
              className="profile-img"
            />
          </Link>
        </header>
        <main className="main">
          <div className="content">
            <div className="button-group">
              <button onClick={() => toggleShowSnippets("all")}>All</button>
              <button onClick={() => toggleShowSnippets("followings")}>
                Followings
              </button>
            </div>
            <ul className="snippet-list">
              {snippets.map((snippet) => (
                <Snippet
                  snippet={snippet}
                  key={snippet._id}
                  fetchSnippets={fetchSnippets}
                />
              ))}
            </ul>
          </div>
          <Rightbar />
        </main>
      </div>
    </div>
  );
};

export default Home;
