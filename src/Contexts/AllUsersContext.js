// UserContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// ユーザーコンテキストを作成
const AllUsersContext = createContext();

const ORIGIN_API = process.env.REACT_APP_ORIGIN_API;

const fetchAllUser = async () => {
  return await axios.get(ORIGIN_API + "/users/all/users");
};

const { data: ALL_USERS } = await fetchAllUser();

// ユーザープロバイダーコンポーネント
export const AllUsersProvider = ({ children }) => {
  const [allUsers, setAllUsers] = useState(ALL_USERS);

  return (
    <AllUsersContext.Provider value={{ allUsers, setAllUsers }}>
      {children}
    </AllUsersContext.Provider>
  );
};

// ユーザーコンテキストのカスタムフック
export const useAllUsers = () => {
  return useContext(AllUsersContext);
};
