import './Interface.css';
import { useState } from 'react';
import ItemList from './ItemList'
import { initialCourts } from './CourtsList'
import { savePlayersToStorage, loadPlayersFromStorage, saveCourtsToStorage, loadCourtsFromStorage } from './Storage'

function DefaultPage() {
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState(loadPlayersFromStorage());
  let storedCourts = loadCourtsFromStorage();
  const [courts, setCourts] = useState(storedCourts.length === 0 ? initialCourts : storedCourts);
  const [mixed, setMixed] = useState([]);

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

  function handlePlayerToggle(id, checked) {
    const nextPlayers = [...players];
    const currentPlayer = nextPlayers.find(p => p.id === id);
    currentPlayer.active = checked;
    savePlayersToStorage(nextPlayers);
    setPlayers(nextPlayers);
  }

  function handlePlayerDelete(playerId) {
    const nextPlayers = players.filter(p => p.id !== playerId);
    savePlayersToStorage(nextPlayers);
    setPlayers(nextPlayers);
  }

  function handleCourtToggle(id, checked) {
    const nextCourts = [...courts];
    const currentCourt = nextCourts.find(c => c.id === id);
    currentCourt.active = checked;
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
          courtPlayers.push(<li className={firstItem ? 'first' : 'second'}>{player}</li>);
          firstItem = !firstItem;
        }
        mixedCourts.push(<div className='mix-block-result'><h1>{court.name}</h1><ul>{courtPlayers}</ul></div>)
      }
    }

    if (restingPlayers.length !== 0 || activePlayersCount > usedPlayerIndexes.length) {
      restingPlayers = restingPlayers.concat(activePlayers.filter(ap => !usedPlayerIndexes.includes(ap.id)).map(rp => rp.name));
      let resting = [];
      for (let player of restingPlayers) {
        resting.push(<li>{player}</li>);
      }
      mixedCourts.push(
      <div className='mix-block-result'><h1>{resting.length > 1 ? 'Відпочивають' : 'Відпочиває' }</h1>
      <ul className='resting'>{resting}</ul></div>);
    }

    setMixed(mixedCourts);
  }

  return ( 
  <>
  <div className='players-back'>
    <h1>Список гравців</h1>
    <div className='addNewPlayer'>
      <input type='text' maxLength={12} onChange={e => setPlayerName(e.target.value)}
      value={playerName} placeholder='До 12 символів' />
      <input type='button' value='Додати' style={{'margin-left': '5px'}} onClick={handleAddNewPlayer} />
    </div>
    <ItemList itemClass="players" listElements={players} onToggle={handlePlayerToggle} onDelete={handlePlayerDelete} />
  </div>
  <div className='courts-back'>
    <h1>Список кортів</h1>
    <ItemList itemClass="courts" listElements={courts} onToggle={handleCourtToggle} />
  </div>
  <div className='mix-back'>
    <input type='button' value='Розмістити гравців на кортах' style={{'margin-bottom': '5px'}} onClick={handleMixPlayers} />
    {mixed}
  </div>
  </>
  );
}

export default DefaultPage;
