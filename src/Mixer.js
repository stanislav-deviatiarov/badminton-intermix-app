import { useEffect, useState } from 'react';
import ItemList from './ItemList'
import { initialCourts } from './CourtsList'
import { savePlayersToStorage, loadPlayersFromStorage, saveCourtsToStorage, loadCourtsFromStorage, saveMixedObjectToStorage, loadDeviceIdFromStorage, saveDeviceIdToStorage } from './Storage'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MixedItem from './MixedItem';
import Paper from '@mui/material/Paper'
import Autocomplete from '@mui/material/Autocomplete';

function CreateNewId() {
  return Date.now().toString();
}

function ConvertPlayers(players) {
  let newPlayers = [];
  let shouldStore = false;
  for (let player of players) {
    if (player.id.toString().length < 5) {
      shouldStore = true;
      let currentId = player.id.toString();
      newPlayers.push({ ...player, id: CreateNewId() + currentId });
    } else {
      newPlayers.push(player);
    }
  }
  return { convertedPlayers: newPlayers, store: shouldStore };
}

function ConvertCourts(courts) {
  console.log(courts);
  for (let index = 0; index < 7; index++) {
    courts[index].id = index + 1; 
  }
  return courts;
}

const emptyPlayerObject = { id: '', label: '' };

const badmintonApiOrigin = 
//'https://localhost:7150';
'https://badminton-api.runasp.net';

export default function MixerPage() {
  const [playerObject, setPlayerObject] = useState(emptyPlayerObject);
  const [playerOptions, setPlayerOptions] = useState([]);
  const converted = ConvertPlayers(loadPlayersFromStorage());

  useEffect(() => {
    fetch(badmintonApiOrigin + '/api/Stat/GetAvailablePlayers', {
      method: 'GET',
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
    .then(response => response.json())
    .then(data => {
      setPlayerOptions(data.map(d => ({ id: d.id, label: d.name })));
    })
    .catch(console.error);
  }, []);

  let deviceId = loadDeviceIdFromStorage();
  if (deviceId === '') {
    deviceId = CreateNewId();
    saveDeviceIdToStorage(deviceId);
  }

  if (converted.store) {
    savePlayersToStorage(converted.convertedPlayers);
  }

  const [players, setPlayers] = useState(converted.convertedPlayers);
  let storedCourts = loadCourtsFromStorage();
  const [courts, setCourts] = useState(
    ConvertCourts(storedCourts.length === 0 ? initialCourts : storedCourts));
  const [mixed, setMixed] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  function handleAddNewPlayer() {
    if (playerObject.label === emptyPlayerObject.label) {
      setErrorMessage("Введіть ім'я гравця");
      return;
    }

    if (players.map(p => p.id).includes(playerObject.id)) {
      setErrorMessage("Такий гравець вже є у списку");
      return;
    }

    if (playerObject.id === emptyPlayerObject.id) {
      playerObject.id = CreateNewId();
    }

    let currentPlayer = { id: playerObject.id, name: playerObject.label, active: false };

    let nextPlayers = [
      ...players,
      currentPlayer
    ];

    savePlayersToStorage(nextPlayers);
    setPlayers(nextPlayers);
    setPlayerObject(emptyPlayerObject);
    setPlayerOptions([...playerOptions, playerObject]);
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

  function postStat(statObject) {
    saveMixedObjectToStorage(statObject);

    fetch(badmintonApiOrigin + '/api/Stat/PostGameDetails', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(statObject)
    })
    .then(response => console.log(response.status))
    .catch((response) => {
      console.log(response.status, response.statusText);
    });
  }

  function getDateTime() {
    let now     = new Date(); 
    let year    = now.getFullYear();
    let month   = now.getMonth()+1; 
    let day     = now.getDate();
    let hour    = now.getHours();
    let minute  = now.getMinutes();
    let second  = now.getSeconds(); 
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    let dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
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
    let localTime = getDateTime();
    postStat({ deviceId, localTime, activePlayers, activeCourts });
  }

  return (
  <Stack spacing={1}>
  <Typography variant="h5" gutterBottom>
  Крок 1: Оберіть гравців
  </Typography>
  <Stack direction={'row'} spacing={2}>
  <Autocomplete
    id="free-solo-demo"
    freeSolo
    options={playerOptions}
    sx = {{ width: 200 }}
    value={playerObject.label}
    onChange={(event, newValue) => {
      setErrorMessage('');
      if (newValue && newValue !== 'null') {
        setPlayerObject(newValue);
      }
    }}
    inputValue={playerObject.label}
    onInputChange={(event, newInputValue) => {
      setErrorMessage('');
      setPlayerObject({ id: '', label: newInputValue });
    }}
    renderInput={(params) =>
      <TextField
        {...params}
        label="Ім'я гравця" variant='standard'
        error={errorMessage !== ''}
        helperText={errorMessage}/>}
  />
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