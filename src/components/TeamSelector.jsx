import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  const [FavoriteTeam, seFavoriteTeam] = React.useState('');

  const handleChange = (event) => {
    seFavoriteTeam(event.target.value);
    props.GetFavorite(event.target.value)
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Favorite Team</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={FavoriteTeam}
          label="Favorite Team"
          onChange={handleChange}
        >
          <MenuItem value={'None'}>None</MenuItem>
          <MenuItem value={'Knicks'}>Knicks</MenuItem>
          <MenuItem value={'Dallas'}>Dallas</MenuItem>
          <MenuItem value={'Golden States'}>Golden State</MenuItem>
          <MenuItem value={'Chicago Bulls'}>Chicago Bulls</MenuItem>
          <MenuItem value={'Portland'}>Portland</MenuItem>
          <MenuItem value={'Miami Hit'}>Miami Hit</MenuItem>
          <MenuItem value={'Utah Jazz'}>Utah Jazz</MenuItem>
          <MenuItem value={'Sacramento'}>Sacramento</MenuItem>
          <MenuItem value={'Brooklyn Nets'}>Brooklyn Nets</MenuItem>
          <MenuItem value={'Milwakey'}>Milwakey</MenuItem>
          <MenuItem value={'New Orleans'}>New Orleans</MenuItem>
          <MenuItem value={'Orlando Magic'}>Orlando Magic</MenuItem>
          <MenuItem value={'Phoniex Suns'}>Phoniex Suns</MenuItem>
          <MenuItem value={'Minisota'}>Minisota</MenuItem>
          <MenuItem value={'Washington'}>Washington</MenuItem>
          <MenuItem value={'Philadelphia'}>Philadelphia</MenuItem>
          <MenuItem value={'Denver'}>Denver</MenuItem>
          <MenuItem value={'Charlot Hornets'}>Charlot Hornets</MenuItem>
          <MenuItem value={'Clippers'}>Clippers</MenuItem>
          <MenuItem value={'Atlanta'}>Atlanta</MenuItem>
          <MenuItem value={'Boston'}>Boston</MenuItem>
          <MenuItem value={'Huston Rockets'}>Huston Rockets</MenuItem>
          <MenuItem value={'Lakers'}>Lakers</MenuItem>
          <MenuItem value={'Indiana'}>Indiana</MenuItem>
          <MenuItem value={'Thunder Ock'}>Thunder Ock</MenuItem>
          <MenuItem value={'San Antonio'}>San Antonio</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
