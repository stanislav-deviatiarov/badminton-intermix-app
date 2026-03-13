import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MixerPage from './Mixer';
import Typography from '@mui/material/Typography';

function MainPage() {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        padding: 1,
        minHeight: '100vh',
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h5" component="div">
          Розміщення
        </Typography>
        <MixerPage />
      </Stack>
    </Box>
  );
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#121212',
    },
  },
});

export default function ColorModePage() {
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  );
}