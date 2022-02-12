import { Stack } from '@mui/material'
import ManagementHeader from '../Management/ManagementHeader';
import HousingsListing from './HousingsListing';
import InsertHousingForm from './InsertHousingForm';
import React from 'react'

export default function HousingsManagement() {
    const [searchFilter, setSearchFilter] = React.useState("");
    const [isFormOpen, setFormOpen] = React.useState(false);
    const handleCloseForm = () => setFormOpen(false);

    function onSearch(e) {
        setSearchFilter(e.target.value)
    }

    const headerOptions = {
        title: 'Alojamentos',
        subtitle: 'Habitacoes de animais sob monitoria',
        searchFilter: searchFilter,
        onInsert: () => { setFormOpen(true) },
        onSearch: onSearch
    }

    return (<>
        <InsertHousingForm isOpen={isFormOpen} handleClose={handleCloseForm} />
        <Stack direction='column' alignItems='center' gap={2} style={{ width: '100%' }}>
            <ManagementHeader options={headerOptions} />
            <HousingsListing filter={searchFilter} />
        </Stack>
    </>);
}