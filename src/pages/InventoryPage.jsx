import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import Home from '../assets/stock.jpg';

const InventoryPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (url) => {
    navigate(url); // Navigate to the given URL
  };

  return (
    <Box
      className="flex justify-center items-center min-h-screen"
      sx={{
        backgroundImage: `url(${Home})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      {/* Cards container */}
      <Grid container spacing={3} justifyContent="center">
        {/* Card 1 - Product */}
        <Grid item xs={12} sm={4}>
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
            onClick={() => handleCardClick('/produits')}
          >
            <CardContent sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
              <Icon
                icon="material-symbols-light:package-2-outline"
                style={{ fontSize: '4rem', color: '#1976d2' }}
              />
            </CardContent>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" component="h4" sx={{ color: '#1976d2' }}>
                Product Management
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2 - Machine */}
        <Grid item xs={12} sm={4}>
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
            onClick={() => handleCardClick('/machines')}
          >
            <CardContent sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
              <Icon
                icon="material-symbols-light:stethoscope"
                style={{ fontSize: '4rem', color: '#1976d2' }}
              />
            </CardContent>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" component="h4" sx={{ color: '#1976d2' }}>
                Machine Management
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 3 - Salle Consultation */}
        
      </Grid>
    </Box>
  );
};

export default InventoryPage;
