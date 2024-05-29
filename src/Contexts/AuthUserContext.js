// UserContext.js
import React, { createContext, useContext, useState } from "react";

// ユーザーコンテキストを作成
const AuthUserContext = createContext();

const storageUser = JSON.parse(localStorage.getItem("user"));

// ユーザープロバイダーコンポーネント
export const AuthUserProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(storageUser);

  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};

// ユーザーコンテキストのカスタムフック
export const useUser = () => {
  return useContext(AuthUserContext);
};
