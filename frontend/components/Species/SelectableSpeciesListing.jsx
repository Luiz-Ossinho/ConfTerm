import { Select, MenuItem } from '@mui/material'
import React from 'react'
import Maybe from '../Maybe'
import useSpecies from '../../lib/hooks/useSpecies.js'

export default function SelectableSpeciesListing({ selectedValue, handleSelectedValueChange }) {
    const { species: allSpecies } = useSpecies();

    if (!allSpecies) {
        return <></>;
    }

    return (<>
        <Maybe test={allSpecies.length !== 0}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedValue}
                label="Especie"
                onChange={handleSelectedValueChange}
            >
                {allSpecies?.map(
                    species => (<MenuItem key={species.Id} value={species.Id}>{species.Name}</MenuItem>)
                )}
            </Select>
        </Maybe>

        <Maybe test={allSpecies.length === 0}>
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