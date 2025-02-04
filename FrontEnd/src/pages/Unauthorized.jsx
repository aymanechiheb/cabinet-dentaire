import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f6f8',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: 3,
          padding: '40px',
          width: '100%',
        }}
      >
        <Typography variant="h3" sx={{ color: '#f44336', fontWeight: 'bold' }}>
          Access Denied
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '20px', color: '#555' }}>
          You do not have permission to view this page. Please contact your administrator if you believe this is an error.
        </Typography>
        <Button
          variant="contained"
          sx={{
            marginTop: '30px',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
          onClick={handleGoBack}
        >
          Go Back
        </Button>
      </Box>
    </Container>
  );
};

export default Unauthorized;
