import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import loginIllustration from "../assets/login-illustration.png";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(username, password);
    if (success) {
      navigate("/generator");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-wrapper">
      {/* 🔑 IMPORTANT WRAPPER */}
      <div className="login-container">

        {/* LEFT IMAGE */}
        <div className="login-left">
          <img src={loginIllustration} alt="Login Illustration" />
        </div>

        {/* RIGHT FORM */}
        <div className="login-right">
          <div className="login-card">
            <h2>Hello, Welcome Back!</h2>
            <p className="subtitle">Login to continue</p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username / Email"
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
              <div className="login-options">
                <label className="remember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <a href="#" className="forgot">Forget Password?</a>
              </div>

              {error && <p className="error">{error}</p>}

              <p style={{ marginTop: "10px" }}>
                Don’t have an account?{" "}
                <span
                  style={{ color: "#007bff", cursor: "pointer" }}
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </span>
              </p> <br />

              <button type="submit">Login</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
