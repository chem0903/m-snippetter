import React from "react";
import Home from "./Pages/Home/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Post from "./Pages/Post/Post";
import "./App.css";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

const REPO_API = process.env.REACT_APP_REPO_API;

const App = () => {
  const authUser = JSON.parse(localStorage.getItem("user"));
  // https://chem0903.github.io/m-snippetter

  return (
    <Router basename={REPO_API}>
      <Routes>
        <Route path="*" element={authUser ? <Home /> : <Login />} />
        <Route
          path="/post"
          element={authUser ? <Post /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:id"
          element={authUser ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </Router>
  );
};

export default App;
