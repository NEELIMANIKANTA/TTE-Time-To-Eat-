import { Link, useLocation } from 'react-router-dom';
import './navstyles.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand me-auto" to="/">Logo</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-center">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/veg' ? 'active' : ''}`} to="/veg">Veg</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/non-veg' ? 'active' : ''}`} to="/non-veg">Non-veg</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/signin' ? 'active' : ''}`} to="/signin">Sign In</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/signup' ? 'active' : ''}`} to="/signup">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`} to="/admin">Admin</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/logout' ? 'active' : ''}`} to="/logout">Logout</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`} to="/cart">Cart</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
