import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authUser")
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser")) || null
  );

  // 🔹 SIGN UP
  const signup = (username, password) => {
    const newUser = { username, password };

    localStorage.setItem("registeredUser", JSON.stringify(newUser));
    return true;
  };

  // 🔹 LOGIN
  const login = (username, password) => {
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      setIsAuthenticated(true);
      setUser({ username });
      localStorage.setItem(
        "authUser",
        JSON.stringify({ username })
      );
      return true;
    }
    return false;
  };

  // 🔹 LOGOUT
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
