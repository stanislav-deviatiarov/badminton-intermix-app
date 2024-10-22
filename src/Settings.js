import { useColorScheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Container from '@mui/material/Container';

export default function SettingsPage() {
    const { mode, setMode } = useColorScheme();

    return (
        <Container
        style={{
            border: "0",
            minWidth: "100%",
            height: "100vh",
          }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                  checked={mode === 'dark'}
                  onChange={(event) => {
                    setMode(event.target.checked ? 'dark' : 'light');
                  }}
                  aria-label='dark-theme-switch'
                  />
                }
                label={mode === 'dark' ? 'Темна тема' : 'Світла тема'}
              />
          </FormGroup>
        </Container>
    );
}