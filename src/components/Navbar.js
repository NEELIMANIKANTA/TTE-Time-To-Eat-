import { Link, useLocation } from 'react-router-dom';
import './navstyles.css';

function Navbar() {
  const location = useLocation();
  const username = sessionStorage.getItem("username");

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand me-auto" to="/">
            <img className='logo' src='/images/logo.jpg' alt='logo'/>
          </Link>
          
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
                  <Link className={`nav-link ${location.pathname === '/non-veg' ? 'active' : ''}`} to="/nonveg">Non-veg</Link>
                </li>

                {username === "manikanta" || username==="deb" || username==="ratan" ? (
                  <>
                    <li className="nav-item">
                      <Link className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`} to="/admin">Admin</Link>
                    </li>
                  </>
                ) : null}
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/non-veg' ? 'active' : ''}`} to="/contactus">contact us</Link>
                </li>
                
              </ul>
            </div>
          </div>
          
          <div className="navbar-right">
            <i className="fas fa-search"></i>
            <div className="navbar-search-icon">
              <Link className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`} to="/cart"><i className="fas fa-shopping-cart"></i></Link>
              <div className="dot"></div>
            </div>
            
            {username ? (
              <button className='logout-btn'>
                <Link to="/logout">Logout</Link>
              </button>
            ) : (
              <button className='signin-btn'>
                      <Link  to="/signin">Sign in</Link>
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
