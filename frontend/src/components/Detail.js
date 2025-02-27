import React from 'react';
import { Typography, Stack, Button } from '@mui/material';

import BodyPartImage from '../assets/icons/body-part.png';
import TargetImage from '../assets/icons/target.png';
import EquipmentImage from '../assets/icons/equipment.png';

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    }
  ]

  return (
    <Stack 
      gap="60px" 
      sx={{
        flexDirection: { lg: 'row' }, 
        p: '20px', 
        alignItems: 'center',
        borderRadius: '10px'
      }}
    >
      <img 
        src={gifUrl} 
        alt={name} 
        loading='lazy' 
        className='detail-image' 
        style={{ 
          borderRadius: '100px', 
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          opacity: 0.9 
        }}  
      />
      <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
        <Typography 
          variant='h3' 
          fontWeight="bold" 
          textTransform="capitalize"
          sx={{ color: 'rgb(15,123,181)' }}
        >
          {name}
        </Typography>
        <Typography variant='h6' sx={{ color: '#7f8c8d' }}>
          Exercises keep you strong. {name}{' '}
          is one of the best exercises to target your {target}. It will help you improve mood and gain energy.
        </Typography>
        {extraDetail.map((item) => (
          <Stack key={item.name} direction='row' gap='24px' alignItems='center'>
            <Button sx={{ background: '#fff2db', borderRadius: '50%', width: '100px', height: '100px' }}>
              <img src={item.icon} alt={bodyPart} style={{ width: '50px', height: '50px' }} />
            </Button>
            <Typography textTransform="capitalize" variant='h5' sx={{ color: 'rgb(15,123,181)' }}>
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

export default Detail;