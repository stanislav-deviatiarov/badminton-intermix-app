export default function ItemList({itemClass, listElements, onToggle, onDelete}) {
    const listItems = listElements.map(p => <li key={p.id} className="list-group-item"><div className="listItem" data-active={p.active}>
      <label><input type="checkbox" checked={p.active}
      onChange={e => {
      onToggle(p.id, e.target.checked)
    }} /><span>{p.name}</span>
    <input type="button" className="deleteButton" onClick={e => onDelete(p.id)} value="-"/></label></div></li>);
    return <ul className={`list-group ${itemClass}`}>{listItems}</ul>;
  }