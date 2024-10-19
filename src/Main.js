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
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { AppBar, Toolbar } from '@mui/material';
import { Block } from '@mui/icons-material';

function MainPage() {
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState(loadPlayersFromStorage());
  let storedCourts = loadCourtsFromStorage();
  const [courts, setCourts] = useState(storedCourts.length === 0 ? initialCourts : storedCourts);
  const [mixed, setMixed] = useState([]);
  const { mode, setMode } = useColorScheme();

  function handleAddNewPlayer() {
    if (playerName === '') {
      return;
    }
    
    let nextPlayers = [
      ...players,
      { id: players.length, name: playerName, active: false }
    ];

    savePlayersToStorage(nextPlayers);
    setPlayers(nextPlayers);
    setPlayerName('');
  }

  function handlePlayerToggle(id) {
    const nextPlayers = [...players];
    const currentPlayer = nextPlayers.find(p => p.id === id);
    currentPlayer.active = !currentPlayer.active;
    savePlayersToStorage(nextPlayers);
    setPlayers(nextPlayers);
  }

  function handlePlayerDelete(playerId) {
    const nextPlayers = players.filter(p => p.id !== playerId);

    for (let index in nextPlayers) {
      nextPlayers[index].id = index;
    }

    savePlayersToStorage(nextPlayers);
    setPlayers(nextPlayers);
  }

  function handleCourtToggle(id) {
    const nextCourts = [...courts];
    const currentCourt = nextCourts.find(c => c.id === id);
    currentCourt.active = !currentCourt.active;
    saveCourtsToStorage(nextCourts);
    setCourts(nextCourts);
  }

  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  function handleMixPlayers() {
    const activePlayers = players.filter(p => p.active);
    const activeCourts = courts.filter(c => c.active).map(c => { return { ...c, players: [] }});

    if (activePlayers.length === 0 || activeCourts.length === 0) {
      setMixed([]);
      return;
    }

    const playersOnCourt = 4;
    const activePlayersCount = activePlayers.length;

    let usedPlayerIndexes = [];
    let currentCourtIndex = 0;

    let restingPlayers = [];

    if (activePlayersCount % 2 !== 0) {
      let randomPlayerIndex = getRandomInt(0, activePlayersCount - 1);
      restingPlayers.push(activePlayers[randomPlayerIndex].name);
      usedPlayerIndexes.push(randomPlayerIndex);
    }

    while (activePlayersCount - usedPlayerIndexes.length > 0) {
      let newIndex = getRandomInt(0, activePlayersCount - 1);
      if (usedPlayerIndexes.find(i => i === newIndex) === undefined) {
        if (currentCourtIndex < activeCourts.length) {
          if (activeCourts[currentCourtIndex].players.length < playersOnCourt) {
            activeCourts[currentCourtIndex].players.push(activePlayers[newIndex].name);
            usedPlayerIndexes.push(newIndex);
          } else {
            currentCourtIndex++;
          }
        } else {
          break;
        }
      }
    }

    let mixedCourts = [];
    for (let court of activeCourts) {
      if (court.players.length > 0) {
        let courtPlayers = [];
        let firstItem = true;
        for (let player of court.players) {
          courtPlayers.push(<Typography variant="h6" gutterBottom>{player}</Typography>);
          firstItem = !firstItem;
        }
        mixedCourts.push(<div>
        <Typography variant="h5" gutterBottom>{court.name}</Typography>
        <Stack spacing={1}>{courtPlayers}</Stack></div>)
      }
    }

    if (restingPlayers.length !== 0 || activePlayersCount > usedPlayerIndexes.length) {
      for (let index = 0; index < activePlayers.length; index++) {
        if (!usedPlayerIndexes.includes(index)) {
          restingPlayers.push(activePlayers[index].name);
        }
      }

      let resting = [];
      for (let player of restingPlayers) {
        resting.push(<Typography variant="h6" gutterBottom>{player}</Typography>);
      }

      mixedCourts.push(
      <div><Typography variant="h5" gutterBottom>{resting.length > 1 ? 'Відпочивають' : 'Відпочиває' }</Typography>
      <Stack>{resting}</Stack></div>);
    }

    setMixed(mixedCourts);
  }

  const handleChange = (event) => {
    setMode(event.target.checked ? 'dark' : 'light');
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
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
            checked={mode === 'dark'}
            onChange={handleChange}
            aria-label='dark-theme-switch'
            />
          }
          label={mode === 'dark' ? 'Темна тема' : 'Світла тема'}
        />
      </FormGroup>
    </Toolbar>
  </AppBar>
  <Typography variant="h5" gutterBottom>
  Крок 1: Оберіть гравців
  </Typography>
  <Stack direction={'row'} spacing={2}>
  <TextField fullWidth label="Ім'я гравця" variant='standard' onChange={e => setPlayerName(e.target.value)} maxLength={12} value={playerName} />
  <Button variant='contained' onClick={handleAddNewPlayer} size='medium'>Додати</Button>
  </Stack>
  <ItemList listElements={players} onToggle={handlePlayerToggle} onDelete={handlePlayerDelete} allowDeletion={true} />
  <Typography variant="h5" gutterBottom>
  Крок 2: Оберіть корти
  </Typography>
  <ItemList listElements={courts} onToggle={handleCourtToggle} allowDeletion={false} />
  <Stack>
  <Button variant='contained' onClick={handleMixPlayers} size='medium'>Порахувати</Button>
  </Stack>
  <Stack spacing={2}>
  {mixed}
  </Stack>
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