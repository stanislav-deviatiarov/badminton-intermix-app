import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ItemList({allowDeletion, listElements, onToggle, onDelete}) {
  return (
    <List>
      {listElements.map(p => {
        const labelId = `checkbox-list-label-${p.id}`;
      return (
        <ListItem style={{padding: 0}} key={p.id}
        secondaryAction={ allowDeletion ?
        <IconButton aria-label="delete" onClick={e => onDelete(p.id)} size='large'>
          <DeleteIcon fontSize='inherit' />
        </IconButton> : undefined
      }
      >
        <ListItemButton role={undefined} onClick={e => onToggle(p.id)} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={p.active}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
              size='large'
              />
          </ListItemIcon>
          <ListItemText id={labelId} primary={p.name} />
        </ListItemButton>
      </ListItem>)})}
    </List>
  );
  }