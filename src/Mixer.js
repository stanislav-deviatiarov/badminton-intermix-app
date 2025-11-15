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
import MotherOfAllRNG from './MotherOfAllRNG';

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

const tempPlayersList = [
  { "id": "48219037", "label": "Оленка К" },
  { "id": "30581649", "label": "Юрій Н" },
  { "id": "72943085", "label": "Діма З" },
  { "id": "18320496", "label": "Стас Д" },
  { "id": "96754023", "label": "Сергій Л" },
  { "id": "26073891", "label": "Оксана Ж" },
  { "id": "31486920", "label": "Дарія Б" },
  { "id": "80571642", "label": "Катя В" },
  { "id": "10958243", "label": "Іра В" },
  { "id": "64728109", "label": "Андрій Т" },
  { "id": "70849236", "label": "Діана С" },
  { "id": "19560438", "label": "Олесь Д" },
  { "id": "42317860", "label": "Катя Ч" },
  { "id": "87913204", "label": "Катя Б" },
  { "id": "60271938", "label": "Тарас Б" },
  { "id": "34789201", "label": "Володя Х" },
  { "id": "90482671", "label": "Рік М" },
  { "id": "71842950", "label": "Андрій П" },
  { "id": "50913462", "label": "Світлана С" },
  { "id": "23648790", "label": "Петро В" },
  { "id": "89052147", "label": "Таня П" },
  { "id": "63184029", "label": "Аня Д" },
  { "id": "70215984", "label": "Юра Б" },
  { "id": "15829460", "label": "Руслан Б" },
  { "id": "48193076", "label": "Ніна К" },
  { "id": "76439025", "label": "Ігор К" },
  { "id": "31975482", "label": "Галя Б" },
  { "id": "84561273", "label": "Наталя К" },
  { "id": "20496718", "label": "Арам К" },
  { "id": "95374810", "label": "Юра Ф" },
  { "id": "13789624", "label": "Наталя З" },
  { "id": "38962741", "label": "Андрій Д" },
  { "id": "61839524", "label": "Ігор Г" },
  { "id": "29468130", "label": "Вікторія К" },
  { "id": "50617298", "label": "Михайло П" },
  { "id": "47183092", "label": "Андрій В" },
  { "id": "68741952", "label": "Іван П" },
  { "id": "21360987", "label": "Остап Н" },
  { "id": "39467285", "label": "Марта П" },
  { "id": "82194360", "label": "Ростислав Г" },
  { "id": "10973284", "label": "Уляна Г" },
  { "id": "73019468", "label": "Антон Ф" },
  { "id": "95627381", "label": "Роксоланка Б" },
  { "id": "60124839", "label": "Арам К" },
  { "id": "27530946", "label": "Маріанна Н" },
  { "id": "34782016", "label": "Оля Д" },
  { "id": "57890214", "label": "Павло Ш" },
  { "id": "89276467", "label": "Ліля С" },
  { "id": "90382625", "label": "Богдан Л" },
  { "id": "48273619", "label": "Ігор П" },
  { "id": "91720458", "label": "Богдан Д" },
  { "id": "23018476", "label": "Мар'яна Л" },
  { "id": "70493215", "label": "Володя Б" },
  { "id": "16380927", "label": "Марічка Г" },
  { "id": "89501362", "label": "Сашко П" },
  { "id": "57420981", "label": "Денис В" },
  { "id": "69013847", "label": "Роксоланка Р" },
  { "id": "24876130", "label": "Еліна Б" },
  { "id": "91520764", "label": "Олег Д" },
  { "id": "83609125", "label": "Олександра З" },
  { "id": "19257460", "label": "Юра К" },
  { "id": "50813647", "label": "Володя О" },
  { "id": "63724901", "label": "Сашко А" },
  { "id": "75918264", "label": "Сашко М" },
  { "id": "48019273", "label": "Сергій П" },
  { "id": "83164709", "label": "Віка П" },
  { "id": "27961583", "label": "Влад М" },
  { "id": "84642425", "label": "Яна З" },
  { "id": "29652488", "label": "Мар'янка Г" },
  { "id": "66929426", "label": "Олег Б" },
  { "id": "95617349", "label": "Денис Д" },
  { "id": "62253843", "label": "Віталік Ф" },
  { "id": "95833076", "label": "Настя Б" },
  { "id": "90884610", "label": "Орест" }
];

function generateUniqueId(existingIds, length = 8) {
  let id;
  do {
    id = Math.floor(Math.random() * Math.pow(10, length))
      .toString()
      .padStart(length, '0');
  } while (existingIds.has(id));
  existingIds.add(id);
  return id;
}

export default function MixerPage() {
  const [playerObject, setPlayerObject] = useState(emptyPlayerObject);
  const [playerOptions, setPlayerOptions] = useState([]);
  const converted = ConvertPlayers(loadPlayersFromStorage());

  useEffect(() => {
    setPlayerOptions(tempPlayersList);
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
  const [lastMixedTime, setLastMixedTime] = useState(null);

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

  function getRandomInt(rng, min, max) {

    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(rng.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  function postStat(statObject) {
    saveMixedObjectToStorage(statObject);
  }

  function getDateTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    if (month.toString().length == 1) {
      month = '0' + month;
    }
    if (day.toString().length == 1) {
      day = '0' + day;
    }
    if (hour.toString().length == 1) {
      hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
      minute = '0' + minute;
    }
    if (second.toString().length == 1) {
      second = '0' + second;
    }
    let dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return dateTime;
  }

  function handleMixPlayers() {
    const activePlayers = players.filter(p => p.active);
    const activeCourts = courts.filter(c => c.active)
      .map(c => { return { ...c, players: [] } });

    console.log(activePlayers);

    if (activePlayers.length === 0 || activeCourts.length === 0) {
      setMixed([]);
      return;
    }

    const playersOnCourt = 4;
    const activePlayersCount = activePlayers.length;

    let usedPlayerIndexes = [];
    let currentCourtIndex = 0;

    let restingPlayers = [];

    let seed = Date.now();
    if (lastMixedTime !== null) {
      console.log('lastMixedTime: ' + lastMixedTime);
      seed = seed - lastMixedTime;
      setLastMixedTime(Date.now());
    } else {
      console.log('first mix');
      setLastMixedTime(seed);
    }

    console.log('seed: ' + seed);
    const rng = new MotherOfAllRNG(seed);

    if (activePlayersCount % 2 !== 0) {
      let randomPlayerIndex = getRandomInt(rng, 0, activePlayersCount - 1);
      restingPlayers.push(activePlayers[randomPlayerIndex].name);
      usedPlayerIndexes.push(randomPlayerIndex);
    }

    while (activePlayersCount - usedPlayerIndexes.length > 0) {
      let newIndex = getRandomInt(rng, 0, activePlayersCount - 1);
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
        <div><Paper elevation={5} sx={{ padding: 1 }} ><Typography variant="h5" gutterBottom>{resting.length > 1 ? 'Відпочивають' : 'Відпочиває'}</Typography>
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
          PaperComponent={({ children }) => (
            <Paper style={{ backgroundColor: '#003399', fontSize: 20, fontFamily: 'fantasy' }}>{children}</Paper>
          )}
          id="free-solo-demo"
          freeSolo
          options={playerOptions}
          sx={{ width: 400 }}
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
              helperText={errorMessage} />}
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