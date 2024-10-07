export default function ItemList({itemClass, listElements, onToggle}) {
    const listItems = listElements.map(p => <li><label><input type="checkbox" onChange={e => {
      onToggle(p.id, e.target.checked)
    }} />{p.name}</label></li>);
    return <ul className={itemClass}>{listItems}</ul>;
  }