import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { AppBar, Toolbar } from '@mui/material';
import MixerPage from './Mixer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsPage from './Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';

const Pages = Object.freeze({
  Settings: Symbol("Налаштування"),
  Mixer: Symbol("Розміщення")
});

function MainPage() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState(Pages.Mixer);
  let mainPageTitle = page.description;
  let pageContent = null;

  switch (page) {
    case Pages.Settings:
      pageContent = <SettingsPage />;
      break;

    default:
    case Pages.Settings:
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
              <MenuItem onClick={event => { setPage(Pages.Mixer); setAnchorEl(null); }}>{Pages.Mixer.description}</MenuItem>
              <MenuItem onClick={event => { setPage(Pages.Settings); setAnchorEl(null); }}>{Pages.Settings.description}</MenuItem>
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