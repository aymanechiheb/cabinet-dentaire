/* eslint-disable react/prop-types */
// Card.jsx
import { Card, CardContent, Typography, Grid } from '@mui/material';

const CardComponent = ({ title, value, icon }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} style={{ margin: '20px' }}>
      <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
        <div style={{ marginBottom: '16px' }}>{icon}</div>
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="h4" color="text.secondary">
            {value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CardComponent;
