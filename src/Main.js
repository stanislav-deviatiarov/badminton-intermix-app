import './Interface.css';
import { useState } from 'react';

const initialCourts = [
  { id: 0, name: 'Корт №1', active: false },
  { id: 1, name: 'Корт №2', active: false },
  { id: 2, name: 'Корт №3', active: false },
  { id: 3, name: 'Корт №4', active: false },
  { id: 4, name: 'Корт №5', active: false },
  { id: 5, name: 'Корт №6', active: false },
  { id: 6, name: 'Корт №7', active: false }
];

function ItemList({itemClass, listElements, onToggle}) {
  const listItems = listElements.map(p => <li><label><input type="checkbox" onChange={e => {
    onToggle(p.id, e.target.checked)
  }} />{p.name}</label></li>);
  return <ul className={itemClass}>{listItems}</ul>;
}

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

  function handleMixPlayers() {
    const activePlayers = players.filter(p => p.active);
    const activeCourts = courts.filter(c => c.active);

    if (activePlayers.length === 0 || activeCourts.length === 0) {
      return;
    }


  }

  return ( 
  <>
  <h1>Список гравців</h1>
  <input type='text' onChange={e => setPlayerName(e.target.value)} value={playerName} />
  <input type='button' value='Додати гравця' onClick={handleAddNewPlayer} />
  <ItemList itemClass="players" listElements={players} onToggle={handlePlayerToggle} />
  <h1>Список кортів</h1>
  <ItemList itemClass="courts" listElements={courts} onToggle={handleCourtToggle} />
  <input type='button' value='Розмістити гравців на кортах' onClick={handleMixPlayers} />
  </>
  );
}

export default DefaultPage;
