import { useState } from 'react';
import ItemList from './ItemList'
import { initialCourts } from './CourtsList'
import { savePlayersToStorage, loadPlayersFromStorage, saveCourtsToStorage, loadCourtsFromStorage } from './Storage'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MixedItem from './MixedItem';
import Paper from '@mui/material/Paper'

function CreateNewID() {
  return Date.now().toString();
}

function ConvertPlayers(players) {
  let newPlayers = [];
  let shouldStore = false;
  for (let player of players) {
    if (player.id.toString().length < 5) {
      shouldStore = true;
      let currentId = player.id.toString();
      newPlayers.push({ ...player, id: CreateNewID() + currentId });
    } else {
      newPlayers.push(player);
    }
  }
  return { convertedPlayers: newPlayers, store: shouldStore };
}

export default function MixerPage() {
  const [playerName, setPlayerName] = useState('');
  const converted = ConvertPlayers(loadPlayersFromStorage());

  if (converted.store) {
    savePlayersToStorage(converted.convertedPlayers);
  }

  const [players, setPlayers] = useState(converted.convertedPlayers);
  let storedCourts = loadCourtsFromStorage();
  const [courts, setCourts] = useState(storedCourts.length === 0 ? initialCourts : storedCourts);
  const [mixed, setMixed] = useState([]);

  function handleAddNewPlayer() {
    if (playerName === '') {
      return;
    }
    
    let nextPlayers = [
      ...players,
      { id: CreateNewID(), name: playerName, active: false }
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
        mixedCourts.push(<MixedItem courtName={court.name} courtPlayers={court.players} />);
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
      <div><Paper elevation={5} sx={{ padding: 1 }} ><Typography variant="h5" gutterBottom>{resting.length > 1 ? 'Відпочивають' : 'Відпочиває' }</Typography>
      <Stack>{resting}</Stack></Paper></div>);
    }

    setMixed(mixedCourts);
  }

  return (
  <Stack spacing={1}>
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
  );
}