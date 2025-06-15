import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "./Register.css"; 

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState(""); // New state for validation errors
  const navigate = useNavigate();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/; // Regex for strong password validation

    if (form.name.trim() === "") {
      setValidationError("Name is required.");
      return false;
    }
    if (!emailRegex.test(form.email)) {
      setValidationError("Please enter a valid email address.");
      return false;
    }
    if (!passwordRegex.test(form.password)) {
      setValidationError(
        "Password must be at least 6 characters long and include at least one capital letter, one number, and one symbol."
      );
      return false;
    }
    setValidationError(""); // Clear validation errors if valid
    return true;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
    if (validationError) setValidationError(""); // Clear validation errors on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Validate form before submitting

    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="background-pattern"></div>
      <div className="floating-blob floating-blob-1"></div>
      <div className="floating-blob floating-blob-2"></div>
      
      <div className="register-wrapper">
        <div className="register-header">
          <div className="logo-container">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="m22 21-2-2"/>
              <path d="m16 16 2-2"/>
            </svg>
          </div>
          <h1 className="app-title">Create Account</h1>
          <p className="app-subtitle">Join us and start your journey</p>
        </div>

        <div className="register-card">
          <form onSubmit={handleSubmit} className="register-form">
            {error && <div className="error-message">{error}</div>}
            {validationError && <div className="validation-error">{validationError}</div>} {/* Display validation errors */}

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrapper">
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="password-wrapper">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="form-input password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`submit-button ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="m22 21-2-2"/>
                    <path d="m16 16 2-2"/>
                  </svg>
                  Create Account
                </>
              )}
            </button>

            <p className="terms-text">
              By creating an account, you agree to our{' '}
              <a href="/terms" className="terms-link">Terms of Service</a>{' '}
              and{' '}
              <a href="/privacy" className="terms-link">Privacy Policy</a>
            </p>
          </form>

          <div className="login-link">
            <p>
              Already have an account?{' '}
              <a href="/login" className="login-button">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}