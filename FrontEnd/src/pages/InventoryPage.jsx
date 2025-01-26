import React from 'react';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background-img.jpg'; // Ensure you have this image in your assets folder

const InventoryPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (url) => {
    navigate(url);
  };

  const cardData = [
    {
      title: 'Product Management',
      icon: 'material-symbols:inventory-2-outline',
      url: '/produits',
    },
    {
      title: 'Machine Management',
      icon: 'material-symbols:precision-manufacturing-outline',
      url: '/machines',
    },

  ];

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 3,
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: 'white',
                boxShadow: 3,
                borderRadius: 2,
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: '0.3s ease-in-out',
                },
                cursor: 'pointer',
              }}
              onClick={() => handleCardClick(card.url)}
            >
              <CardContent sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
                <Icon icon={card.icon} style={{ fontSize: '4rem', color: '#1976d2' }} />
              </CardContent>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" component="h4" sx={{ color: '#1976d2' }}>
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InventoryPage;
