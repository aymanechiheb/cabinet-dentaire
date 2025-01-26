import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import Home from '../assets/home.avif';

const ResourcesPage = () => {
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
        {/* Card 1 - Dent */}
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
            onClick={() => handleCardClick('/dents')}
          >
            <CardContent sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
              <Icon
                icon="material-symbols-light:dentistry-outline"
                style={{ fontSize: '4rem', color: '#1976d2' }}
              />
            </CardContent>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" component="h4" sx={{ color: '#1976d2' }}>
                Dent 
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2 - Soin */}
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
            onClick={() => handleCardClick('/soins')}
          >
            <CardContent sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
              <Icon
                icon="mdi:heart-pulse"
                style={{ fontSize: '4rem', color: '#1976d2' }}
              />
            </CardContent>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" component="h4" sx={{ color: '#1976d2' }}>
                Soin
              </Typography>
            </CardContent>
          </Card>
        </Grid>
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
            onClick={() => handleCardClick('/salles')}
          >
            <CardContent sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
              <Icon
                icon="material-symbols-light:door-sliding-outline-sharp"
                style={{ fontSize: '4rem', color: '#1976d2' }}
              />
            </CardContent>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" component="h4" sx={{ color: '#1976d2' }}>
                Salle Consultation
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResourcesPage;
