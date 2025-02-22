import React from 'react'
import {Box, Typography, Button } from '@mui/material';
// import Card from './Card';
import HeroBanner from '../assets/images/gym.png'

const HeroBannner = () => {
  return (
    <Box sx={{mt: {lg: '212px', xs: '70px'}, ml: {sm: '50px'}}} position="relative" p="20px">
    <Typography color="rgb(15, 123, 181)" fontWeight="600" fontSize="26px">Fitness Club</Typography>
    <Typography fontWeight={700} sx={{fontSize: {lg: '44px', xs:'40px'}}} mb="23px" mt="30px">
      Sweat, Smile <br/> and Repeat
    </Typography>
    <Typography fontSize= "22px" lineHeight="35px" mb={4}>
      Check out the most effective exercises
    </Typography>
    <Button variant='contained' color='error' href='#exercises' sx={{backgroundColor: 'rgb(15, 123, 181)', padding: '10px'}}>Explore Exercises</Button>
    <Typography
    fontWeight={600}
    color='rgb(15, 123, 181)'
    sx={{
      opacity: 0.1,
      display: {lg:'block', xs:'none'},
      fontSize: '200px'
    }}>
     FITNESS 
    </Typography>
    <img src={HeroBanner} alt="" className='hero-banner-img' style={{opacity: '0.9'}} />
      
    </Box>
  )
}

export default HeroBannner
