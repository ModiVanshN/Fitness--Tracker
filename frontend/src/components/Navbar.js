import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Stack, Box, IconButton, Menu, MenuItem } from '@mui/material';
import Logo from '../assets/images/Logo.png';
import ThemeToggle from './ThemeToggle';
import MenuIcon from '../assets/images/menu-icon.png';

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const authToken = localStorage.getItem("authToken"); // Check login status

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
        alert("Logged out successfully!");
        navigate("/login");
    };

    return (
        <Stack direction="row" justifyContent="space-between" sx={{ gap: { sm: '122px', xs: '40px' }, mt: { sm: '32px', xs: '20px' }, justifyContent: 'none' }} px="20px">
            <Link to="/">
                <img src={Logo} alt="logo" style={{ width: '48px', height: '48px', margin: '0 20px' }} />
            </Link>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Stack direction="row" gap="40px" fontSize="24px" alignItems="flex-end">
                    <Link to="/" style={{ textDecoration: 'none', color: "rgb(15, 123, 181)" }} className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        Home
                    </Link>
                    <a href="#exercises" style={{ textDecoration: 'none', color: 'rgb(15, 123, 181)' }} className="nav-link">
                        Exercises
                    </a>
                    {!authToken ? (
                        <Link to="/login" style={{ textDecoration: 'none', color: "rgb(15, 123, 181)" }} className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}>
                            Login
                        </Link>
                    ) : (
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    )}
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: "rgb(15, 123, 181)" }} className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                        Dashboard
                    </Link>
                    <ThemeToggle />
                </Stack>
            </Box>

            {/* Mobile Navigation */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="menu"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <img src={MenuIcon} alt="Menu Icon" style={{ width: 24, height: 24 }} />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                >
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Link to="/" style={{ textDecoration: 'none', color: "rgb(15, 123, 181)" }}>
                            Home
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                        <a href="#exercises" style={{ textDecoration: 'none', color: 'rgb(15, 123, 181)' }}>
                            Exercises
                        </a>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                        {!authToken ? (
                            <Link to="/login" style={{ textDecoration: 'none', color: "rgb(15, 123, 181)" }}>
                                Login
                            </Link>
                        ) : (
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        )}
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Link to="/dashboard" style={{ textDecoration: 'none', color: "rgb(15, 123, 181)" }}>
                            Dashboard
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                        <ThemeToggle />
                    </MenuItem>
                </Menu>
            </Box>
        </Stack>
    );
};

export default Navbar;
