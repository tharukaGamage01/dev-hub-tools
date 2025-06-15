import { useState } from "react";
import { Eye, EyeOff, Code2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
        const res = await api.post("/auth/login", form);
        localStorage.setItem("token", res.data.token);
        navigate("/toolList"); 
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="background-pattern"></div>
      
      <div className="floating-blob floating-blob-1"></div>
      <div className="floating-blob floating-blob-2"></div>
      
      <div className="login-wrapper">
        <div className="login-header">
          <div className="logo-container">
            <Code2 size={32} />
          </div>
          <h1 className="app-title">Dev Hub</h1>
          <p className="app-subtitle">Access your development tools</p>
        </div>

        <div className="login-card">
          <div className="login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="input-wrapper">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper password-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="form-input password-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className={`submit-button ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="spinner" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </div>

          <div className="demo-credentials">
            <p className="demo-title">Demo Credentials:</p>
            <p className="demo-info">
              Email: demo@dev.com | Password: password
            </p>
          </div>
        </div>

        <div className="signup-link">
          <p>
            Don't have an account?{" "}
            <a href="/Register" className="signup-button">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}