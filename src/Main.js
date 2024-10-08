import './Interface.css';
import { useState } from 'react';
import ItemList from './ItemList'
import { initialCourts } from './CourtsList'

function DefaultPage() {
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState('');
  const [courts, setCourts] = useState(initialCourts);
  const [mixed, setMixed] = useState([]);

  function handleAddNewPlayer() {
    if (playerName === '') {
      return;
    }
    
    setPlayers([
      ...players,
      { id: players.length, name: playerName, active: false }
    ]);
    setPlayerName('');
  }

  function handlePlayerToggle(id, checked) {
    const nextPlayers = [...players];
    const currentPlayer = nextPlayers.find(p => p.id === id);
    currentPlayer.active = checked;
    setPlayers(nextPlayers);
  }

  function handleCourtToggle(id, checked) {
    const nextCourts = [...courts];
    const currentCourt = nextCourts.find(c => c.id === id);
    currentCourt.active = checked;
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

    var usedPlayerIndexes = [];
    var currentCourtIndex = 0;

    while (activePlayersCount - usedPlayerIndexes.length > 0) {
      var newIndex = getRandomInt(0, activePlayersCount - 1);
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

    var mixedCourts = [];
    for (var court of activeCourts) {
      if (court.players.length > 0) {
        var courtPlayers = [];
        for (var player of court.players) {
          courtPlayers.push(<li>{player}</li>);
        }
        mixedCourts.push(<div className='mix-block-result'><h1>{court.name}</h1><ul>{courtPlayers}</ul></div>)
      }
    }

    setMixed(mixedCourts);
  }

  return ( 
  <>
  <div className='players-back'>
    <h1>Список гравців</h1>
    <input type='text' onChange={e => setPlayerName(e.target.value)} value={playerName} />
    <input type='button' value='Додати гравця' style={{'margin-left': '5px'}} onClick={handleAddNewPlayer} />
    <ItemList itemClass="players" listElements={players} onToggle={handlePlayerToggle} />
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
