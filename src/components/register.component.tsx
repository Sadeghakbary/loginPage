import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const required = (value: string): string | null => {
  if (!value) {
    return "This field is required!";
  }
  return null;
};

const email = (value: string): string | null => {
  if (!value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return "This is not a valid email.";
  }
  return null;
};

const vusername = (value: string): string | null => {
  if (value.length < 3 || value.length > 20) {
    return "The username must be between 3 and 20 characters.";
  }
  return null;
};

const vpassword = (value: string): string | null => {
  if (value.length < 6 || value.length > 40) {
    return "The password must be between 6 and 40 characters.";
  }
  return null;
};

const Register: React.FC = () => {
  const { register, isLoading } = useAuth();
  
  const [username, setUsername] = useState("");
  const [emailState, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameError(null);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(null);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(null);
  };

  const validateForm = (): boolean => {
    let isValid = true;
    
    const usernameValidationError = required(username) || vusername(username);
    if (usernameValidationError) {
      setUsernameError(usernameValidationError);
      isValid = false;
    }

    const emailValidationError = required(emailState) || email(emailState);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      isValid = false;
    }

    const passwordValidationError = required(password) || vpassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    if (!validateForm()) {
      return;
    }

    try {
      await register(username, emailState, password);
      setMessage("Registration successful!");
      setSuccessful(true);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      setMessage(errorMessage);
      setSuccessful(false);
    }
  };

  return (
    <Box component="section" className="auth-shell">
      <Box className="auth-card">
        <Box className="auth-hero">
          <Box className="brand-pill">Arcadia</Box>
          <h1 className="hero-title">Build a profile clients trust.</h1>
          <p className="hero-copy">
            Create your account to manage deliveries, share updates, and grow your portfolio.
          </p>
          <Box className="hero-stats">
            <Box className="hero-stat">
              <span>24/7</span>
              <small>Secure account monitoring</small>
            </Box>
            <Box className="hero-stat">
              <span>1-click</span>
              <small>Team invitations</small>
            </Box>
          </Box>
        </Box>

        <Box className="auth-panel">
          <Box>
            <h2>Create account</h2>
            <p>Join the workspace and start delivering premium experiences.</p>
          </Box>

          <form onSubmit={handleRegister} className="auth-form">
            {!successful && (
              <>
                <Box className="form-field">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    className="auth-input"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Pick a unique handle"
                    aria-invalid={Boolean(usernameError)}
                    aria-describedby={usernameError ? "register-username-error" : undefined}
                  />
                  {usernameError ? (
                    <Box id="register-username-error" className="field-error" role="alert">
                      {usernameError}
                    </Box>
                  ) : (
                    <span className="field-hint">3-20 characters, no spaces.</span>
                  )}
                </Box>

                <Box className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="auth-input"
                    name="email"
                    value={emailState}
                    onChange={handleEmailChange}
                    placeholder="you@studio.com"
                    aria-invalid={Boolean(emailError)}
                    aria-describedby={emailError ? "register-email-error" : undefined}
                  />
                  {emailError ? (
                    <Box id="register-email-error" className="field-error" role="alert">
                      {emailError}
                    </Box>
                  ) : (
                    <span className="field-hint">We will never share your email.</span>
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
                    placeholder="Create a strong password"
                    aria-invalid={Boolean(passwordError)}
                    aria-describedby={passwordError ? "register-password-error" : undefined}
                  />
                  {passwordError ? (
                    <Box id="register-password-error" className="field-error" role="alert">
                      {passwordError}
                    </Box>
                  ) : (
                    <span className="field-hint">6-40 characters with letters and numbers.</span>
                  )}
                </Box>

                <Box className="auth-actions">
                  <label className="auth-check">
                    <input type="checkbox" defaultChecked />
                    I agree to the terms
                  </label>
                  <button className="auth-button" disabled={isLoading} type="submit">
                    {isLoading ? <span className="spinner" /> : "Create account"}
                  </button>
                </Box>
              </>
            )}

            {message && (
              <Box className={`auth-alert ${successful ? "success" : "error"}`} role="alert">
                {message}
              </Box>
            )}

            <Box className="auth-meta">
              <span>
                Already have access? <Link className="auth-link" to="/login">Sign in</Link>
              </span>
              <span>We review new accounts within 24 hours.</span>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
