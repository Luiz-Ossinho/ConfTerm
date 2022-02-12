import { ConfortLevel } from '../../../lib/utils'
import { Select, MenuItem, InputLabel, TextField } from '@mui/material'
import ThermostatIcon from '@mui/icons-material/Thermostat';

const confortLevels = [ConfortLevel.Confortable, ConfortLevel.MildStress, ConfortLevel.ModerateStress, ConfortLevel.SevereStress]

export default function SelectableConfortLevelList({ getTags }) {

    return (
        <TextField
            id="select-conforto"
            label="Conforto"
            select
            {...getTags()}
        >
            {confortLevels?.map(
                confortLevel => (<MenuItem key={confortLevel.value} value={confortLevel.value}>    <ThermostatIcon sx={{ color: confortLevel.color }} /></MenuItem>)
            )}
        </TextField>
    );
}