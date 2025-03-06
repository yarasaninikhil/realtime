import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import { WbSunny, NightsStay } from '@mui/icons-material'; 
import './Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showEmail, setShowEmail] = useState(false); 
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light'); 

  useEffect(() => {

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.classList.add(savedTheme); 
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleEmailVisibility = () => {
    setShowEmail(!showEmail); 
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/'; 
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'; 
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); 
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(newTheme); 
  };

  return (
    <div className="Navbar">
      <h1 className="Travels">YNA Tours & Travels</h1>

      <div className="links">
        <ul>
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/About">About Us</Link></li>
          <li><Link to="/Contact">Contact Us</Link></li>
        </ul>
      </div>


      <div className="avatar-section">
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ bgcolor: deepOrange[500] }} onClick={toggleDropdown}>
            {user ? user.email.charAt(0).toUpperCase() : ''}
          </Avatar>
        </Stack>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <ul>
              <li>
                <a href="#" onClick={toggleEmailVisibility}>
                  Account
                </a>
                {showEmail && user && (
                  <p className="user-email">{user.email}</p> 
                )}
              </li>
              <li><a href="/" onClick={handleLogout}>LogOut</a></li> 
            </ul>
          </div>
        )}
      </div>

     
      <div className="hamburger" onClick={toggleMobileMenu}>
        <div className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></div>
        <div className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></div>
        <div className={`bar ${isMobileMenuOpen ? 'active' : ''}`}></div>
      </div>

      <div className={`side-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/Home" onClick={toggleMobileMenu}>Home</Link></li>
          <li><Link to="/About" onClick={toggleMobileMenu}>About Us</Link></li>
          <li><Link to="/Contact" onClick={toggleMobileMenu}>Contact Us</Link></li>
          {user && <li><a href="/" onClick={handleLogout}>LogOut</a></li>} 
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
