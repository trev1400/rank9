import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'; 
import Typography from '@mui/material/Typography';

function Home() {  
  return (
    <div className="root">
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{padding: 3}}
      >
        <Typography variant="h1" color="white">Rank 9</Typography>
        <Typography variant="subtitle1" color="#C8C8C8">One goal: reach Rank 9.</Typography>
        <Button href="/solo" variant="contained" size="large" fullWidth={true} sx={{borderRadius: 10, fontWeight: 700, paddingY: 1.5}}>Solo</Button>
        <Button href="/solo" variant="contained" size="large" fullWidth={true} sx={{borderRadius: 10, fontWeight: 700, paddingY: 1.5, backgroundColor:'#6CFF8E'}}>Collaborative</Button>
        <Button href="/solo" variant="contained" size="large" fullWidth={true} sx={{borderRadius: 10, fontWeight: 700, paddingY: 1.5, backgroundColor:'#FF6CA4'}}>Head-to-Head</Button>
      </Stack>
    </div>
  );
}

export default Home;
