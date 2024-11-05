import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper'

export default function MixedItem({courtName, courtPlayers}) {
    let thisPlayers = [];
    let counter = 0;
    for (let player of courtPlayers) {
        thisPlayers.push(<Typography variant="h6" gutterBottom>{player}</Typography>);
        if (counter == 1) {
          thisPlayers.push(<Divider variant="inset" />);
        }
        counter++;
    }
    return (<div>
        <Paper elevation={5}
        sx={{
          padding: 1
        }}>
        <Typography variant="h5" gutterBottom>{courtName}</Typography>
        <Stack spacing={1}>{thisPlayers}</Stack></Paper></div>);
}