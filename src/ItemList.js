export default function ItemList({itemClass, listElements, onToggle, onDelete}) {
    const listItems = listElements.map(p => <li><div className="listItem" data-active={p.active}>
      <label><input type="checkbox" checked={p.active}
      onChange={e => {
      onToggle(p.id, e.target.checked)
    }} /><span>{p.name}</span>
    <input type="button" class="deleteButton" onClick={e => onDelete(p.id)} value="-"/></label></div></li>);
    return <ul className={itemClass}>{listItems}</ul>;
  }