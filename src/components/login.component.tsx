import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(null);
  };

  const validateForm = (): boolean => {
    let isValid = true;
    
    if (!username.trim()) {
      setUsernameError("This field is required!");
      isValid = false;
    }
    
    if (!password.trim()) {
      setPasswordError("This field is required!");
      isValid = false;
    }
    
    return isValid;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      await login(username, password);
      navigate("/profile");
      window.location.reload();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="section" className="auth-shell">
      <Box className="auth-card">
        <Box className="auth-hero">
          <Box className="brand-pill">Arcadia</Box>
          <h1 className="hero-title">Welcome back to your workspace.</h1>
          <p className="hero-copy">
            Sign in to keep your projects, sessions, and clients in perfect sync across devices.
          </p>
          <Box className="hero-stats">
            <Box className="hero-stat">
              <span>99.98%</span>
              <small>Uptime since launch</small>
            </Box>
            <Box className="hero-stat">
              <span>120ms</span>
              <small>Average response time</small>
            </Box>
          </Box>
        </Box>

        <Box className="auth-panel">
          <Box>
            <h2>Sign in</h2>
            <p>Use your verified credentials to access the platform.</p>
          </Box>

          <form onSubmit={handleLogin} className="auth-form">
            <Box className="form-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                className="auth-input"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Enter your username"
                aria-invalid={Boolean(usernameError)}
                aria-describedby={usernameError ? "username-error" : undefined}
              />
              {usernameError ? (
                <Box id="username-error" className="field-error" role="alert">
                  {usernameError}
                </Box>
              ) : (
                <span className="field-hint">Your workspace handle or email alias.</span>
              )}
            </Box>

            <Box className="form-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="auth-input"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                aria-invalid={Boolean(passwordError)}
                aria-describedby={passwordError ? "password-error" : undefined}
              />
              {passwordError ? (
                <Box id="password-error" className="field-error" role="alert">
                  {passwordError}
                </Box>
              ) : (
                <span className="field-hint">Minimum 6 characters.</span>
              )}
            </Box>

            <Box className="auth-actions">
              <label className="auth-check">
                <input type="checkbox" defaultChecked />
                Keep me signed in
              </label>
              <button className="auth-button" disabled={loading || isLoading} type="submit">
                {loading || isLoading ? <span className="spinner" /> : "Sign in"}
              </button>
            </Box>

            {message && (
              <Box className="auth-alert error" role="alert">
                {message}
              </Box>
            )}

            <Box className="auth-meta">
              <span>
                New here? <Link className="auth-link" to="/register">Create an account</Link>
              </span>
              <span>Protected by enterprise-grade encryption.</span>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
