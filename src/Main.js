import { useState } from 'react';
import ItemList from './ItemList'
import { initialCourts } from './CourtsList'
import { savePlayersToStorage, loadPlayersFromStorage, saveCourtsToStorage, loadCourtsFromStorage } from './Storage'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { AppBar, Toolbar } from '@mui/material';
import { Block } from '@mui/icons-material';
import MixerPage from './Mixer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsPage from './Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';

function MainPage() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState('Mixer');
  let mainPageTitle = '';
  let pageContent = null;

  switch (page) {
    case 'Settings':
      mainPageTitle = 'Налаштування';
      pageContent = <SettingsPage />;
      break;

    default:
    case 'Mixer':
      mainPageTitle = 'Розташування';
      pageContent = <MixerPage />;
      break;
  }

  return (
    <Box
    sx={{
      bgcolor: 'background.default',
      color: 'text.primary',
      padding: 1
    }}>
      <Stack spacing={1}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={event => setAnchorEl(event.currentTarget)}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={event => setAnchorEl(null)}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={event => { setPage('Mixer'); setAnchorEl(null); }}>Розташування</MenuItem>
              <MenuItem onClick={event => { setPage('Settings'); setAnchorEl(null); }}>Налаштування</MenuItem>
            </Menu>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {mainPageTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        {pageContent}
      </Stack>
    </Box>
  );
}

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export default function ColorModePage() {
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  );
}