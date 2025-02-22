import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';

import Exercises from '../components/Exercises';
import SearchExercises from '../components/SearchExercises';
import HeroBanner from '../components/HeroBanner';

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');

  return (
    <Box>
      <HeroBanner />
      <Box sx={{ width: '400px', margin: '40px auto', padding: '20px' }}>
        <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        </Typography>
      </Box>
      <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
      <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
    </Box>
  );
};

export default Home;