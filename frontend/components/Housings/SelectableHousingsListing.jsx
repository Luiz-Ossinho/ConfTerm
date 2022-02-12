import { Select, MenuItem } from '@mui/material'
import Maybe from '../Maybe'
import useHousings from '../../lib/hooks/useHousings'

export default function SelectableHousingsListing({ selectedValue, handleSelectedValueChange }) {
    const { housings: allHousings } = useHousings();

    if (!allHousings) {
        return <></>;
    }

    return (<>
        <Maybe test={allHousings.length !== 0}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedValue}
                label="Alojamento"
                onChange={handleSelectedValueChange}
            >
                {allHousings?.map(
                    housing => (<MenuItem key={housing.Id} value={housing.Id}>{housing.Name}</MenuItem>)
                )}
            </Select>
        </Maybe>

        <Maybe test={allHousings.length === 0}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={1}
                label="Especie"
                disabled={true}
            >
                <MenuItem value={1}>Adicione uma nova especie</MenuItem>
            </Select>
        </Maybe>
    </>);
}