import React, { useState } from "react";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAllUsers } from "../../Contexts/AllUsersContext";

const ORIGIN_API = process.env.REACT_APP_ORIGIN_API;

const Register = () => {
  const { setAllUsers } = useAllUsers();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Username  is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const reqBody = {
        name: name,
        email: email,
        password: password,
      };
      await axios.post(ORIGIN_API + "/users/register", reqBody);
      const allUsers = fetchAllUsers();
      setAllUsers(allUsers);
      navigate("/login");
      window.location.reload();
    }
  };

  const fetchAllUsers = async () => {
    return await axios.get(ORIGIN_API + "/users/all/users");
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <div>
          <h1 className={styles.title}>Snippetter</h1>
        </div>
        <div className={styles.loginBox}>
          <h2>Create New Account</h2>
          <form onSubmit={(e) => handleRegister(e)}>
            <div className={styles.userBox}>
              <input
                type="text"
                name="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>username</label>
              <span className={styles.error}>{errors.name}</span>
            </div>
            <div className={styles.userBox}>
              <input
                type="email"
                name="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>email</label>
              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </div>
            <div className={styles.userBox}>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
              {errors.password && (
                <span className={styles.error}>{errors.password}</span>
              )}
            </div>
            <div className={styles.userBox}>
              <input
                type="password"
                name="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label>Comfirm Password</label>
              {errors.confirmPassword && (
                <span className={styles.error}>{errors.confirmPassword}</span>
              )}
            </div>
            <button type="submit" style={{ display: "none" }}></button>
          </form>
          <Link to="/login">
            <button className={styles.loginButton}>
              すでにアカウントをお持ちの方はこちらから
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
