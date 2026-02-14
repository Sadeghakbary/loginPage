import { Routes, Route, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useAuth } from './context/AuthContext';
import Home from './components/home.component';
import Login from './components/login.component';
import Register from './components/register.component';
import Profile from './components/profile.component';
import BoardUser from './components/board-user.component';
import BoardModerator from './components/board-moderator.component';
import BoardAdmin from './components/board-admin.component';
import { ProtectedRoute } from './components/ProtectedRoute';

const App = () => {
  const { user, logout, isLoading } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const showModeratorBoard = Boolean(user?.roles.includes('ROLE_MODERATOR'));
  const showAdminBoard = Boolean(user?.roles.includes('ROLE_ADMIN'));

  const handleLogOut = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!isAuthPage && (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          bezKoder
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to="/mod" className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to="/admin" className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {user && (
            <li className="nav-item">
              <Link to="/user" className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {user ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                {user.username}
              </Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogOut} className="nav-link btn btn-link">
                LogOut
              </button>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
        </nav>
      )}

      <div className={isAuthPage ? "" : "container mt-3"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['ROLE_MODERATOR']} />}>
            <Route path="/mod" element={<BoardModerator />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
            <Route path="/admin" element={<BoardAdmin />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
