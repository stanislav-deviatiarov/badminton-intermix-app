import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBox from '@mui/icons-material/CheckBox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function ItemList({itemClass, listElements, onToggle, onDelete}) {
    const listItems = listElements.map(p => <li><div className="listItem" data-active={p.active}>
      <FormControlLabel label={p.name} control={<CheckBox checked={p.active} size='small' color='info' onChange={e => {
      onToggle(p.id, e.target.checked)
    }}/>} />
      
      {/* <input type="checkbox" checked={p.active}
      onChange={e => {
      onToggle(p.id, e.target.checked)
    }} /><span>{p.name}</span> */}
    <IconButton aria-label="delete" onClick={e => onDelete(p.id)} size='large'>
      <DeleteIcon />
    </IconButton>
    </div></li>);
    return <ul className={itemClass}>{listItems}</ul>;
  }