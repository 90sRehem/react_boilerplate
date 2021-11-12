import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Landing = (): JSX.Element => {
  const navigate = useNavigate();
  const user = false;

  const handleStart = () => {
    if (user) {
      navigate('/app');
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <Box alignItems="center" justifyContent="center">
      <h1>Bem-vindo</h1>
      <Button onClick={handleStart}>Começar</Button>
    </Box>
  );
};
