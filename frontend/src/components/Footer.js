import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Logo from '../assets/images/Logo.png';
import Form from './Form';
// import Card from './Card'; // Import the Card component

const Footer = () => (
  <Box mt="80px" bgcolor="rgb(15, 123, 181)" color="white">
    <Stack gap="40px" sx={{ alignItems: 'center' }} flexWrap="wrap" px="40px" pt="24px">
      <img src={Logo} alt=" Logo" style={{ width: '48px', height: '48px' }} />
      <Typography variant="h5" sx={{ fontSize: { lg: '24px', xs: '20px' } }} textAlign="center">
        &copy; 2025 Your Fitness Tracker_01. 
        All rights reserved.
      </Typography>
      
      <Box sx={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
        <Form />
      </Box>
      <Box sx={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
        {/* <Card />  */}
      </Box>
    </Stack>
  </Box>
);

export default Footer;