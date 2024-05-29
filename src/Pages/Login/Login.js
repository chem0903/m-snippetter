import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useAllUsers } from "../../Contexts/AllUsersContext";
import { useUser } from "../../Contexts/AuthUserContext";

const Login = () => {
  const { allUsers } = useAllUsers();
  const { authUser, setAuthUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // ! ちょっとしたバグあり

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
      setErrors(newErrors);
      return;
    } else {
      const authUser = getAuthUser();
      setAuthUser(authUser || null);
    }
    if (!authUser) {
      newErrors.email = "User doesn't Exsist";
      setErrors(newErrors);
      return;
    }
    if (!password) {
      newErrors.password = "Password is required";
      setErrors(newErrors);
      return;
    } else if (authUser.password !== password) {
      newErrors.password = "Invalid Password";
      setErrors(newErrors);
      return;
    } else {
      setEmail("");
      setPassword("");
      localStorage.setItem("user", JSON.stringify(authUser));
      window.location.reload();
    }
  };

  const getAuthUser = () => {
    const authUser = allUsers.find((user) => email === user.email);
    return authUser;
  };

  useEffect(() => {
    setTimeout(() => {
      setErrors("");
    }, 10000);
  }, [errors]);

  return (
    <>
      <div className={styles.loginContainer}>
        <div>
          <h1 className={styles.title}>Snippetter</h1>
        </div>
        <div className={styles.loginBox}>
          <h2>Login</h2>
          <form onSubmit={(e) => handleLogin(e)}>
            <div className={styles.userBox}>
              <input
                type="text"
                name="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>email</label>
              <span className={styles.error}>{errors.email}</span>
            </div>
            <div className={styles.userBox}>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
              <span className={styles.error}>{errors.password}</span>
            </div>
            <button type="submit" style={{ display: "none" }}></button>
          </form>
          <Link to="/register">
            <button className={styles.loginButton}>新規登録はこちらから</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
