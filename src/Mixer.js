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
  const [restOffset, setRestOffset] = useState(0);
  const [lastCourt7PlayerIds, setLastCourt7PlayerIds] = useState([]);
  const [lastCourt7PairIds, setLastCourt7PairIds] = useState([]);

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

  /** Stronger seed: time delta + crypto bytes when available (better than time alone). */
  function buildMixSeed(lastMixedTime) {
    let base = Date.now();
    if (lastMixedTime !== null) {
      base -= lastMixedTime;
    }
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const buf = new Uint32Array(2);
      crypto.getRandomValues(buf);
      const extra = (Number(buf[0]) * 0x100000000 + Number(buf[1])) % 2147483647;
      return (base ^ extra) >>> 0;
    }
    return base >>> 0;
  }

  function isCourtSeven(court) {
    return court.id === 7 || (court.name && court.name.toString().includes('7'));
  }

  function courtPlayerTotal(court) {
    return court.teams[0].length + court.teams[1].length;
  }

  function isUnitBannedOnCourtSeven(unit, bannedForCourt7, court) {
    if (!isCourtSeven(court)) return false;
    if (unit.type === 'pair' && unit.pairId && bannedForCourt7.bannedPairIds.has(unit.pairId)) {
      return true;
    }
    if (unit.players.some(p => bannedForCourt7.bannedPlayerIds.has(p.id))) {
      return true;
    }
    return false;
  }

  /**
   * Doubles layout: max 2 players per side, max 4 per court.
   * Pair units always go on one side together (never split across courts or sides).
   */
  function tryPlaceUnitOnCourt(court, unit, bannedForCourt7, rng) {
    if (isUnitBannedOnCourtSeven(unit, bannedForCourt7, court)) {
      return false;
    }

    if (unit.type === 'pair') {
      if (unit.players.length !== 2) return false;
      if (courtPlayerTotal(court) + 2 > 4) return false;
      const sides = shuffleArray(rng, [0, 1]);
      for (const side of sides) {
        if (court.teams[side].length === 0) {
          court.teams[side].push(unit.players[0], unit.players[1]);
          return true;
        }
      }
      return false;
    }

    const p = unit.players[0];
    if (courtPlayerTotal(court) >= 4) return false;
    const sides = shuffleArray(rng, [0, 1]);
    for (const side of sides) {
      if (court.teams[side].length < 2) {
        court.teams[side].push(p);
        return true;
      }
    }
    return false;
  }

  function generateAssignment(rng, units, activeCourts, bannedForCourt7) {
    const totalPlayersIn = units.reduce((s, u) => s + u.players.length, 0);
    const totalCapacity = activeCourts.length * 4;

    function placeOnce() {
      // Pairs first (each needs an empty side); then singles — avoids gridlock rest with free capacity.
      const pairUnits = units.filter(u => u.type === 'pair');
      const singleUnits = units.filter(u => u.type === 'single');
      const shuffledUnits = [...shuffleArray(rng, pairUnits), ...shuffleArray(rng, singleUnits)];

      const courtsWithTeams = activeCourts.map(court => ({
        ...court,
        teams: [[], []]
      }));

      const restingUnits = [];
      const placedPairIds = new Set();
      const courtIndices = shuffleArray(rng, courtsWithTeams.map((_, i) => i));

      for (let unit of shuffledUnits) {
        let placed = false;
        for (let k = 0; k < courtIndices.length && !placed; k++) {
          const court = courtsWithTeams[courtIndices[k]];
          if (tryPlaceUnitOnCourt(court, unit, bannedForCourt7, rng)) {
            placed = true;
            if (unit.type === 'pair' && unit.pairId) {
              placedPairIds.add(unit.pairId);
            }
          }
        }
        if (!placed) {
          restingUnits.push(unit);
        }
      }

      return { courtsWithTeams, restingUnits, placedPairIds };
    }

    let result = placeOnce();
    if (result.restingUnits.length > 0 && totalPlayersIn <= totalCapacity) {
      const second = placeOnce();
      const restP = u => u.reduce((s, x) => s + x.players.length, 0);
      if (restP(second.restingUnits) < restP(result.restingUnits)) {
        result = second;
      }
    }
    return result;
  }

  /**
   * Split players into groups; only merge two players if they belong to the same
   * merged pair unit this round (pairsLocked). Do not merge DB pairs when they play as singles.
   */
  function buildPairGroupsOnCourt(playersOnCourt, pairsLocked) {
    const used = new Set();
    const groups = [];
    for (const p of playersOnCourt) {
      if (used.has(p.id)) continue;
      const pid = getPartnerId(p.id, pairsLocked);
      const partner = pid ? playersOnCourt.find(x => x.id === pid) : null;
      if (partner && !used.has(partner.id)) {
        used.add(p.id);
        used.add(partner.id);
        groups.push([p, partner]);
      } else {
        used.add(p.id);
        groups.push([p]);
      }
    }
    return groups;
  }

  /** Put 4 players on court as 2+2 without splitting merged pairs across teams. */
  function placeFourPlayersPreservingPairs(court, fourPlayers, pairsLocked) {
    if (fourPlayers.length !== 4) return;
    const groups = buildPairGroupsOnCourt(fourPlayers, pairsLocked);
    if (groups.length === 2 && groups[0].length === 2 && groups[1].length === 2) {
      court.teams[0] = [...groups[0]];
      court.teams[1] = [...groups[1]];
      return;
    }
    if (groups.length === 3) {
      const pairG = groups.find(g => g.length === 2);
      const singles = groups.filter(g => g.length === 1).map(g => g[0]);
      if (pairG && singles.length === 2) {
        court.teams[0] = [...pairG];
        court.teams[1] = [...singles];
        return;
      }
    }
    court.teams[0] = fourPlayers.slice(0, 2);
    court.teams[1] = fourPlayers.slice(2, 4);
  }

  function getPartnerId(playerId, allPairs) {
    for (const pair of allPairs) {
      if (!pair.playerIds || pair.playerIds.length !== 2) continue;
      const [a, b] = pair.playerIds;
      if (a === playerId) return b;
      if (b === playerId) return a;
    }
    return null;
  }

  function flattenCourtPlayers(court) {
    return [...court.teams[0], ...court.teams[1]];
  }

  function removePlayerFromCourt(court, playerId) {
    for (const side of [0, 1]) {
      const idx = court.teams[side].findIndex(p => p.id === playerId);
      if (idx >= 0) {
        const [removed] = court.teams[side].splice(idx, 1);
        return removed;
      }
    }
    return null;
  }

  function setCourtFromFourPlayers(court, fourPlayers) {
    court.teams[0] = [fourPlayers[0], fourPlayers[1]];
    court.teams[1] = [fourPlayers[2], fourPlayers[3]];
  }

  function isSideAllMale(team) {
    return team.length === 2 && team.every(p => p.gender === 'male');
  }

  function isSideAllFemale(team) {
    return team.length === 2 && team.every(p => p.gender === 'female');
  }

  function pairPartnersOnSameSide(court, p1, p2) {
    const on0 = court.teams[0].some(p => p.id === p1.id) && court.teams[0].some(p => p.id === p2.id);
    const on1 = court.teams[1].some(p => p.id === p1.id) && court.teams[1].some(p => p.id === p2.id);
    return on0 || on1;
  }

  function allPairsIntactOnCourt(court, pairsLocked) {
    const all = flattenCourtPlayers(court);
    const ids = new Set(all.map(p => p.id));
    for (const pr of pairsLocked) {
      if (!pr.playerIds || pr.playerIds.length !== 2) continue;
      const [a, b] = pr.playerIds;
      if (ids.has(a) && ids.has(b)) {
        const pa = all.find(p => p.id === a);
        const pb = all.find(p => p.id === b);
        if (pa && pb && !pairPartnersOnSameSide(court, pa, pb)) {
          return false;
        }
      }
    }
    return true;
  }

  /** MM vs WW on opposite sides → cross-swap to two mixed sides (M+W vs M+W). */
  function fixHomogeneousOppositeSides(court, pairsLocked) {
    if (court.teams[0].length !== 2 || court.teams[1].length !== 2) return;
    const mmVsWw = isSideAllMale(court.teams[0]) && isSideAllFemale(court.teams[1]);
    const wwVsMm = isSideAllFemale(court.teams[0]) && isSideAllMale(court.teams[1]);
    if (!mmVsWw && !wwVsMm) return;

    const next = [...court.teams[0], ...court.teams[1]];
    // [A,B] vs [C,D] → [A,C] vs [B,D] (one from each side)
    setCourtFromFourPlayers(court, [next[0], next[2], next[1], next[3]]);
    if (!allPairsIntactOnCourt(court, pairsLocked)) {
      setCourtFromFourPlayers(court, next);
    }
  }

  function findSoloGenderToRemove(allOnCourt, gender, pairsLocked) {
    for (const p of allOnCourt) {
      if (p.gender !== gender) continue;
      const pid = getPartnerId(p.id, pairsLocked);
      if (!pid) return p;
      const partnerHere = allOnCourt.some(x => x.id === pid);
      if (!partnerHere) return p;
    }
    return allOnCourt.find(p => p.gender === gender) ?? null;
  }

  /**
   * 3M+1W or 1M+3W: swap with rest when possible, then normalize to 2+2 and mixed doubles.
   */
  function fixThreeOneWithRest(court, restPool, pairsLocked) {
    let all = flattenCourtPlayers(court);
    if (all.length !== 4 || restPool.length === 0) return;

    let m = all.filter(p => p.gender === 'male').length;
    let w = all.filter(p => p.gender === 'female').length;

    if (m === 3 && w === 1) {
      const womanFromRest = restPool.find(p => p.gender === 'female');
      const manToRest = findSoloGenderToRemove(all, 'male', pairsLocked);
      if (womanFromRest && manToRest) {
        removePlayerFromCourt(court, manToRest.id);
        restPool.push(manToRest);
        const ri = restPool.findIndex(p => p.id === womanFromRest.id);
        if (ri >= 0) restPool.splice(ri, 1);
        all = flattenCourtPlayers(court);
        all.push(womanFromRest);
        if (all.length === 4) {
          placeFourPlayersPreservingPairs(court, all, pairsLocked);
        }
      }
    } else if (m === 1 && w === 3) {
      const manFromRest = restPool.find(p => p.gender === 'male');
      const womanToRest = findSoloGenderToRemove(all, 'female', pairsLocked);
      if (manFromRest && womanToRest) {
        removePlayerFromCourt(court, womanToRest.id);
        restPool.push(womanToRest);
        const ri = restPool.findIndex(p => p.id === manFromRest.id);
        if (ri >= 0) restPool.splice(ri, 1);
        all = flattenCourtPlayers(court);
        all.push(manFromRest);
        if (all.length === 4) {
          placeFourPlayersPreservingPairs(court, all, pairsLocked);
        }
      }
    }
  }

  /**
   * With exactly 2M+2W, prefer M+W vs M+W without splitting fixed pairs (incl. M+M / W+W pairs).
   */
  function arrangeTwoMixedDoubles(court, pairsLocked) {
    const all = flattenCourtPlayers(court);
    if (all.length !== 4) return;
    const men = all.filter(p => p.gender === 'male');
    const women = all.filter(p => p.gender === 'female');
    if (men.length !== 2 || women.length !== 2) return;

    const groups = buildPairGroupsOnCourt(all, pairsLocked);

    if (groups.length === 2 && groups[0].length === 2 && groups[1].length === 2) {
      court.teams[0] = [...groups[0]];
      court.teams[1] = [...groups[1]];
      return;
    }

    if (groups.length === 3) {
      const pairG = groups.find(g => g.length === 2);
      const singles = groups.filter(g => g.length === 1).map(g => g[0]);
      if (pairG && singles.length === 2) {
        court.teams[0] = [...pairG];
        court.teams[1] = [...singles];
        return;
      }
    }

    const permutations = [
      [[men[0], women[0]], [men[1], women[1]]],
      [[men[0], women[1]], [men[1], women[0]]],
      [[men[1], women[0]], [men[0], women[1]]],
      [[men[1], women[1]], [men[0], women[0]]]
    ];
    for (const [t0, t1] of permutations) {
      court.teams[0] = [...t0];
      court.teams[1] = [...t1];
      if (allPairsIntactOnCourt(court, pairsLocked)) {
        return;
      }
    }
    placeFourPlayersPreservingPairs(court, all, pairsLocked);
  }

  function applyCourtGenderAndRestFixes(courtsWithTeams, restPool, pairsLocked) {
    for (const court of courtsWithTeams) {
      let all = flattenCourtPlayers(court);
      if (all.length !== 4) continue;

      fixThreeOneWithRest(court, restPool, pairsLocked);
      all = flattenCourtPlayers(court);
      if (all.length === 4) {
        placeFourPlayersPreservingPairs(court, all, pairsLocked);
      }

      all = flattenCourtPlayers(court);
      if (all.length === 4) {
        const m = all.filter(p => p.gender === 'male').length;
        const w = all.filter(p => p.gender === 'female').length;
        if (m === 2 && w === 2) {
          arrangeTwoMixedDoubles(court, pairsLocked);
        }
        fixHomogeneousOppositeSides(court, pairsLocked);
      }
    }
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
    const selectedPlayers = players.filter(p => p.active);
    const selectedPairs = pairs.filter(pair => pair.active);
    const activeCourts = courts.filter(c => c.active)
      .map(c => { return { ...c, players: [] } });

    if (selectedPlayers.length === 0 && selectedPairs.length === 0 || activeCourts.length === 0) {
      setMixed([]);
      return;
    }

    const playerById = new Map(players.map(p => [p.id, p]));

    const pairUnits = [];
    const playersUsedInPair = new Set();

    for (let pair of selectedPairs) {
      if (!pair.playerIds || pair.playerIds.length !== 2) continue;
      const [aId, bId] = pair.playerIds;
      const a = playerById.get(aId);
      const b = playerById.get(bId);
      if (!a || !b) continue;
      // Pair participates as one unit when neither member is ticked in the players list;
      // placement keeps both on the same side (see tryPlaceUnitOnCourt).
      if (!a.active && !b.active) {
        pairUnits.push({ type: 'pair', players: [a, b], pairId: pair.id });
        playersUsedInPair.add(aId);
        playersUsedInPair.add(bId);
      }
    }

    const singlePlayers = selectedPlayers.filter(p => !playersUsedInPair.has(p.id));

    const allUnits = [
      ...pairUnits,
      ...singlePlayers.map(p => ({ type: 'single', players: [p] }))
    ];

    const pairsLocked = pairs.filter(p => pairUnits.some(u => u.pairId === p.id));

    if (allUnits.length === 0) {
      setMixed([]);
      return;
    }

    let seed;
    if (lastMixedTime !== null) {
      console.log('lastMixedTime: ' + lastMixedTime);
      seed = buildMixSeed(lastMixedTime);
      setLastMixedTime(Date.now());
    } else {
      console.log('first mix');
      seed = buildMixSeed(null);
      setLastMixedTime(Date.now());
    }

    console.log('seed: ' + seed);

    // Determine how many players must rest and rotate them, but never under-fill courts
    const playersOnCourt = 4;
    const totalPlayersCount = allUnits.reduce((sum, unit) => sum + unit.players.length, 0);
    const totalCapacity = activeCourts.length * playersOnCourt;
    let restPlayersCount = 0;
    if (totalPlayersCount > totalCapacity) {
      restPlayersCount = totalPlayersCount - totalCapacity;
    }

    let rotationRestUnits = [];
    let playingUnits = allUnits;

    if (restPlayersCount > 0) {
      const orderedUnits = [...allUnits].sort((a, b) => {
        const aKey = a.type === 'pair' ? `P-${a.pairId}` : `S-${a.players[0].id}`;
        const bKey = b.type === 'pair' ? `P-${b.pairId}` : `S-${b.players[0].id}`;
        return aKey.localeCompare(bKey);
      });

      const totalUnitCount = orderedUnits.length;
      let offset = totalUnitCount === 0 ? 0 : restOffset % totalUnitCount;
      const chosenRestingUnits = [];
      let restedPlayers = 0;
      let visited = 0;

      while (restedPlayers < restPlayersCount && visited < totalUnitCount) {
        const unit = orderedUnits[offset];
        chosenRestingUnits.push(unit);
        restedPlayers += unit.players.length;
        offset = (offset + 1) % totalUnitCount;
        visited++;
      }

      // If we removed too many players and would under-fill courts, move some units back to play
      let playingPlayersCount = totalPlayersCount - restedPlayers;
      while (playingPlayersCount < totalCapacity && chosenRestingUnits.length > 0) {
        const returnedUnit = chosenRestingUnits.pop();
        playingPlayersCount += returnedUnit.players.length;
      }

      setRestOffset(offset);

      const restingSet = new Set(chosenRestingUnits);
      rotationRestUnits = chosenRestingUnits;
      playingUnits = allUnits.filter(u => !restingSet.has(u));
    }

    // Only avoid repeats on court 7 when it does not risk under-filling courts
    const bannedForCourt7 = totalPlayersCount >= totalCapacity
      ? { bannedPlayerIds: new Set(), bannedPairIds: new Set() }
      : {
          bannedPlayerIds: new Set(lastCourt7PlayerIds),
          bannedPairIds: new Set(lastCourt7PairIds)
        };

    let bestResult = null;
    const maxAttempts = 20;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const rng = new MotherOfAllRNG(seed + attempt);
      const { courtsWithTeams, restingUnits, placedPairIds } = generateAssignment(rng, playingUnits, activeCourts, bannedForCourt7);
      const activePairsUsed = pairs.filter(p => placedPairIds.has(p.id));

      const restPool = [];
      const seenRest = new Set();
      for (const u of rotationRestUnits) {
        for (const p of u.players) {
          if (!seenRest.has(p.id)) {
            seenRest.add(p.id);
            restPool.push(p);
          }
        }
      }
      for (const u of restingUnits) {
        for (const p of u.players) {
          if (!seenRest.has(p.id)) {
            seenRest.add(p.id);
            restPool.push(p);
          }
        }
      }

      applyCourtGenderAndRestFixes(courtsWithTeams, restPool, pairsLocked);

      if (isAssignmentValid(courtsWithTeams, activePairsUsed, players)) {
        bestResult = { courtsWithTeams, activePairsUsed, finalRestPool: restPool.slice() };
        break;
      }
      if (!bestResult) {
        bestResult = { courtsWithTeams, activePairsUsed, finalRestPool: restPool.slice() };
      }
    }

    if (!bestResult) {
      setMixed([]);
      return;
    }

    const { courtsWithTeams, activePairsUsed, finalRestPool } = bestResult;

    let mixedCourts = [];
    for (let court of courtsWithTeams) {
      const courtPlayers = [...court.teams[0], ...court.teams[1]];
      if (courtPlayers.length > 0) {
        mixedCourts.push(<MixedItem key={court.id} courtName={court.name} courtPlayers={courtPlayers} />);
      }
    }

    const restingPlayers = [];
    const seenRestingPlayerIds = new Set();
    for (const p of finalRestPool) {
      if (!seenRestingPlayerIds.has(p.id)) {
        seenRestingPlayerIds.add(p.id);
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

    // Track who was on court 7 in this mix
    const court7 = courtsWithTeams.find(c => c.id === 7);
    let nextLastCourt7PlayerIds = [];
    let nextLastCourt7PairIds = [];
    if (court7) {
      const court7Players = [...court7.teams[0], ...court7.teams[1]];
      nextLastCourt7PlayerIds = court7Players.map(p => p.id);
      for (let pair of activePairsUsed) {
        if (pair.playerIds && pair.playerIds.length === 2) {
          const [aId, bId] = pair.playerIds;
          if (nextLastCourt7PlayerIds.includes(aId) && nextLastCourt7PlayerIds.includes(bId)) {
            nextLastCourt7PairIds.push(pair.id);
          }
        }
      }
    }
    setLastCourt7PlayerIds(nextLastCourt7PlayerIds);
    setLastCourt7PairIds(nextLastCourt7PairIds);

    const allParticipantsPlayers = allUnits.flatMap(unit => unit.players);

    setMixed(mixedCourts);
    let localTime = getDateTime();
    postStat({ deviceId, localTime, activePlayers: allParticipantsPlayers, courtsWithTeams, restingPlayers, activePairs: activePairsUsed });
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