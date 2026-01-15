import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username, password);
    navigate("/login");
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-right">
          <div className="login-card">
            <h2>Create Account</h2>
            <p className="subtitle">Sign up to continue</p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Email / Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Sign Up</button>
            </form>

            <p style={{ marginTop: "10px" }}>
              Already have an account?{" "}
              <span
                style={{ color: "#007bff", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
