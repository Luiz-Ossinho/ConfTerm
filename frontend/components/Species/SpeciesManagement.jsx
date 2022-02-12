import { Stack } from '@mui/material'
import ManagementHeader from '../Management/ManagementHeader';
import SpeciesListing from './SpeciesListing';
import InsertSpeciesForm from './InsertSpeciesForm';
import React from 'react'

export default function SpeciesManagement() {
    const [speciesFilter, setSpeciesFilter] = React.useState("");
    const [isFormOpen, setFormOpen] = React.useState(false);
    const handleCloseForm = () => setFormOpen(false)

    function onSearchSpecies(e) {
        setSpeciesFilter(e.target.value)
    }

    const headerOptions = {
        title: 'Especies',
        subtitle: 'Especies animais sob monitoria',
        searchFilter: speciesFilter,
        onInsert: () => { setFormOpen(true) },
        onSearch: onSearchSpecies
    }

    return (<>
        <InsertSpeciesForm isOpen={isFormOpen} handleClose={handleCloseForm} />
        <Stack direction='column' alignItems='center' gap={2} style={{ width: '100%' }}>
            <ManagementHeader options={headerOptions} />
            <SpeciesListing filter={speciesFilter} />
        </Stack>
    </>);
}