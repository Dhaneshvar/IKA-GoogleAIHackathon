import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingIcon from '../assets/ShoppingIconTransparentbg.png';
import GirlProfile from "../assets/girl.jpg";
const pages = ['Dashboard','Map'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
        {/* <AppBar position="static"   style={{ background: '#42557b', boxShadow: 'none'}}  sx={{mt:0}} elevation={0} >
             <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex', mt:2 } }}>
                <div id="google_translate_element" style={{float:'right'}}>
                </div>
            </Box> 
        </AppBar> */}
      <AppBar position="static"   style={{ background: '#153448' }} >
      <Container maxWidth="l">
        <Toolbar disableGutters>
            {/* <img src={ShoppingIcon} alt="Logo" className='logo' width={50} height={50} sx={{ width: 10, height: 10 }}   /> 
             <span className='brand' style={{paddingRight:10}}>IKA (Intelligent Kirana Assistant)</span> */}
            <Avatar  src={ShoppingIcon} alt="Logo" className='logo' sx={{ width: 100, height: 100}}  />
            {/* <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' ,  
            justifyContent: 'center', // Add this line to center vertically
            height: '6vh', }}> */}
            <Typography
            variant="h3"
            noWrap
            component="a"
            // href="#app-bar-with-responsive-menu"
            sx={{
              mr: 0,
              ml: 0,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              flexGrow: 1, // Add this line
              justifyContent: 'center', // Add this line
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            IKA - Intelligent Kirana Assistant
          </Typography>
          {/* <Typography
            variant="h5"
            noWrap
            component="a"
            // href="#app-bar-with-responsive-menu"
            sx={{
              mr: 0,
              ml: 0,
              // display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              flexGrow: 1, // Add this line
              justifyContent: 'center', // Add this line
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Empowering Kirana Stores: IKA, Your E-Commerce Co-Pilot 🛒✨
          </Typography> */}
            {/* </Box> */}
          <Box sx={{ flexGrow: 0, mr:0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={GirlProfile}   className='logo'  sx={{ width: 56, height: 56 }} />
                {/* <img src={GirlProfile} alt="Logo" className='logo' width={50} height={50}/> */}

              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              >
              {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0,  }}>
                {/* <Typography textAlign="center">Select your Language</Typography> */}
                <Typography
                variant="h5"
                noWrap
                component="a"
                // href="#app-bar-with-responsive-menu"
                sx={{
                mr: 0,
                ml: 0,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                flexGrow: 1, // Add this line
                justifyContent: 'center', // Add this line
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                }}
                >
                Select your Language
                </Typography>                  
                <div id="google_translate_element" 
                    style={{
                        float: 'right',
                        // backgroundColor: '#2e3b55', // Light grey background
                        borderRadius: '5px', // Rounded corners
                        padding: '2px', // Some padding
                        fontFamily: 'Arial, sans-serif', // Change the font if you like
                        color: '#40A2E3' // Dark grey text color
                    }}></div>
            </Box> 
        </Toolbar>
      </Container>
    </AppBar>
              </>
  );
}
export default ResponsiveAppBar;
