import { useEffect, useState } from 'react';
import ItemList from './ItemList'
import { initialCourts } from './CourtsList'
import { savePlayersToStorage, loadPlayersFromStorage, saveCourtsToStorage, loadCourtsFromStorage, saveMixedObjectToStorage, loadDeviceIdFromStorage, saveDeviceIdToStorage, savePairsToStorage, loadPairsFromStorage } from './Storage'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MixedItem from './MixedItem';
import Paper from '@mui/material/Paper'
import Autocomplete from '@mui/material/Autocomplete';
import MotherOfAllRNG from './MotherOfAllRNG';
import MenuItem from '@mui/material/MenuItem';

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

const emptyPlayerObject = { id: '', label: '', gender: '' };

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
  { "id": "90884610", "label": "Орест" },
  { "id": "18472635", "label": "Юра Я" },
  { "id": "92746108", "label": "Олег М" },
  { "id": "56301984", "label": "Володя М" },
  { "id": "74019562", "label": "Павло" },
  { "id": "31864027", "label": "Ліда К" },
  { "id": "65297041", "label": "Степан Р" },
  { "id": "89130456", "label": "Оля Р" },
  { "id": "47026891", "label": "Павло Ч" },
  { "id": "73901528", "label": "Ігор Ч" },
  { "id": "20578463", "label": "Юра Д" },
  { "id": "96417305", "label": "Костя Г" },
  { "id": "54109837", "label": "Дмитро Зв" },
  { "id": "80342671", "label": "Юра М" },
  { "id": "67291504", "label": "Анатолій" },
  { "id": "31490782", "label": "Ярослав К" },
  { "id": "75903146", "label": "Віка Ц" },
  { "id": "42861973", "label": "Юля Л" },
  { "id": "69024715", "label": "Лесик Г" },
  { "id": "15793468", "label": "Володя Осе" }
];

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
  const [pairs, setPairs] = useState(loadPairsFromStorage());
  let storedCourts = loadCourtsFromStorage();
  const [courts, setCourts] = useState(
    ConvertCourts(storedCourts.length === 0 ? initialCourts : storedCourts));
  const [mixed, setMixed] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [lastMixedTime, setLastMixedTime] = useState(null);

  function handleGenderChange(newGender) {
    setErrorMessage('');
    setPlayerObject(prev => ({ ...prev, gender: newGender }));
  }

  function handleAddNewPlayer() {
    if (playerObject.label === emptyPlayerObject.label) {
      setErrorMessage("Введіть ім'я гравця");
      return;
    }

    if (!playerObject.gender || playerObject.gender === '') {
      setErrorMessage("Оберіть стать гравця");
      return;
    }

    if (players.map(p => p.id).includes(playerObject.id)) {
      setErrorMessage("Такий гравець вже є у списку");
      return;
    }

    if (playerObject.id === emptyPlayerObject.id) {
      playerObject.id = CreateNewId();
    }

    let currentPlayer = { id: playerObject.id, name: playerObject.label, active: false, gender: playerObject.gender };

    let nextPlayers = [
      ...players,
      currentPlayer
    ];

    savePlayersToStorage(nextPlayers);
    setPlayers(nextPlayers);
    setPlayerObject(emptyPlayerObject);
    setPlayerOptions([...playerOptions, { id: playerObject.id, label: playerObject.label }]);
  }

  function handlePlayerToggle(id) {
    const nextPlayers = [...players];
    const currentPlayer = nextPlayers.find(p => p.id === id);
    currentPlayer.active = !currentPlayer.active;
    savePlayersToStorage(nextPlayers);
    setPlayers(nextPlayers);
  }

  function handlePairToggle(id) {
    const nextPairs = [...pairs];
    const currentPair = nextPairs.find(p => p.id === id);
    if (currentPair) {
      currentPair.active = !currentPair.active;
      savePairsToStorage(nextPairs);
      setPairs(nextPairs);
    }
  }

  function handlePlayerDelete(playerId) {
    const nextPlayers = players.filter(p => p.id !== playerId);
    const nextPairs = pairs.filter(pair => !pair.playerIds.includes(playerId));
    savePlayersToStorage(nextPlayers);
    savePairsToStorage(nextPairs);
    setPlayers(nextPlayers);
    setPairs(nextPairs);
  }

  function handleCourtToggle(id) {
    const nextCourts = [...courts];
    const currentCourt = nextCourts.find(c => c.id === id);
    currentCourt.active = !currentCourt.active;
    saveCourtsToStorage(nextCourts);
    setCourts(nextCourts);
  }

  function shuffleArray(rng, array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(rng.random() * (i + 1));
      const temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
    return result;
  }

  function generateAssignment(rng, activePlayers, activeCourts, allPairs) {
    const playersOnCourt = 4;
    const playerById = new Map(players.map(p => [p.id, p]));

    const activePairs = allPairs.filter(pair =>
      pair.playerIds &&
      pair.playerIds.length === 2 &&
      pair.playerIds.every(id => activePlayers.some(p => p.id === id))
    );

    const usedInPairIds = new Set();
    for (let pair of activePairs) {
      for (let pid of pair.playerIds) {
        usedInPairIds.add(pid);
      }
    }

    const singlePlayers = activePlayers.filter(p => !usedInPairIds.has(p.id));

    const units = [];

    for (let pair of activePairs) {
      const members = pair.playerIds.map(id => playerById.get(id)).filter(Boolean);
      if (members.length === 2) {
        units.push({ type: 'pair', players: members, pairId: pair.id });
      }
    }

    for (let p of singlePlayers) {
      units.push({ type: 'single', players: [p] });
    }

    const shuffledUnits = shuffleArray(rng, units);

    const courtsWithTeams = activeCourts.map(court => ({
      ...court,
      teams: [[], []]
    }));

    let courtIndex = 0;
    const restingUnits = [];

    for (let unit of shuffledUnits) {
      if (courtIndex >= courtsWithTeams.length) {
        restingUnits.push(unit);
        continue;
      }

      let placed = false;
      let searchIndex = courtIndex;

      while (searchIndex < courtsWithTeams.length && !placed) {
        const court = courtsWithTeams[searchIndex];
        const totalPlayersOnCourt = court.teams[0].length + court.teams[1].length;
        const remainingSlots = playersOnCourt - totalPlayersOnCourt;

        if (unit.players.length <= remainingSlots) {
          const firstTeamFree = playersOnCourt - (court.teams[0].length + unit.players.length) >= 0;
          const secondTeamFree = playersOnCourt - (court.teams[1].length + unit.players.length) >= 0;

          if (firstTeamFree && (court.teams[0].length <= court.teams[1].length || !secondTeamFree)) {
            court.teams[0].push(...unit.players);
          } else if (secondTeamFree) {
            court.teams[1].push(...unit.players);
          } else {
            searchIndex++;
            continue;
          }

          placed = true;
        } else {
          searchIndex++;
        }
      }

      if (!placed) {
        restingUnits.push(unit);
      }
    }

    return { courtsWithTeams, restingUnits, activePairsUsed: activePairs };
  }

  function hasMixedPairOnCourt(courtPlayers, allPairs, playerById) {
    const courtIds = courtPlayers.map(p => p.id);
    for (let pair of allPairs) {
      if (!pair.playerIds || pair.playerIds.length !== 2) continue;
      const [a, b] = pair.playerIds;
      if (courtIds.includes(a) && courtIds.includes(b)) {
        const pa = playerById.get(a);
        const pb = playerById.get(b);
        if (pa && pb && pa.gender && pb.gender && pa.gender !== pb.gender) {
          return true;
        }
      }
    }
    return false;
  }

  function isAssignmentValid(courtsWithTeams, allPairs, allPlayers) {
    const playerById = new Map(allPlayers.map(p => [p.id, p]));
    for (let court of courtsWithTeams) {
      const courtPlayers = [...court.teams[0], ...court.teams[1]];
      if (courtPlayers.length === 0) {
        continue;
      }

      const menCount = courtPlayers.filter(p => p.gender === 'male').length;
      const womenCount = courtPlayers.filter(p => p.gender === 'female').length;

      const mixedPairPresent = hasMixedPairOnCourt(courtPlayers, allPairs, playerById);

      if (!mixedPairPresent && womenCount === 1 && menCount === 3) {
        return false;
      }
    }
    return true;
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
    const pad = (num) => num.toString().padStart(2, '0');
    const now = new Date();
    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1);
    const day = pad(now.getDate());
    const hour = pad(now.getHours());
    const minute = pad(now.getMinutes());
    const second = pad(now.getSeconds());
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
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
    const rngBase = new MotherOfAllRNG(seed);

    let bestResult = null;
    const maxAttempts = 20;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const rng = new MotherOfAllRNG(seed + attempt);
      const { courtsWithTeams, restingUnits, activePairsUsed } = generateAssignment(rng, activePlayers, activeCourts, pairs);
      if (isAssignmentValid(courtsWithTeams, activePairsUsed, players)) {
        bestResult = { courtsWithTeams, restingUnits, activePairsUsed };
        break;
      }
      if (!bestResult) {
        bestResult = { courtsWithTeams, restingUnits, activePairsUsed };
      }
    }

    if (!bestResult) {
      setMixed([]);
      return;
    }

    const { courtsWithTeams, restingUnits, activePairsUsed } = bestResult;

    let mixedCourts = [];
    for (let court of courtsWithTeams) {
      const courtPlayers = [...court.teams[0], ...court.teams[1]];
      if (courtPlayers.length > 0) {
        const courtPlayerNames = courtPlayers.map(p => p.name);
        mixedCourts.push(<MixedItem courtName={court.name} courtPlayers={courtPlayerNames} />);
      }
    }

    const restingPlayers = [];
    for (let unit of restingUnits) {
      for (let p of unit.players) {
        restingPlayers.push(p.name);
      }
    }

    if (restingPlayers.length !== 0) {
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
    postStat({ deviceId, localTime, activePlayers, courtsWithTeams, restingPlayers, activePairs: activePairsUsed });
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
            setPlayerObject(prev => ({ id: '', label: newInputValue, gender: prev.gender || '' }));
          }}
          renderInput={(params) =>
            <TextField
              {...params}
              label="Ім'я гравця" variant='standard'
              error={errorMessage !== ''}
              helperText={errorMessage} />}
        />
        <TextField
          select
          label="Стать"
          variant='standard'
          value={playerObject.gender}
          sx={{ width: 150 }}
          onChange={(event) => handleGenderChange(event.target.value)}
        >
          <MenuItem value="male">Чоловік</MenuItem>
          <MenuItem value="female">Жінка</MenuItem>
        </TextField>
        <Button variant='contained' onClick={handleAddNewPlayer} size='medium'>Додати</Button>
      </Stack>
      <ItemList listElements={players} onToggle={handlePlayerToggle} onDelete={handlePlayerDelete} allowDeletion={true} />
      <Stack direction={'row'} spacing={2} sx={{ marginTop: 1, marginBottom: 1 }}>
        <Button variant='outlined' onClick={() => {
          const selectedPlayers = players.filter(p => p.active);
          if (selectedPlayers.length !== 2) {
            setErrorMessage("Оберіть рівно двох гравців для створення пари");
            return;
          }
          const [p1, p2] = selectedPlayers;
          if (pairs.some(pair => pair.playerIds && (pair.playerIds.includes(p1.id) || pair.playerIds.includes(p2.id)))) {
            setErrorMessage("Один з обраних гравців вже є у парі");
            return;
          }
          const newPair = {
            id: CreateNewId(),
            name: `${p1.name} + ${p2.name}`,
            active: false,
            playerIds: [p1.id, p2.id]
          };
          const nextPairs = [...pairs, newPair];
          savePairsToStorage(nextPairs);
          setPairs(nextPairs);
        }} size='medium'>Зробити пару</Button>
        <Button variant='outlined' onClick={() => {
          const selectedPairs = pairs.filter(p => p.active);
          if (selectedPairs.length === 0) {
            setErrorMessage("Оберіть пару для розділення");
            return;
          }
          const remainingPairs = pairs.filter(p => !p.active);
          savePairsToStorage(remainingPairs);
          setPairs(remainingPairs);
        }} size='medium'>Розділити пару</Button>
      </Stack>
      {pairs.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Пари
          </Typography>
          <ItemList listElements={pairs} onToggle={handlePairToggle} allowDeletion={false} />
        </>
      )}
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