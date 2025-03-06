import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";
import { Menu, X } from "lucide-react";
import "./AdminNav.css";

const AdminNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = { email: "yarasaninikhil@gmail.com" }; 

 
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/"); 
  };

  return (
    <nav className="admin-nav">
      <div className="nav-header">
        <Stack direction="row" spacing={2} className="avatar-section">
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {user.email.charAt(0).toUpperCase()}
          </Avatar>
          <h2 className="email-text">{user.email}</h2>
        </Stack>

        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <ul className={`admin-nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/AdminHome">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin">Add New Tour</Link>
        </li>
       
        <li>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
